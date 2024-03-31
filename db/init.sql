CREATE TABLE categories (
    category_key INTEGER PRIMARY KEY,
    category_name VARCHAR(10) NOT NULL
);

INSERT INTO categories (category_key, category_name) VALUES
(0, 'eye'),
(1, 'ear'),
(2, 'mouth'),
(3, 'nose'),
(4, 'hand');


CREATE TABLE uploads (
    id SERIAL PRIMARY KEY,
    s3_bucket_link TEXT NOT NULL,
    category_key INTEGER NOT NULL,
    description VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_key) REFERENCES categories(category_key),
    CHECK (category_key >= 0 AND category_key <= 4)
);

CREATE INDEX idx_upload_category_created_at ON uploads(category_key, created_at DESC);

ALTER TABLE categories ADD COLUMN uploads INTEGER DEFAULT 0;

CREATE OR REPLACE FUNCTION increment_uploads_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE categories
    SET uploads = uploads + 1
    WHERE category_key = NEW.category_key;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_uploads_count
AFTER INSERT ON uploads
FOR EACH ROW
EXECUTE FUNCTION increment_uploads_count();

UPDATE categories SET uploads = 0;
DELETE FROM uploads;