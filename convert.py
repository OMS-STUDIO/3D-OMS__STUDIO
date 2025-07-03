from flask import Blueprint, request, jsonify, send_file
import os
import tempfile
import uuid
from werkzeug.utils import secure_filename
import cv2
import numpy as np
import trimesh
from shapely.geometry import Polygon, LinearRing

convert_bp = Blueprint('convert', __name__)

ALLOWED_EXTENSIONS = {'png'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def png_to_obj_conversion(image_path, output_obj_path, extrusion_height=1.0, simplify_tolerance=0.005):
    """
    Convertit une image PNG en un modèle 3D OBJ par extrusion.
    """
    # 1. Charger l'image et la convertir en niveaux de gris
    img = cv2.imread(image_path, cv2.IMREAD_UNCHANGED)
    if img is None:
        raise FileNotFoundError(f"Impossible de charger l'image: {image_path}")

    # Gérer la transparence (canal alpha) si présente
    if img.shape[2] == 4:
        # Si l'image a un canal alpha, l'utiliser comme masque
        alpha_channel = img[:, :, 3]
        _, binary_img = cv2.threshold(alpha_channel, 1, 255, cv2.THRESH_BINARY)
    else:
        # Sinon, convertir en niveaux de gris et binariser
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        _, binary_img = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)

    # 2. Trouver les contours
    contours, _ = cv2.findContours(binary_img.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    meshes = []

    for i, contour in enumerate(contours):
        # Simplifier le contour pour réduire le nombre de polygones
        epsilon = simplify_tolerance * cv2.arcLength(contour, True)
        approx_contour = cv2.approxPolyDP(contour, epsilon, True)

        # S'assurer que le contour a au moins 3 points pour former une face
        if len(approx_contour) < 3:
            continue

        # Convertir les points du contour en coordonnées 2D
        base_points = approx_contour.reshape(-1, 2).astype(np.float64)

        # Normaliser les coordonnées pour avoir des dimensions raisonnables
        min_x, min_y = np.min(base_points, axis=0)
        max_x, max_y = np.max(base_points, axis=0)
        scale = max(max_x - min_x, max_y - min_y)
        if scale == 0:
            continue
        base_points = (base_points - np.array([min_x, min_y])) / scale
        base_points -= np.array([(max_x - min_x) / (2 * scale), (max_y - min_y) / (2 * scale)])

        if base_points.shape[0] < 3:
            continue

        # Créer un objet Polygon de Shapely à partir des points
        try:
            if not LinearRing(base_points).is_closed:
                continue
            poly = Polygon(base_points)
            if not poly.is_valid or poly.is_empty:
                poly = poly.buffer(0)
                if not poly.is_valid or poly.is_empty:
                    continue
        except Exception:
            continue

        # Créer le maillage extrudé
        try:
            extruded_mesh = trimesh.creation.extrude_polygon(poly, extrusion_height)
            meshes.append(extruded_mesh)
        except Exception:
            continue

    if not meshes:
        raise ValueError("Aucun contour valide trouvé pour la conversion.")

    # Combiner tous les maillages en un seul
    final_mesh = trimesh.util.concatenate(meshes)

    # Exporter le maillage au format OBJ
    final_mesh.export(output_obj_path)

@convert_bp.route('/convert', methods=['POST'])
def convert_png_to_obj():
    try:
        # Vérifier qu'un fichier a été envoyé
        if 'file' not in request.files:
            return jsonify({'error': 'Aucun fichier fourni'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'Aucun fichier sélectionné'}), 400
        
        if not allowed_file(file.filename):
            return jsonify({'error': 'Type de fichier non autorisé. Seuls les fichiers PNG sont acceptés.'}), 400

        # Récupérer les paramètres
        extrusion_height = float(request.form.get('extrusion_height', 1.0))
        simplify_tolerance = float(request.form.get('simplify_tolerance', 0.005))

        # Créer un répertoire temporaire pour traiter le fichier
        with tempfile.TemporaryDirectory() as temp_dir:
            # Sauvegarder le fichier uploadé
            filename = secure_filename(file.filename)
            input_path = os.path.join(temp_dir, filename)
            file.save(input_path)

            # Générer un nom unique pour le fichier de sortie
            output_filename = f"{os.path.splitext(filename)[0]}_{uuid.uuid4().hex[:8]}.obj"
            output_path = os.path.join(temp_dir, output_filename)

            # Effectuer la conversion
            png_to_obj_conversion(input_path, output_path, extrusion_height, simplify_tolerance)

            # Retourner le fichier OBJ
            return send_file(
                output_path,
                as_attachment=True,
                download_name=f"{os.path.splitext(filename)[0]}.obj",
                mimetype='application/octet-stream'
            )

    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': f'Erreur lors de la conversion: {str(e)}'}), 500
