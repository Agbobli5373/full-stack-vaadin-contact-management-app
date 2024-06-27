import React, {useEffect, useState} from 'react';
import {HorizontalLayout, Icon, VerticalLayout} from "@vaadin/react-components";
import ContactStatus from "Frontend/generated/org/vaadin/example/data/ContactStatus";
import {ContactService} from "Frontend/generated/endpoints";

export default function Card() {
    const [contactStatus, setContactStatus] = useState<ContactStatus  | undefined | null>(null);

    useEffect(() => {
        const status = ContactService.getContactStatus().then(setContactStatus);

    }, []);
    return (
        // tag::snippet[]
        <VerticalLayout theme="spacing" className={"mt-m rounded-m  p-l"}  >
            <HorizontalLayout theme="spacing">
                <div className="p-m shadow-s p-xl mx-auto rounded-l ">
                    <span {...{ theme: 'badge success' }}>
                        <Icon icon="vaadin:clock" style={{ padding: 'var(--lumo-space-xs)' }} />
                        <span>Available</span>  </span>
                    <p>{contactStatus?.numberOfAvailable } contacts are Available</p>
                </div>
                <div className="p-m shadow-s p-xl rounded-m ">
                    <span {...{theme: 'badge error'}}>
                        <Icon icon="vaadin:clock" style={{padding: 'var(--lumo-space-xs)'}}/>
                        <span>Busy</span>  </span>
                    <p>{contactStatus?.numberOfBusy} contacts are Busy</p>
                </div>
                <div className="p-m shadow-s p-xl rounded-m ">
                    <span {...{theme: 'badge contrast'}}>
                        <Icon icon="vaadin:clock" style={{padding: 'var(--lumo-space-xs)'}}/>
                        <span>Offline</span>  </span>
                    <p>{contactStatus?.numberOfOffline} contacts are Offline</p>
                </div>
                <div className="p-m shadow-s p-xl rounded-m  ">
                    <span {...{theme: 'badge error'}}>
                        <Icon icon="vaadin:clock" style={{padding: 'var(--lumo-space-xs)'}}/>
                        <span>Away</span>  </span>
                    <p>{contactStatus?.numberOfAway} contacts are Away</p>
                </div>
            </HorizontalLayout>
        </VerticalLayout>
        // end::snippet[]
    );
}

