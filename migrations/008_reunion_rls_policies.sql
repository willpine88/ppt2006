-- Enable RLS and add permissive read policies for public reunion tables

ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE alumni ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE guestbook ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_schedule ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read classes" ON classes FOR SELECT USING (true);
CREATE POLICY "Public read alumni" ON alumni FOR SELECT USING (true);
CREATE POLICY "Public read gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Public read approved guestbook" ON guestbook FOR SELECT USING (is_approved = true);
CREATE POLICY "Public insert guestbook" ON guestbook FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read event_schedule" ON event_schedule FOR SELECT USING (true);
