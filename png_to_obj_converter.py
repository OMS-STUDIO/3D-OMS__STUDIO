import cv2
import numpy as np
import trimesh
from shapely.geometry import Polygon, LinearRing

def png_to_obj(image_path, output_obj_path, extrusion_height=1.0, simplify_tolerance=0.005):
    """
    Convertit une image PNG en un modèle 3D OBJ par extrusion.

    Args:
        image_path (str): Chemin vers l'image PNG d'entrée.
        output_obj_path (str): Chemin où le fichier OBJ de sortie sera enregistré.
        extrusion_height (float): Hauteur de l'extrusion 3D.
        simplify_tolerance (float): Tolérance pour la simplification des contours.
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
    # cv2.findContours modifie l'image d'entrée, donc on en fait une copie
    contours, _ = cv2.findContours(binary_img.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    meshes = []

    for i, contour in enumerate(contours):
        # Simplifier le contour pour réduire le nombre de polygones
        epsilon = simplify_tolerance * cv2.arcLength(contour, True)
        approx_contour = cv2.approxPolyDP(contour, epsilon, True)

        # S'assurer que le contour a au moins 3 points pour former une face
        if len(approx_contour) < 3:
            print(f"Contour {i} ignoré: moins de 3 points après simplification.")
            continue

        # Convertir les points du contour en coordonnées 2D
        base_points = approx_contour.reshape(-1, 2).astype(np.float64) # Utiliser float64 pour trimesh

        # Normaliser les coordonnées pour avoir des dimensions raisonnables
        min_x, min_y = np.min(base_points, axis=0)
        max_x, max_y = np.max(base_points, axis=0)
        scale = max(max_x - min_x, max_y - min_y)
        if scale == 0: # Éviter la division par zéro pour les points isolés
            print(f"Contour {i} ignoré: échelle nulle après normalisation.")
            continue
        base_points = (base_points - np.array([min_x, min_y])) / scale
        base_points -= np.array([(max_x - min_x) / (2 * scale), (max_y - min_y) / (2 * scale)]) # Centrer

        # Debugging: Vérifier les points de base
        if base_points.shape[0] < 3:
            print(f"Contour {i} ignoré: Moins de 3 points après normalisation et centrage.")
            continue

        # Créer un objet Polygon de Shapely à partir des points
        try:
            # Assurez-vous que le contour est fermé pour Shapely
            if not LinearRing(base_points).is_closed:
                print(f"Contour {i} ignoré: Le contour n'est pas fermé pour Shapely.")
                continue
            poly = Polygon(base_points)
            if not poly.is_valid or poly.is_empty:
                print(f"Contour {i} ignoré: Polygone non valide ou vide pour la triangulation (Shapely).")
                poly = poly.buffer(0)
                if not poly.is_valid or poly.is_empty:
                    print(f"Contour {i} ignoré: Polygone non valide ou vide même après réparation.")
                    continue
        except Exception as e:
            print(f"Contour {i} ignoré: Erreur lors de la création/validation du polygone Shapely: {e}")
            continue

        # Créer le maillage extrudé
        try:
            # Utiliser trimesh.creation.extrude_polygon pour créer le maillage 3D
            extruded_mesh = trimesh.creation.extrude_polygon(poly, extrusion_height)
            meshes.append(extruded_mesh)
        except Exception as e:
            print(f"Avertissement: Contour {i} - Impossible d'extruder le polygone. Erreur: {e}")

    if not meshes:
        print("Aucun maillage valide trouvé pour la conversion.")
        return

    # Combiner tous les maillages en un seul
    final_mesh = trimesh.util.concatenate(meshes)

    # Exporter le maillage au format OBJ
    final_mesh.export(output_obj_path)
    print(f"Modèle 3D exporté avec succès vers {output_obj_path}")

if __name__ == '__main__':
    # Exemple d'utilisation
    import sys
    if len(sys.argv) > 2:
        input_png = sys.argv[1]
        output_obj = sys.argv[2]
        try:
            png_to_obj(input_png, output_obj)
        except FileNotFoundError as e:
            print(e)
            print(f"Veuillez vous assurer que le fichier d'entrée '{input_png}' existe.")
    else:
        print("Utilisation: python3.11 png_to_obj_converter.py <input.png> <output.obj>")
        print("Exemple: python3.11 png_to_obj_converter.py test_logo.png output_logo.obj")
        print("Création d'une image de test simple pour démonstration...")
        from PIL import Image, ImageDraw
        def create_simple_test_png(filename='test_logo.png', size=(100, 100), color=(0, 0, 0, 255)):
            img = Image.new('RGBA', size, (255, 255, 255, 0)) # Fond transparent
            draw = ImageDraw.Draw(img)
            draw.rectangle([25, 25, 75, 75], fill=color) # Dessine un carré noir
            img.save(filename)
            print(f"Image de test simple enregistrée sous {filename}")
        create_simple_test_png()
        try:
            png_to_obj('test_logo.png', 'output_logo.obj')
        except FileNotFoundError as e:
            print(e)
            print("Veuillez créer un fichier 'test_logo.png' dans le répertoire courant pour tester le script.")
