-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =========================
-- TABLE: students
-- =========================
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reg_num TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  gender TEXT CHECK (gender IN ('Male', 'Female', 'Other')) NOT NULL,
  department TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
-- TABLE: attendance
-- =========================
CREATE TABLE IF NOT EXISTS attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reg_num TEXT NOT NULL,
  time TIME DEFAULT CURRENT_TIME,
  date DATE DEFAULT CURRENT_DATE,
  status TEXT CHECK (status IN ('present', 'absent')) DEFAULT 'present',
  created_at TIMESTAMP DEFAULT NOW(),

  CONSTRAINT fk_student
    FOREIGN KEY (reg_num)
    REFERENCES students (reg_num)
    ON DELETE CASCADE
);


-- Enable RLS
ALTER TABLE students ENABLE ROW LEVEL SECURITY;

-- Allow full access to only admins
CREATE POLICY "Admin-only access to students"
  ON students
  FOR ALL
  TO authenticated
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');


-- Enable RLS
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;

-- Allow full access to only admins
CREATE POLICY "Admin-only access to attendance"
  ON attendance
  FOR ALL
  TO authenticated
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Seeding the students table
INSERT INTO students (reg_num, name, gender, department)
VALUES
  ('20/SC/C0/001', 'Abubakar Musa', 'Male', 'Computer Science'),
  ('20/SC/C0/002', 'Adebayo Ifeanyi', 'Male', 'Computer Science'),
  ('20/SC/C0/003', 'Adekunle Tolu', 'Female', 'Computer Science'),
  ('20/SC/C0/004', 'Akinlade Sola', 'Male', 'Computer Science'),
  ('20/SC/C0/005', 'Balogun Kemi', 'Female', 'Computer Science'),
  ('20/SC/C0/006', 'Chukwu Ebuka', 'Male', 'Computer Science'),
  ('20/SC/C0/007', 'Egbetokun Titi', 'Female', 'Computer Science'),
  ('20/SC/C0/008', 'Emeka Obinna', 'Male', 'Computer Science'),
  ('20/SC/C0/009', 'Eze Nneka', 'Female', 'Computer Science'),
  ('20/SC/C0/010', 'Fashola Aisha', 'Female', 'Computer Science'),
  ('20/SC/C0/011', 'Ibrahim Zainab', 'Female', 'Computer Science'),
  ('20/SC/C0/012', 'Idowu Seun', 'Male', 'Computer Science'),
  ('20/SC/C0/013', 'Ifeoma Ada', 'Female', 'Computer Science'),
  ('20/SC/C0/014', 'Lawal Ahmed', 'Male', 'Computer Science'),
  ('20/SC/C0/015', 'Mohammed Bashir', 'Male', 'Computer Science'),
  ('20/SC/C0/016', 'Okafor Chiamaka', 'Female', 'Computer Science'),
  ('20/SC/C0/017', 'Okechukwu Uche', 'Male', 'Computer Science'),
  ('20/SC/C0/018', 'Oladimeji Fisayo', 'Female', 'Computer Science'),
  ('20/SC/C0/019', 'Suleiman Farouk', 'Male', 'Computer Science'),
  ('20/SC/C0/020', 'Yakubu Aminat', 'Female', 'Computer Science'),
  ('20/SC/C0/021', 'Okokon Etim', 'Male', 'Computer Science'),
  ('20/SC/C0/022', 'Quadri Ruth', 'Female', 'Computer Science');

-- Update students table reg number from a  CO to a C zero C0
UPDATE students
SET reg_num = REPLACE(reg_num, '/C0/', '/CO/')
WHERE reg_num LIKE '%/C0/%';

-- Add parent email field
ALTER TABLE students
ADD COLUMN parent_email TEXT;

-- Add unique constraint to prevent duplicate records in attendance tableALTER TABLE attendance
ADD CONSTRAINT unique_attendance_entry
UNIQUE (reg_num, date);
