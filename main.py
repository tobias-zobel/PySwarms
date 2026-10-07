import random
import pygame

# Parameter
WIDTH = 800
HEIGHT = 600
NUMBER_OF_BOIDS = 100
SEPERATION_RADIUS = 20
AVOID_FACTOR = 0.2
MAX_SPEED = 2

class Boid:
    def __init__(self):
        self.pos = pygame.Vector2(WIDTH / 2, HEIGHT / 2)
        self.vel = pygame.Vector2(random.uniform(-2, 2), random.uniform(-2, 2))


    # Function to draw a boid
    def draw(self, screen, show_radius=False):
        # debugtool: if true -> showing radius
        if show_radius:
            pygame.draw.circle(screen, (80, 80, 120), self.pos, SEPERATION_RADIUS, 1)

        # Calculating coordinates for drawing a boid
        direction = self.vel.normalize()
        top_corner = self.pos + direction * 10
        left_corner = self.pos - direction * 5 + direction.rotate(90) * 5
        right_corner = self.pos - direction * 5 - direction.rotate(90) * 5

        # Drawing the boid
        boid_coordinates = [top_corner, left_corner, right_corner]
        pygame.draw.polygon(screen, (255, 0, 0), boid_coordinates)


    # Function to update a boid
    def update(self, boids):
        # Seperation
        close = pygame.Vector2(0, 0)
        for other in boids:
            if other is self:
                continue
            diff = self.pos - other.pos
            distance = diff.length()

            # Checking if other boid is in radius of self
            if distance < SEPERATION_RADIUS:
                close += diff

        # Evasion factor and tempo limit
        self.vel += close * AVOID_FACTOR
        self.vel = self.vel.clamp_magnitude(MAX_SPEED)

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

    show_radius = False
    running = True
    while running:
        # Event QUIT und Hotkeys
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            elif event.type == pygame.KEYDOWN and event.key == pygame.K_g: # Pressing G = Showing Radius
                show_radius = not show_radius

        screen.fill((15, 15, 25))

        for boid in boids:
            # Core Loop
            boid.draw(screen, show_radius)
            boid.update(boids)

        # Showing and rendering fps text above boids
        fps_text = font.render(str(int(clock.get_fps())) + " FPS", True, (255, 255, 0))
        screen.blit(fps_text, (10, 10))

        status = "ON" if show_radius else "OFF"
        show_radius_text = font.render(f"G = Show Radius {status}", True, (255, 255, 0))
        screen.blit(show_radius_text, (10, 30))

        pygame.display.flip()
        clock.tick(60)

    pygame.quit()

if __name__ == "__main__":
    main()
