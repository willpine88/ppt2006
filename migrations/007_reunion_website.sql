-- Migration: Reunion Website tables
-- Date: 2026-02-27

CREATE TABLE classes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  homeroom_teacher TEXT,
  description TEXT,
  class_photo_url TEXT,
  student_count INT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE alumni (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  class_id UUID REFERENCES classes(id),
  full_name TEXT NOT NULL,
  nickname TEXT,
  current_city TEXT,
  occupation TEXT,
  phone TEXT,
  email TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  class_id UUID REFERENCES classes(id),
  image_url TEXT NOT NULL,
  caption TEXT,
  year TEXT,
  uploaded_by TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE guestbook (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_name TEXT NOT NULL,
  class_name TEXT,
  message TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE event_schedule (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  time TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  sort_order INT DEFAULT 0
);

-- Seed 7 classes
INSERT INTO classes (name, slug, homeroom_teacher, student_count) VALUES
  ('12A1', '12a1', NULL, NULL),
  ('12A2', '12a2', NULL, NULL),
  ('12A3', '12a3', NULL, NULL),
  ('12A4', '12a4', NULL, NULL),
  ('12A5', '12a5', NULL, NULL),
  ('12A6', '12a6', NULL, NULL),
  ('12A7', '12a7', NULL, NULL);

-- Seed event schedule
INSERT INTO event_schedule (time, title, description, sort_order) VALUES
  ('08:00', 'Đón tiếp & Check-in', 'Đăng ký, nhận badge theo lớp, chụp ảnh kỷ niệm', 1),
  ('09:00', 'Khai mạc', 'Phát biểu của ban tổ chức, ôn lại kỷ niệm 20 năm', 2),
  ('09:30', 'Triển lãm ảnh kỷ niệm', 'Xem lại những bức ảnh thời đi học 2003-2006', 3),
  ('10:30', 'Giao lưu theo nhóm lớp', 'Ôn lại kỷ niệm, chia sẻ câu chuyện theo từng lớp', 4),
  ('11:30', 'Trò chơi & Đố vui', 'Đố vui về trường, ai nhớ nhiều nhất, team building', 5),
  ('12:00', 'Tiệc trưa', 'Buffet và giao lưu tự do', 6),
  ('14:00', 'Văn nghệ & Karaoke', 'Biểu diễn văn nghệ, hát những bài hát thời đó', 7),
  ('15:30', 'Trao giải vui', 'Đến sớm nhất, đi xa nhất, ít thay đổi nhất...', 8),
  ('16:00', 'Chụp ảnh kỷ niệm', 'Chụp ảnh toàn khoá và theo từng lớp', 9),
  ('16:30', 'Bế mạc & Chia tay', 'Lời chia tay, hẹn gặp lại', 10);
