import random


def random_cath_code(depth: int=4) -> str:
    cath_parts = [
        random.randint(1, 4), 
        10 * random.randint(1, 3),
    ]

    for _ in range(depth-2): 
        cath_parts += [10 * random.randint(1, 10)]
    
    return ".".join([f"{p}" for p in cath_parts])
