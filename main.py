import random
import pygame

# Parameter
WIDTH = 800
HEIGHT = 600
NUMBER_OF_BOIDS = 100

class Boid:
    def __init__(self):
        self.pos = pygame.Vector2(WIDTH / 2, HEIGHT / 2)
        self.vel = pygame.Vector2(random.uniform(-2, 2), random.uniform(-2, 2))


    # Function to draw a boid
    def draw(self, screen):
        # Calculating coordinates for drawing a boid
        direction = self.vel.normalize()
        top_corner = self.pos + direction * 10
        left_corner = self.pos - direction * 5 + direction.rotate(90) * 5
        right_corner = self.pos - direction * 5 - direction.rotate(90) * 5

        # Drawing the boid
        boid_coordinates = [top_corner, left_corner, right_corner]
        pygame.draw.polygon(screen, (255, 0, 0), boid_coordinates)


    # Function to update a boid
    def update(self):
        # Movement of boids
        self.pos += self.vel

        # Edge wrapping
        self.pos.x %= WIDTH
        self.pos.y %= HEIGHT



def main():
    pygame.init()
    pygame.display.set_caption("PySwarms - Boids in Python")
    pygame.display.set_icon(pygame.image.load("icon.png"))

    screen = pygame.display.set_mode((WIDTH, HEIGHT))
    clock = pygame.time.Clock()
    font = pygame.font.Font(None, 20)

    # generating NUMBER_OF_BOIDS Boid-Objects
    boids = [Boid() for _ in range(NUMBER_OF_BOIDS)]
    #print(len(boids))

    running = True
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False

        screen.fill((15, 15, 25))

        for boid in boids:
            # Core Loop
            boid.draw(screen)
            boid.update()

            # Showing and rendering fps text
            fps_text = font.render(str(int(clock.get_fps())) + " FPS", True, (255, 255, 0))
            screen.blit(fps_text, (10, 10))

        pygame.display.flip()
        clock.tick(60)

    pygame.quit()

if __name__ == "__main__":
    main()
