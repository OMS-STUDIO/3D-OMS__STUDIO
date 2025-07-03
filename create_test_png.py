from PIL import Image, ImageDraw

def create_test_png(filename="test_logo.png", size=(200, 200), color=(0, 0, 0, 255), background=(255, 255, 255, 0)):
    """
    Crée une image PNG simple avec un carré au centre.
    """
    img = Image.new("RGBA", size, background)
    draw = ImageDraw.Draw(img)

    # Dessiner un carré au centre
    square_size = min(size) // 2
    top_left_x = (size[0] - square_size) // 2
    top_left_y = (size[1] - square_size) // 2
    bottom_right_x = top_left_x + square_size
    bottom_right_y = top_left_y + square_size

    draw.rectangle([top_left_x, top_left_y, bottom_right_x, bottom_right_y], fill=color)

    img.save(filename)
    print(f"Image de test \'{filename}\' créée avec succès.")

if __name__ == "__main__":
    create_test_png()
