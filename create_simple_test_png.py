from PIL import Image, ImageDraw

def create_simple_test_png(filename='simple_test.png', size=(100, 100), color=(0, 0, 0, 255)):
    img = Image.new('RGBA', size, (255, 255, 255, 0)) # Fond transparent
    draw = ImageDraw.Draw(img)
    draw.rectangle([25, 25, 75, 75], fill=color) # Dessine un carré noir
    img.save(filename)
    print(f"Image de test simple enregistrée sous {filename}")

if __name__ == '__main__':
    create_simple_test_png()
