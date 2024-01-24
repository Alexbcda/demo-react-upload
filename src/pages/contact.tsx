import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Container from '@/components/Container';
import FormRow from '@/components/FormRow';
import FormLabel from '@/components/FormLabel';
import InputText from '@/components/InputText';
import Button from '@/components/Button';

function Contact() {
  const [file, setFile] = useState<File | undefined>();
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  /**
   * handleOnSubmit
   */
  async function handleOnSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    // Vérifiez si un fichier a été sélectionné
    if (!file) {
      console.error("No file selected");
      return;
    }

    // Créez une nouvelle instance de FormData
    const formData = new FormData();

    // Ajoutez le fichier, l'upload preset et la clé API à la FormData
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_APP_CLOUDINARY_UPLOAD_PRESET);
    formData.append("api_key", import.meta.env.VITE_APP_CLOUDINARY_API_KEY);

    try {
      // Envoyez la FormData vers Cloudinary
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/devjx5p3k/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      console.log('Cloudinary Response:', response);

      if (response.ok) {
        // Si la réponse est OK, parsez le JSON de la réponse
        const jsonResponse = await response.json();
        console.log('File uploaded to Cloudinary:', jsonResponse);
      } else {
        // Si la réponse n'est pas OK, lancez une erreur
        throw new Error(`Error uploading file to Cloudinary. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error uploading file to Cloudinary:', error);
    }
  }

  /**
   * handleOnChange
   */
  function handleOnChange(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };

    if (target.files && target.files[0]) {
      setFile(target.files[0]);

      const fileReader = new FileReader();

      fileReader.onload = function () {
        setPreview(fileReader.result);
      };

      fileReader.readAsDataURL(target.files[0]);
    }
  }

  return (
    <Layout>
      <Container>
        <h1 className="text-6xl font-black text-center text-slate-900 mb-20">
          Contact Us
        </h1>
        
        <form className="max-w-md border border-gray-200 rounded p-6 mx-auto" onSubmit={handleOnSubmit}>
          <FormRow className="mb-5">
            <FormLabel htmlFor="name">Name</FormLabel>
            <InputText id="name" name="name" type="text" />
          </FormRow>

          <FormRow className="mb-5">
            <FormLabel htmlFor="email">Email</FormLabel>
            <InputText id="email" name="email" type="email" />
          </FormRow>
          
          <FormRow className="mb-5">
            <FormLabel htmlFor="message">Message</FormLabel>
            <InputText id="message" name="message" type="text" />
          </FormRow>

          {/* Ajout du champ de téléchargement de fichier avec la gestion du changement */}
          <FormRow className="mb-5">
            <FormLabel htmlFor="image">Upload Image</FormLabel>
            <input id="image" type="file" name="image" accept="image/*" onChange={handleOnChange} />
          </FormRow>

          {preview && (
            <p><img src={preview as string} alt="Aperçu du téléchargement" /></p>
          )}

          <Button>Submit</Button>
        </form>
      </Container>
    </Layout>
  );
}

export default Contact;
