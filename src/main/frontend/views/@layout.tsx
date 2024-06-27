import {
    AppLayout,
    DrawerToggle, Icon,
    ProgressBar,
    SideNav,
    SideNavItem,
} from "@vaadin/react-components";
import {
  createMenuItems,
  useViewConfig,
} from "@vaadin/hilla-file-router/runtime.js";
import {Suspense, useEffect} from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Signal, signal, effect } from '@vaadin/hilla-react-signals';

const vaadin = window.Vaadin as {
  documentTitleSignal: Signal<string>;
};
vaadin.documentTitleSignal = signal("");
effect(() => {
  document.title = vaadin.documentTitleSignal.value;
});

export default function MainLayout() {
  const currentTitle = useViewConfig()?.title ?? '';
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    vaadin.documentTitleSignal.value = currentTitle;
  })

  return (
      <AppLayout primarySection="drawer">
        <div slot="drawer" className="flex flex-col justify-between h-full p-m layout-div"  style={{ width: '100%' , backgroundColor: 'light-red', color: 'var(--lumo-primary-text-color)'}}>
          <header className="flex flex-col gap-m">
            <h1 className="text-l m-0">{vaadin.documentTitleSignal}</h1>
            <SideNav
                onNavigate={({path}) => navigate(path!)}
                location={location}
                className={"flex flex-col gap-m"}

            >
                <SideNavItem path="/">
                    <Icon icon="vaadin:dashboard" slot="prefix" />
                    Dashboard
                </SideNavItem>
                <SideNavItem path="/ContactPage">
                    <Icon icon="vaadin:phone" slot="prefix" />
                    Contacts
                </SideNavItem>
                <SideNavItem path="/NewPage">
                    <Icon icon="vaadin:envelope" slot="prefix" />
                    Inbox
                </SideNavItem>
            </SideNav>
          </header>
        </div>

        <DrawerToggle slot="navbar" aria-label="Menu toggle"></DrawerToggle>
        <h2 slot="navbar" className="text-l m-0">
          {vaadin.documentTitleSignal}
        </h2>

        <Suspense fallback={<ProgressBar indeterminate className="m-0"/>}>
          <section className="view">
            <Outlet/>
          </section>
        </Suspense>
      </AppLayout>
  );
}
