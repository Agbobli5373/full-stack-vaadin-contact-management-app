import React, {useEffect, useState} from 'react';
import {Button, ComboBox, Dialog, TextField, VerticalLayout} from "@vaadin/react-components";
import {useForm} from "@vaadin/hilla-react-form";
import ContactModel from "Frontend/generated/org/vaadin/example/data/ContactModel";
import {ContactService} from "Frontend/generated/endpoints";



export  default function  ContactDiag() {
    const [dialogOpened, setDialogOpened] = useState(false);
    const { model,clear, submit, field } = useForm(ContactModel, {
        onSubmit: async (contact) => {
            const newContact = await ContactService.save(contact);
            clear();
            setDialogOpened(false);
        }
    });

    return (
        <>
            {/* tag::snippet[] */}
            <Dialog
                headerTitle="Add New Contact"
                opened={dialogOpened}
                onOpenedChanged={({ detail }) => {
                    setDialogOpened(detail.value);
                }}
                footerRenderer={() => (
                    <>
                        <Button onClick={() => setDialogOpened(false)}>Cancel</Button>
                        <Button theme="primary" onClick={submit}>
                            Add
                        </Button>
                    </>
                )}
            >
                <VerticalLayout style={{ alignItems: 'stretch', width: '18rem', maxWidth: '100%' }}>
                    <TextField label={"Name"} {...field(model.name)} />
                    <TextField label={"Email"} {...field(model.email)} />
                    <TextField label={"Phone"} {...field(model.phone)} />
                    <ComboBox label={"Status"} {...field(model.status)} items={["Available", "Busy", "Offline"]} />
                </VerticalLayout>
            </Dialog>

            <Button onClick={() => setDialogOpened(true)}>Add New</Button>
            {/* end::snippet[] */}
        </>
    );
}

