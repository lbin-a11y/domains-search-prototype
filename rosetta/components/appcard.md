# App Card

A dialog for mobile devices that prompts the user to install Squarespace apps.

## Usage

### General guidance

App Cards redirect users to Squarespace's mobile apps for a user experience that's more customized — and optimized — for mobile devices rather than the mobile site experience. It's intended to be a temporary solution.

---

### Anatomy

1. **Close Button**
2. **Image**
3. **Title**
4. **Description**
5. **Button** — Displays either an Apple App Store logo or a Google Play Store logo, depending on the platform.

---

### Variants

#### Default

Redirects to the Squarespace app (iOS / Android).

#### Commerce

Redirects to the Commerce app (iOS / Android).

#### Analytics

Redirects to the Analytics app (iOS / Android).

---

### Specs

App Cards utilize the Wizard component in a Sheet overlay, with a special full-width Button that shows the app store logo for a platform.

---
## Examples


### App Card Default

```jsx
{
return (
    <ModalWrapper>
      <AppCard>
        <AppCard.Banner image="" />
        <AppCard.Content
          description={'While we improve this mobile experience, consider getting the Squarespace app.'}
          title={'Squarespace on the Go'}
        >
          <AppCard.AppStoreButton
            {...Platform.selectOS({
              default: {
                label: 'On mobile devices, this will show a link to install the app.',
              },
              ios: {
                href: 'https://apps.apple.com/us/app/squarespace-app/id1361797894?ls=1',
              },
              android: {
                href: 'https://play.google.com/store/apps/details?id=com.squarespace.android.squarespaceapp',
              },
            })}
          />
        </AppCard.Content>
      </AppCard>
    </ModalWrapper>
  );
}
```

### With Continue Button

```jsx
{
return (
    <ModalWrapper>
      <AppCard
        closeButtonLabel={'Cancel'}
        onRequestContinue={() =>
          console.log('Continue', null, { project: 'rosetta-compositions' })
        }
      >
        <AppCard.Banner image="" />
        <AppCard.Content
          description={'While we improve this mobile experience, consider getting the Squarespace app.'}
          title={'Squarespace on the Go'}
        >
          <AppCard.AppStoreButton
            {...Platform.selectOS({
              default: {
                label: 'Squarespace on the Go',
              },
              ios: {
                href: 'https://apps.apple.com/us/app/squarespace-app/id1361797894?ls=1',
              },
              android: {
                href: 'https://play.google.com/store/apps/details?id=com.squarespace.android.squarespaceapp',
              },
            })}
          />
        </AppCard.Content>
      </AppCard>
    </ModalWrapper>
  );
}
```