# TikTok Pixel Setup for Google Tag Manager

## Tag Configuration

**Tag Type:** Custom HTML  
**Tag Name:** TT-D1I9K7JC77U0TEH3HMNG-Web-Tag-Pixel_Setup  
**Trigger:** All Pages  
**Pixel Code:** D1I9K7JC77U0TEH3HMNG  

## Custom HTML Code

Copy and paste this code into your GTM Custom HTML tag:

```html
<script>
!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
  
  ttq.load('D1I9K7JC77U0TEH3HMNG');
  ttq.page();
}(window, document, 'ttq');
</script>
```

## Setup Instructions

1. **Log into Google Tag Manager**
   - Go to tagmanager.google.com
   - Select your container (GTM-5TMCKPVW)

2. **Create New Tag**
   - Click "Tags" in the left sidebar
   - Click "New" button
   - Click "Tag Configuration"

3. **Configure Custom HTML Tag**
   - Select "Custom HTML" tag type
   - Paste the HTML code above into the HTML field
   - Name the tag: `TT-D1I9K7JC77U0TEH3HMNG-Web-Tag-Pixel_Setup`

4. **Set Trigger**
   - Click "Triggering"
   - Select "All Pages" trigger
   - This ensures the pixel fires on every page load

5. **Save and Publish**
   - Click "Save"
   - Click "Submit" to publish changes
   - Add a version name like "Added TikTok Pixel"

## Verification

After publishing, you can verify the pixel is working by:

1. **TikTok Events Manager**
   - Go to your TikTok Ads Manager
   - Navigate to Events Manager
   - Check if events are being received

2. **Browser Developer Tools**
   - Open your website
   - Press F12 to open Developer Tools
   - Go to Network tab
   - Look for requests to `analytics.tiktok.com`

3. **GTM Preview Mode**
   - In GTM, click "Preview"
   - Visit your website
   - Check if the TikTok tag fires on page load

## Event Tracking

Once the base pixel is installed, you can create additional GTM tags for conversion tracking:

- **Purchase Events** - Track color analysis purchases
- **Page View Events** - Track specific page visits
- **Custom Events** - Track uploads, checkout starts, etc.

The TikTok pixel will now track all website visitors and can be used for retargeting campaigns and conversion optimization.