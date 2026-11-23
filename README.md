# Fieldnote — Campus Projects

A clean, mobile-first React Native prototype for discovering student-led projects across universities and colleges, built with Expo SDK 58, React Native 0.88, and React 19.3. The interface follows the supplied reference's warm cream canvas, white rounded surfaces, restrained yellow accents, thin outlines, and bold black actions. It uses no gradients or emoji.

## Run locally

```sh
npm install
npx expo start
```

## Build an Android APK

The project is configured for an installable internal preview APK through Expo Application Services (EAS):

```sh
npx eas-cli login
npx eas-cli build --platform android --profile preview
```

The build runs on EAS and requires an Expo account. This workspace does not include the Android SDK/Gradle toolchain, so a local APK cannot be compiled here.

## Prototype scope

Includes searchable and filterable project listings, saved projects and join requests persisted on the device, project details, profile and work tabs, and a post-a-project prompt. Listings and profile are demonstration data; connect a backend and university identity provider for a production deployment.
