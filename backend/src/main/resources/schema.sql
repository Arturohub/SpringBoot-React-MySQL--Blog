CREATE TABLE IF NOT EXISTS users_springboot (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS posts_springboot (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    content TEXT,
    image VARCHAR(255),
    user_id BIGINT,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users_springboot(id)
);


-- INSERT INTO users_springboot (id, username, email, password) VALUES (1, 'user1', 'user1@example.com', 'password1');
-- INSERT INTO users_springboot (id, username, email, password) VALUES (2, 'user2', 'user2@example.com', 'password2');

-- INSERT INTO posts_springboot (id, title, subtitle, created_at, updated_at, content, image, user_id) VALUES 
-- (1, 'First Post', 'Subtitle of first post', '2023-05-23T10:15:30', '2023-05-23T10:15:30', 'Content of the first post', 'image1.jpg', 1),
-- (2, 'Second Post', 'Subtitle of second post', '2023-05-23T11:15:30', '2023-05-23T11:15:30', 'Content of the second post', 'image2.jpg', 2);
