import { useState } from 'react';
import { HomeDashboard, UniversalStoreDataStatus } from '@sqs/home-dashboard';
import { CalendarStar, Home, Mail, Page, Website } from '@sqs/rosetta-icons';

import { DashboardShell, SettingsNavButton } from '../DashboardShell';
import { SettingsDrawer } from '../SettingsDrawer';
import { domain, website } from '../../mocks/data';
import { Button } from '@sqs/rosetta-react/button/next';

const NAV_ITEMS = [
  { label: 'Home', to: `/websites/${website.identifier}`, icon: Home },
  { label: 'Pages', to: `/websites/${website.identifier}/pages`, icon: Page },
  { label: 'Scheduling', to: `/websites/${website.identifier}/scheduling`, icon: CalendarStar },
  { label: 'Marketing', to: `/websites/${website.identifier}/marketing`, icon: Mail },
  { label: 'Website', to: `/websites/${website.identifier}/website`, icon: Website },
];

/** Page header action supplied by the host app upstream. */
const HomeEditSiteButton = () => <Button.Strong>Edit site</Button.Strong>;

/**
 * The website dashboard home, rendered by the `HomeDashboard` source ported
 * from config-frontend. The widgets it shows come from the ported widget
 * registry, which keys off the current lifecycle stage — so the journey-stage
 * switcher drives this page exactly as the real lifecycle stage would.
 */
export const WebsiteHome = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <DashboardShell
        contextTitle={website.title}
        contextSubtitle={website.primaryDomain}
        navItems={NAV_ITEMS}
        backTo={{ label: 'All websites', to: '/' }}
        footer={<SettingsNavButton onClick={() => setIsSettingsOpen(true)} />}
      >
        <HomeDashboard
          HomeEditSiteButton={HomeEditSiteButton}
          isCustomizationEnabled
          universalStoreData={{
            status: UniversalStoreDataStatus.READY,
            error: null,
            data: {
              identifier: website.identifier,
              isSitePasswordProtected: false,
              isSitePublished: website.publishedAt !== null,
              primaryDomain: website.primaryDomain,
              siteTitle: website.title,
              domainsById: { [domain.id]: domain },
              registrations: [],
              toggleFullScreenPreviewMode: () => undefined,
              homepageSEODescription: '',
              homepageSEOTitleFormat: '',
              nonHomepageSEOTitleFormat: '',
              saveImageAltText: () => undefined,
              savePageMetadata: () => undefined,
            } as never,
          }}
        />
      </DashboardShell>
      <SettingsDrawer isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
};

export default WebsiteHome;
