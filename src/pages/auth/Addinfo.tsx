import React, { ChangeEvent, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope, faTrash } from '@fortawesome/free-solid-svg-icons';
import ReactQuill from 'react-quill';

interface FormData {
    fullName: string;
    headline: string;
    email: string;
    website: string;
    phone: string;
    location: string;
    picture: File | null;
}

const Addinfo: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        headline: '',
        email: '',
        website: '',
        phone: '',
        location: '',
        picture: null,
    });
    const [pictureName, setPictureName] = useState<string>('');
    const [pictureURL, setPictureURL] = useState<string | null>(null);
    const [customFields, setCustomFields] = useState<{ label: string; value: string }[]>([]);
    const [summary, setSummary] = useState<string>('');


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;

        if (name === 'picture' && files && files[0]) {
            const file = files[0];
            setFormData((prev) => ({
                ...prev,
                picture: file,
            }));
            setPictureName(file.name);
            const objectUrl = URL.createObjectURL(file);
            setPictureURL(objectUrl);
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const removeImage = () => {
        setFormData((prev) => ({ ...prev, picture: null }));
        setPictureName('');
        setPictureURL(null);
    };

    const handleCustomFieldChange = (
        index: number,
        field: 'label' | 'value',
        newValue: string
    ) => {
        const updated = [...customFields];
        updated[index][field] = newValue;
        setCustomFields(updated);
    };
    const handleDeleteCustomField = (index: number) => {
        const updated = [...customFields];
        updated.splice(index, 1);
        setCustomFields(updated);
    };



    return (
        <div className="flex min-h-screen text-white">
            {/* Sidebar Form */}
            <div className="bg-black w-1/3 p-6 space-y-4">
                <h1 className="text-3xl font-bold">Basics</h1>

                {/* Image Upload */}
                <div>
                    <label className="block mb-1">Picture</label>
                    <input
                        type="file"
                        name="picture"
                        accept="image/*"
                        onChange={handleChange}
                        className="w-full bg-gray-800 text-white p-2 rounded"
                    />

                    {pictureName && (
                        <div className="mt-2 flex items-center justify-between">
                            <p className="text-sm text-gray-400">Selected: {pictureName}</p>
                            <button
                                onClick={removeImage}
                                className="text-red-500 text-xs hover:underline"
                            >
                                Remove
                            </button>
                        </div>
                    )}
                </div>

                {/* Text Inputs */}
                {[
                    { label: 'Full Name', name: 'fullName', type: 'text' },
                    { label: 'Headline', name: 'headline', type: 'text' },
                    { label: 'Email', name: 'email', type: 'email' },
                    { label: 'Website', name: 'website', type: 'url' },
                    { label: 'Phone', name: 'phone', type: 'text' },
                    { label: 'Location', name: 'location', type: 'text' },
                ].map(({ label, name, type }) => (
                    <div key={name}>
                        <label className="block mb-1">{label}</label>
                        <input
                            type={type}
                            name={name}
                            value={formData[name as keyof FormData] as string}
                            onChange={handleChange}
                            className="w-full bg-gray-800 text-white p-2 rounded"
                        />
                    </div>
                ))}

                <button
                    type="button"
                    onClick={() => setCustomFields([...customFields, { label: '', value: '' }])}
                    className=" hover:underline mt-2"
                >
                    + Add a custom field
                </button>
                {customFields.map((field, index) => (
                    <div key={index} className="flex gap-2 items-center">
                        <input
                            type="text"
                            placeholder="Label"
                            value={field.label}
                            onChange={(e) => handleCustomFieldChange(index, 'label', e.target.value)}
                            className="w-1/2 bg-gray-800 text-white p-2 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Value"
                            value={field.value}
                            onChange={(e) => handleCustomFieldChange(index, 'value', e.target.value)}
                            className="w-1/2 bg-gray-800 text-white p-2 rounded"
                        />
                        <button
                            onClick={() => handleDeleteCustomField(index)}
                            className="text-red-500 text-sm hover:underline"
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                ))}

                <hr />
                <div className="mt-6">
                    <h2 className="text-2xl font-bold mb-5">Summary</h2>
                    <ReactQuill
                        theme="snow"
                        value={summary}
                        onChange={setSummary}
                        className="bg-white text-black rounded"
                        placeholder="Write a short summary..."
                    />

                </div>

            </div>



            {/* Profile Preview */}
            <div className="flex-1 bg-white text-black flex flex-col items-center p-6">

                {pictureURL ? (
                    <div
                        className="w-24 h-24 rounded-full mb-4 bg-cover bg-center"
                        style={{ backgroundImage: `url(${pictureURL})` }}
                    />
                ) : (
                    <div className="w-24 h-24 bg-gray-300 rounded-full mb-4 flex items-center justify-center text-xl text-white">
                        {formData.fullName ? formData.fullName.charAt(0).toUpperCase() : 'S'}
                    </div>
                )}


                <h2 className="text-2xl font-bold">{formData.fullName || 'Your Name'}</h2>
                <p className="text-gray-600">{formData.headline || 'Your Headline'}</p>

                <div className="flex items-center mt-3 space-x-4 text-sm text-gray-700">
                    {formData.location && (
                        <div>
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-500 mr-2" />
                            {formData.location}
                        </div>
                    )}
                    {formData.phone && (
                        <div>
                            <FontAwesomeIcon icon={faPhone} className="text-red-500 mr-2" />
                            {formData.phone}
                        </div>
                    )}
                    {formData.email && (
                        <div>
                            <FontAwesomeIcon icon={faEnvelope} className="text-red-500 mr-2" />
                            <a href={`mailto:${formData.email}`} className="text-blue-600 underline">
                                {formData.email}
                            </a>
                        </div>
                    )}
                    <div className="flex items-center space-x-3 text-sm text-gray-700">
                        {customFields.map((field, index) =>
                            field.label && field.value ? (
                                <div key={index}>
                                    <strong>{field.label}:</strong> {field.value}
                                </div>
                            ) : null
                        )}
                    </div>

                </div>


                {summary && (
                    <div className="mt-3 prose prose-sm prose-p:my-2" dangerouslySetInnerHTML={{ __html: summary }} />
                )}

            </div>
        </div>
    );
};

export default Addinfo;
