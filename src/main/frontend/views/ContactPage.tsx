import {useEffect, useState} from "react";
import Contact from "Frontend/generated/org/vaadin/example/data/Contact";
import {ContactService} from "Frontend/generated/endpoints";
import {Button,  Grid, GridColumn, HorizontalLayout, Icon} from "@vaadin/react-components";
import ContactForm from "Frontend/components/ContactForm";
import ContactDiag from "Frontend/components/NewContactForm";

export default function ContactPage() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [selectedContact, setSelectedContact] = useState<Contact | undefined | null>(undefined);



    useEffect(() => {
        // @ts-ignore
        ContactService.findAll().then(setContacts);
    }, []);

    async function saveContact(contact: Contact) {
        const updatedContact = await ContactService.save(contact);
        // @ts-ignore
        setContacts(contacts?.map(c => c.id === updatedContact.id ? updatedContact : c));
        setSelectedContact(updatedContact);
    }

    async function cancelForm() {
        setSelectedContact(null);
    }

    const statusRenderer = (contact: Contact) => (
        <span
            {...({
                theme: `badge ${contact.status === 'Available' ? 'success' : 'error'}`,
            } satisfies object)}
        >
    {contact.status}
  </span>
    );

    async function deleteContact(contact: Contact) {
        // @ts-ignore
        await ContactService.delete(contact.id);
        // @ts-ignore
        setContacts(contacts?.filter(c => c.id !== contact.id));
    }

    return (
        <>
            <HorizontalLayout style={{alignItems: 'baseline'}}>
                <strong style={{flex: 1}}>Contact</strong>
                <ContactDiag/>
            </HorizontalLayout>
            <div className="p-m flex gap-m ">
                <Grid items={contacts}
                      onActiveItemChanged={(e) => setSelectedContact(e.detail.value)}
                      selectedItems={selectedContact ? [selectedContact] : []}
                      allRowsVisible={true}
                > <GridColumn path={"id"} header={"ID"} autoWidth/>
                    <GridColumn path={"name"} header={"Name"}/>
                    <GridColumn path={"email"} header={"Email"} autoWidth/>
                    <GridColumn path={"phone"} header={"Phone"}/>
                    <GridColumn path={"status"} header={"Status"} autoWidth>
                        {({item}) => statusRenderer(item as Contact)}
                    </GridColumn>
                    <GridColumn header="Manage">
                        {({item: person}) => (
                            <Button
                                theme="error tertiary icon"
                                onClick={() => deleteContact(person as Contact)}
                            >
                                <Icon icon="vaadin:trash"/>
                            </Button>
                        )}
                    </GridColumn>
                </Grid>
                {selectedContact &&
                    <ContactForm contact={selectedContact} onSubmit={saveContact} onCancel={cancelForm}/>
                }
            </div>
        </>
    );
}