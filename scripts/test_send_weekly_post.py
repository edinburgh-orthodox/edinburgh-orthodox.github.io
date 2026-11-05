import unittest

import send_weekly_post as post


class FormattingTests(unittest.TestCase):
    def setUp(self):
        self.services = [
            {
                "date": "2026-09-07",
                "note": "Forefeast",
                "services": [
                    {"time": "Matins 7:30am", "location": "Meadow Lane"},
                ],
            },
            {
                "date": "2026-09-08",
                "services": [
                    {"time": "Vespers 6:30pm", "location": "Chapel Street"}
                ],
            },
        ]

    def test_text_contains_days_services_and_announcements(self):
        text = post.format_text(self.services, ["Parish meeting"])
        self.assertIn("SERVICES THIS WEEK", text)
        self.assertIn("Mon 7th Sep - Forefeast", text)
        self.assertIn("Matins 7:30am (Meadow Lane)", text)
        self.assertIn("Tue 8th Sep", text)
        self.assertIn("ANNOUNCEMENTS", text)
        self.assertIn("Parish meeting", text)
        self.assertTrue(text.rstrip().endswith(post.SITE_URL))

    def test_day_label_comes_from_the_date(self):
        self.assertEqual(post.format_day("2026-09-07"), "Mon 7th Sep")
        self.assertEqual(post.format_day("2026-11-03"), "Tue 3rd Nov")
        self.assertEqual(post.format_day("not a date"), "not a date")

    def test_text_drops_heading_marks(self):
        text = post.format_text([], ["### Confessions", "*Travel* by car"])
        self.assertIn("\nConfessions\n", text)
        self.assertNotIn("###", text)
        self.assertIn("*Travel* by car", text)

    def test_text_flattens_links(self):
        text = post.format_text(
            [],
            [
                "Call [07395 625298](tel:+447395625298) or email "
                "[eleanna@example.com](mailto:eleanna@example.com).",
                "Read [the notice](https://example.com/week).",
            ],
        )
        self.assertIn("Call 07395 625298 or email eleanna@example.com.", text)
        self.assertIn("Read the notice (https://example.com/week).", text)
        self.assertNotIn("](", text)

    def test_html_escapes_data(self):
        services = [
            {
                "date": "Mon 7",
                "note": "A & B",
                "services": [{"time": "Matins", "location": "Meadow <Lane>"}],
            }
        ]
        html = post.format_html(services, ["<script>alert(1)</script>"])
        self.assertIn("A &amp; B", html)
        self.assertIn("Meadow &lt;Lane&gt;", html)
        self.assertNotIn("<script>", html)

    def test_html_renders_markdown(self):
        html = post.format_html(
            [], ["### Confessions", "*Travel* by car, [call](tel:+441234)"]
        )
        self.assertIn("<h3>Confessions</h3>", html)
        self.assertIn("<em>Travel</em> by car", html)
        self.assertIn('<a href="tel:+441234">call</a>', html)


if __name__ == "__main__":
    unittest.main()
