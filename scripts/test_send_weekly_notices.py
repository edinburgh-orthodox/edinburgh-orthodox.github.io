import unittest

import send_weekly_notices as notices


class FormattingTests(unittest.TestCase):
    def setUp(self):
        self.services = [
            {
                "date": "Mon 7",
                "note": "Forefeast",
                "mark": "✚",
                "services": [
                    {"time": "Matins 7:30am", "location": "Meadow Lane"},
                ],
            },
            {
                "date": "Tue 8",
                "services": [
                    {"time": "Vespers 6:30pm", "location": "Chapel Street"}
                ],
            },
        ]

    def test_text_contains_days_services_and_announcements(self):
        text = notices.format_text(self.services, ["Parish meeting"])
        self.assertIn("SERVICES THIS WEEK", text)
        self.assertIn("Mon 7 - Forefeast ✚", text)
        self.assertIn("Matins 7:30am (Meadow Lane)", text)
        self.assertIn("Tue 8", text)
        self.assertIn("ANNOUNCEMENTS", text)
        self.assertIn("Parish meeting", text)
        self.assertTrue(text.rstrip().endswith(notices.SITE_URL))

    def test_html_escapes_data(self):
        services = [
            {
                "date": "Mon 7",
                "note": "A & B",
                "services": [{"time": "Matins", "location": "Meadow <Lane>"}],
            }
        ]
        html = notices.format_html(services, ["<script>alert(1)</script>"])
        self.assertIn("A &amp; B", html)
        self.assertIn("Meadow &lt;Lane&gt;", html)
        self.assertNotIn("<script>", html)


if __name__ == "__main__":
    unittest.main()
