CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Criando usuários (2 USERs e 1 ADMIN)
INSERT INTO "User" (id, name, email, password, role, "createdAt", "updatedAt")
VALUES
  (uuid_generate_v4(), 'João Silva', 'joao@email.com', '$2a$12$MkwNy8Bd9HF0RaC3PBD0J.uxmhV3pnwfgLn3HTLz8iaD2czsGp2wW', 'USER', NOW(), NOW()),
  (uuid_generate_v4(), 'Maria Souza', 'maria@email.com', '$2a$12$MkwNy8Bd9HF0RaC3PBD0J.uxmhV3pnwfgLn3HTLz8iaD2czsGp2wW', 'USER', NOW(), NOW()),
  (uuid_generate_v4(), 'Admin Master', 'admin@email.com', '$2a$12$MkwNy8Bd9HF0RaC3PBD0J.uxmhV3pnwfgLn3HTLz8iaD2czsGp2wW', 'ADMIN', NOW(), NOW());

-- Criando propriedades
INSERT INTO "Property" (id, name, description, address, value, "ownerId", "createdAt", "updatedAt") VALUES
  (uuid_generate_v4(), 'Casa na Praia', 'Linda casa com vista para o mar.', 'Rua das Ondas, 123', 589000,(SELECT id FROM "User" WHERE email = 'joao@email.com'), NOW(), NOW()),
  (uuid_generate_v4(), 'Apartamento Moderno', 'Apartamento no centro da cidade.', 'Av. Central, 456', 672000,(SELECT id FROM "User" WHERE email = 'maria@email.com'), NOW(), NOW()),
  (uuid_generate_v4(), 'Chácara Familiar', 'Espaço perfeito para finais de semana.', 'Estrada Rural, KM 12', 346000,(SELECT id FROM "User" WHERE email = 'joao@email.com'), NOW(), NOW()),
  (uuid_generate_v4(), 'Cobertura Luxuosa', 'Cobertura com piscina e vista panorâmica.', 'Rua das Palmeiras, 789', 1260000,(SELECT id FROM "User" WHERE email = 'maria@email.com'), NOW(), NOW()),
  (uuid_generate_v4(), 'Casa de Campo', 'Ambiente tranquilo e cercado pela natureza.', 'Rodovia Verde, KM 30', 780000,(SELECT id FROM "User" WHERE email = 'joao@email.com'), NOW(), NOW());

-- Casa na Praia (4 imagens)
INSERT INTO "PropertyImage" (id, image, "propertyId") VALUES
    (uuid_generate_v4(), 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750', (SELECT id FROM "Property" WHERE name = 'Casa na Praia')),
    (uuid_generate_v4(), 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90', (SELECT id FROM "Property" WHERE name = 'Casa na Praia')),
    (uuid_generate_v4(), 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2', (SELECT id FROM "Property" WHERE name = 'Casa na Praia')),
    (uuid_generate_v4(), 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4', (SELECT id FROM "Property" WHERE name = 'Casa na Praia')),

-- Apartamento Moderno (4 imagens)
    (uuid_generate_v4(), 'https://images.unsplash.com/photo-1484154218962-a197022b5858', (SELECT id FROM "Property" WHERE name = 'Apartamento Moderno')),
    (uuid_generate_v4(), 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688', (SELECT id FROM "Property" WHERE name = 'Apartamento Moderno')),
    (uuid_generate_v4(), 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9', (SELECT id FROM "Property" WHERE name = 'Apartamento Moderno')),
    (uuid_generate_v4(), 'https://images.unsplash.com/photo-1554995207-c18c203602cb', (SELECT id FROM "Property" WHERE name = 'Apartamento Moderno')),

-- Chácara Familiar (4 imagens)
    (uuid_generate_v4(), 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c', (SELECT id FROM "Property" WHERE name = 'Chácara Familiar')),
    (uuid_generate_v4(), 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6', (SELECT id FROM "Property" WHERE name = 'Chácara Familiar')),
    (uuid_generate_v4(), 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d', (SELECT id FROM "Property" WHERE name = 'Chácara Familiar')),
    (uuid_generate_v4(), 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750', (SELECT id FROM "Property" WHERE name = 'Chácara Familiar')),

-- Cobertura Luxuosa (4 imagens)
    (uuid_generate_v4(), 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6', (SELECT id FROM "Property" WHERE name = 'Cobertura Luxuosa')),
    (uuid_generate_v4(), 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a', (SELECT id FROM "Property" WHERE name = 'Cobertura Luxuosa')),
    (uuid_generate_v4(), 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2', (SELECT id FROM "Property" WHERE name = 'Cobertura Luxuosa')),
    (uuid_generate_v4(), 'https://images.unsplash.com/photo-1600121848594-d8644e57abab', (SELECT id FROM "Property" WHERE name = 'Cobertura Luxuosa')),

-- Casa de Campo (4 imagens)
    (uuid_generate_v4(), 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf', (SELECT id FROM "Property" WHERE name = 'Casa de Campo')),
    (uuid_generate_v4(), 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154', (SELECT id FROM "Property" WHERE name = 'Casa de Campo')),
    (uuid_generate_v4(), 'https://images.unsplash.com/photo-1600566752355-35792bedcfea', (SELECT id FROM "Property" WHERE name = 'Casa de Campo')),
    (uuid_generate_v4(), 'https://images.unsplash.com/photo-1600585152220-90363fe7e115', (SELECT id FROM "Property" WHERE name = 'Casa de Campo'));
