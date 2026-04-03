
INSERT INTO videos (id, title, description, s3_key, thumbnail_url, duration, is_360, created_at) 
VALUES
  (
    '31111111-1111-4111-8111-111111111111',
    'Sample Video 1',
    'This is a sample video for testing.',
    'videos/sample-video-1.mp4',
    'https://example.com/thumbnails/sample-video-1.jpg',
    300,
    false,
    NOW()
  ),
  (
    '32222222-2222-4222-8222-222222222222',
    'Sample Video 2',
    'This is another sample video for testing.',
    'videos/sample-video-2.mp4',
    'https://example.com/thumbnails/sample-video-2.jpg',
    600,
    true,
    NOW()
  );

INSERT INTO video_assets (id, video_id, quality, s3_url, size_mb)
VALUES
  ('41111111-1111-4111-8111-111111111111', '31111111-1111-4111-8111-111111111111', '1080p', 'https://cdn.example.com/videos/sample-video-1-1080p.mp4', 120),
  ('42222222-2222-4222-8222-222222222222', '32222222-2222-4222-8222-222222222222', '4k', 'https://cdn.example.com/videos/sample-video-2-4k.mp4', 450);

INSERT INTO categories (id, name)
VALUES
  ('c1111111-1111-4111-8111-111111111111', 'Education'),
  ('c2222222-2222-4222-8222-222222222222', 'Entertainment');

INSERT INTO video_categories (video_id, category_id)
VALUES
  ('31111111-1111-4111-8111-111111111111', 'c1111111-1111-4111-8111-111111111111'),
  ('32222222-2222-4222-8222-222222222222', 'c2222222-2222-4222-8222-222222222222');


INSERT INTO customers (id, name, email, device_type, app_version, created_at)
VALUES
    ('61111111-1111-4111-8111-111111111111', 'John Doe', 'johndoe@gmail.com', 'mobile', '1.0.0', NOW()),
    ('62222222-2222-4222-8222-222222222222', 'Jane Smith', 'janesmith@gmail.com', 'desktop', '1.0.0', NOW());

INSERT INTO analytics_events (video_id, customer_id, event_type, watch_time, device, created_at)
VALUES
  ('31111111-1111-4111-8111-111111111111', '61111111-1111-4111-8111-111111111111', 'play', 120, 'mobile', NOW()),
  ('32222222-2222-4222-8222-222222222222', '62222222-2222-4222-8222-222222222222', 'pause', 60, 'desktop', NOW());

INSERT INTO experiences (id, video_id, name, type, started_at, ended_at)
VALUES
    ('71111111-1111-4111-8111-111111111111', '31111111-1111-4111-8111-111111111111', 'Experience 1', '360_video', NOW(), NOW() + INTERVAL '120 minutes'),
    ('72222222-2222-4222-8222-222222222222', '32222222-2222-4222-8222-222222222222', 'Experience 2', 'standard_video', NOW(), NOW() + INTERVAL '60 minutes');

INSERT INTO session_events (experience_id, customer_id, event_type, timestamp_sec, device, created_at)
VALUES
    ('71111111-1111-4111-8111-111111111111', '61111111-1111-4111-8111-111111111111', 'view', 30, 'mobile', NOW()),
    ('72222222-2222-4222-8222-222222222222', '62222222-2222-4222-8222-222222222222', 'click', 15, 'desktop', NOW());

    
