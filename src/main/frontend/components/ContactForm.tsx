import Contact from "Frontend/generated/org/vaadin/example/data/Contact";
import {Button, ComboBox, TextField} from "@vaadin/react-components";
import {useForm} from "@vaadin/hilla-react-form";
import ContactModel from "Frontend/generated/org/vaadin/example/data/ContactModel";
import {useEffect} from "react";

interface ContactFormProps {
    contact: Contact;
    onSubmit: (contact: Contact) => Promise<void>;
    onCancel?: () => Promise<void>;
}

export default function ContactForm({contact, onSubmit, onCancel}: ContactFormProps) {
   const { field,model, submit,reset, read, invalid,  } =  useForm(ContactModel,{onSubmit});

    useEffect(() => {
        read(contact)
    }, [contact]);

    return (
        <div>
            <h1 className={"m-m"}>Contact Form</h1>
            <div className={"flex flex-col gap-s items-center p-m border"}>
                <TextField label={"Name"} {...field(model.name)} />
                <TextField label={"Email"} {...field(model.email)} />
                <TextField label={"Phone"} {...field(model.phone)} />
                <ComboBox label={"Status"} {...field(model.status)} items={["Available", "Busy", "Offline"]} />
               <div className={"flex gap-s"}>
                     <Button onClick={submit} disabled={invalid} theme={"primary"} >Save</Button>
                     <Button onClick={reset} theme={"tertiary"} >Reset</Button>
                     <Button onClick={onCancel} theme={"tertiary"} >Cancel</Button>
               </div>
            </div>
        </div>
    );
}