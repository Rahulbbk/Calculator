# 🌐 GitHub Pages Setup Guide

This guide will help you deploy your Smart Calculator as a Progressive Web App (PWA) using GitHub Pages.

## 🚀 **Step 1: Enable GitHub Pages**

1. **Go to your repository**: [https://github.com/Rahulbbk/Calculator](https://github.com/Rahulbbk/Calculator)

2. **Navigate to Settings**:
   - Click on the "Settings" tab in your repository

3. **Find Pages section**:
   - Scroll down to "Pages" in the left sidebar
   - Or go directly to: `https://github.com/Rahulbbk/Calculator/settings/pages`

4. **Configure Pages**:
   - **Source**: Select "Deploy from a branch"
   - **Branch**: Select "main"
   - **Folder**: Select "/ (root)"
   - Click "Save"

5. **Wait for deployment**:
   - GitHub will build and deploy your site
   - You'll see a green checkmark when it's ready
   - Your site will be available at: `https://rahulbbk.github.io/Calculator/`

## 📱 **Step 2: Generate App Icons**

1. **Open the icon generator**:
   - Open `create-icons.html` in your browser
   - Or visit: `https://rahulbbk.github.io/Calculator/create-icons.html`

2. **Download icons**:
   - Click "Download All Icons" button
   - This will download all required icon sizes

3. **Move icons to folder**:
   - Create an `icons` folder in your repository
   - Move all downloaded icons to the `icons` folder
   - Commit and push the icons

## 🔧 **Step 3: Test Your PWA**

1. **Visit your site**: `https://rahulbbk.github.io/Calculator/`

2. **Test PWA features**:
   - Open Chrome DevTools (F12)
   - Go to "Application" tab
   - Check "Manifest" and "Service Workers" sections

3. **Install on Android**:
   - Open the site in Chrome on Android
   - You should see "Add to Home Screen" prompt
   - Or tap the menu (⋮) and select "Add to Home Screen"

## 📋 **Step 4: Verify PWA Requirements**

Your PWA should meet these criteria:

### ✅ **Manifest Requirements**
- [ ] Valid `manifest.json` file
- [ ] App name and description
- [ ] Icons in multiple sizes
- [ ] Theme colors defined

### ✅ **Service Worker**
- [ ] Service worker registered
- [ ] Offline functionality works
- [ ] Caching implemented

### ✅ **HTTPS**
- [ ] Site served over HTTPS (GitHub Pages provides this)

### ✅ **Responsive Design**
- [ ] Works on mobile devices
- [ ] Touch-friendly interface

## 🎯 **Step 5: Customize Your PWA**

### Update App Information
Edit `manifest.json` to customize:
- App name and description
- Theme colors
- Icons and screenshots

### Add Custom Domain (Optional)
1. Go to repository Settings → Pages
2. Add your custom domain
3. Update DNS settings with your domain provider

## 📊 **Step 6: Monitor Performance**

### Lighthouse Audit
1. Open Chrome DevTools
2. Go to "Lighthouse" tab
3. Run audit for "Progressive Web App"
4. Aim for 90+ score in all categories

### PWA Checklist
- [ ] Loads offline
- [ ] Fast loading times
- [ ] Responsive design
- [ ] Installable on Android
- [ ] Works without internet (basic calculator functions)

## 🔍 **Troubleshooting**

### Common Issues

1. **Icons not showing**:
   - Check file paths in `manifest.json`
   - Ensure icons are in the `icons` folder
   - Verify icon sizes match manifest

2. **Service worker not registering**:
   - Check browser console for errors
   - Ensure `sw.js` file exists
   - Verify HTTPS is enabled

3. **PWA not installable**:
   - Run Lighthouse audit
   - Check all PWA requirements
   - Verify manifest is valid

4. **Site not loading**:
   - Check GitHub Pages status
   - Verify branch and folder settings
   - Wait for deployment to complete

## 📱 **Testing on Different Devices**

### Android Testing
1. **Chrome**: Should show install prompt
2. **Samsung Internet**: Should work as PWA
3. **Firefox**: Basic PWA support

### iOS Testing
1. **Safari**: Limited PWA support
2. **Add to Home Screen**: Works but not full PWA

### Desktop Testing
1. **Chrome**: Full PWA support
2. **Edge**: Good PWA support
3. **Firefox**: Basic PWA support

## 🚀 **Next Steps**

Once your PWA is working:

1. **Share your app**: `https://rahulbbk.github.io/Calculator/`
2. **Get user feedback**: Test with friends and family
3. **Monitor usage**: Check GitHub Pages analytics
4. **Update regularly**: Keep improving features

## 📞 **Support**

If you encounter issues:
- Check the troubleshooting section above
- Review GitHub Pages documentation
- Check browser console for errors
- Verify all files are committed and pushed

---

**Your Smart Calculator PWA will be live at: `https://rahulbbk.github.io/Calculator/`** 🎉 