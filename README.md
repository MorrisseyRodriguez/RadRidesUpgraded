# RadRides BCR

A luxury car rental website built with React and Vite.

## Environment Variables

Before running the project, you need to set up your environment variables. Copy `.env.example` to `.env` and fill in your actual values:

```bash
cp .env.example .env
```

### Required Environment Variables:

- `VITE_EMAILJS_SERVICE_ID` - Your EmailJS service ID
- `VITE_EMAILJS_TEMPLATE_ID` - Your EmailJS template ID for internal emails
- `VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID` - Your EmailJS template ID for auto-replies
- `VITE_EMAILJS_PUBLIC_KEY` - Your EmailJS public key
- `VITE_GA_MEASUREMENT_ID` - Your Google Analytics measurement ID
- `VITE_GOOGLE_ADS_ID` - Your Google Ads ID
- `VITE_GOOGLE_ADS_CONVERSION_LABEL` - Your Google Ads conversion label

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Important Notes

- Make sure to replace all placeholder values in your `.env` file with actual values from your services
- The Google Ads conversion label is critical for tracking conversions properly
- Never commit your `.env` file to version control