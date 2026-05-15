from app.fixtures.fortune_data import fortune_data
import random

def find_fortune():
    return random.choice(fortune_data)