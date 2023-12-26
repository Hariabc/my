import React, { useState } from 'react';

const AdvocateList = () => {
  const [selectedType, setSelectedType] = useState(null);

  const advocates = [
    {
      id: 1,
      name: 'John Doe',
      specialization: 'Divorce Law',
      experience: '10 years',
      placeOfWork: 'Doe & Associates',
      practiceArea: 'Family Law, Divorce Cases',
      skills: 'Mediation, Negotiation',
      contact: 'john.doe@example.com',
    },
    {
      id: 2,
      name: 'Jane Smith',
      specialization: 'Criminal Law',
      experience: '8 years',
      placeOfWork: 'Smith Legal Firm',
      practiceArea: 'Criminal Defense',
      skills: 'Litigation, Legal Research',
      contact: 'jane.smith@example.com',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      specialization: 'Property Law',
      experience: '12 years',
      placeOfWork: 'Johnson & Partners',
      practiceArea: 'Real Estate Law',
      skills: 'Property Transactions, Land Use',
      contact: 'bob.johnson@example.com',
    },
    {
      id: 4,
      name: 'Alice Brown',
      specialization: 'Civil Law',
      experience: '15 years',
      placeOfWork: 'Brown Legal Services',
      practiceArea: 'Civil Litigation',
      skills: 'Trial Advocacy, Legal Writing',
      contact: 'alice.brown@example.com',
    },
    {
        id: 1,
        name: 'John Doe',
        specialization: 'Divorce Law',
        experience: '10 years',
        placeOfWork: 'Doe & Associates',
        practiceArea: 'Family Law, Divorce Cases',
        skills: 'Mediation, Negotiation',
        contact: 'john.doe@example.com',
      },
      {
        id: 2,
        name: 'Jane Smith',
        specialization: 'Criminal Law',
        experience: '8 years',
        placeOfWork: 'Smith Legal Firm',
        practiceArea: 'Criminal Defense',
        skills: 'Litigation, Legal Research',
        contact: 'jane.smith@example.com',
      },
      {
        id: 3,
        name: 'Bob Johnson',
        specialization: 'Property Law',
        experience: '12 years',
        placeOfWork: 'Johnson & Partners',
        practiceArea: 'Real Estate Law',
        skills: 'Property Transactions, Land Use',
        contact: 'bob.johnson@example.com',
      },
      {
        id: 4,
        name: 'Alice Brown',
        specialization: 'Civil Law',
        experience: '15 years',
        placeOfWork: 'Brown Legal Services',
        practiceArea: 'Civil Litigation',
        skills: 'Trial Advocacy, Legal Writing',
        contact: 'alice.brown@example.com',
      },
      {
        id: 1,
        name: 'John Doe',
        specialization: 'Divorce Law',
        experience: '10 years',
        placeOfWork: 'Doe & Associates',
        practiceArea: 'Family Law, Divorce Cases',
        skills: 'Mediation, Negotiation',
        contact: 'john.doe@example.com',
      },
      {
        id: 2,
        name: 'Jane Smith',
        specialization: 'Criminal Law',
        experience: '8 years',
        placeOfWork: 'Smith Legal Firm',
        practiceArea: 'Criminal Defense',
        skills: 'Litigation, Legal Research',
        contact: 'jane.smith@example.com',
      },
      {
        id: 3,
        name: 'Bob Johnson',
        specialization: 'Property Law',
        experience: '12 years',
        placeOfWork: 'Johnson & Partners',
        practiceArea: 'Real Estate Law',
        skills: 'Property Transactions, Land Use',
        contact: 'bob.johnson@example.com',
      },
      {
        id: 4,
        name: 'Alice Brown',
        specialization: 'Civil Law',
        experience: '15 years',
        placeOfWork: 'Brown Legal Services',
        practiceArea: 'Civil Litigation',
        skills: 'Trial Advocacy, Legal Writing',
        contact: 'alice.brown@example.com',
      },
      {
        id: 1,
        name: 'John Doe',
        specialization: 'Divorce Law',
        experience: '10 years',
        placeOfWork: 'Doe & Associates',
        practiceArea: 'Family Law, Divorce Cases',
        skills: 'Mediation, Negotiation',
        contact: 'john.doe@example.com',
      },
      {
        id: 2,
        name: 'Jane Smith',
        specialization: 'Criminal Law',
        experience: '8 years',
        placeOfWork: 'Smith Legal Firm',
        practiceArea: 'Criminal Defense',
        skills: 'Litigation, Legal Research',
        contact: 'jane.smith@example.com',
      },
      {
        id: 3,
        name: 'Bob Johnson',
        specialization: 'Property Law',
        experience: '12 years',
        placeOfWork: 'Johnson & Partners',
        practiceArea: 'Real Estate Law',
        skills: 'Property Transactions, Land Use',
        contact: 'bob.johnson@example.com',
      },
      {
        id: 4,
        name: 'Alice Brown',
        specialization: 'Civil Law',
        experience: '15 years',
        placeOfWork: 'Brown Legal Services',
        practiceArea: 'Civil Litigation',
        skills: 'Trial Advocacy, Legal Writing',
        contact: 'alice.brown@example.com',
      },
      {
        id: 1,
        name: 'John Doe',
        specialization: 'Divorce Law',
        experience: '10 years',
        placeOfWork: 'Doe & Associates',
        practiceArea: 'Family Law, Divorce Cases',
        skills: 'Mediation, Negotiation',
        contact: 'john.doe@example.com',
      },
      {
        id: 2,
        name: 'Jane Smith',
        specialization: 'Criminal Law',
        experience: '8 years',
        placeOfWork: 'Smith Legal Firm',
        practiceArea: 'Criminal Defense',
        skills: 'Litigation, Legal Research',
        contact: 'jane.smith@example.com',
      },
      {
        id: 3,
        name: 'Bob Johnson',
        specialization: 'Property Law',
        experience: '12 years',
        placeOfWork: 'Johnson & Partners',
        practiceArea: 'Real Estate Law',
        skills: 'Property Transactions, Land Use',
        contact: 'bob.johnson@example.com',
      },
      {
        id: 4,
        name: 'Alice Brown',
        specialization: 'Civil Law',
        experience: '15 years',
        placeOfWork: 'Brown Legal Services',
        practiceArea: 'Civil Litigation',
        skills: 'Trial Advocacy, Legal Writing',
        contact: 'alice.brown@example.com',
      },
    // ... Add more advocate data as needed
  ];

  const getAdvocatesByType = (type) => advocates.filter((advocate) => advocate.specialization === type);

  return (
    <div>
        <h1 className="text-3xl font-bold underline text-rose-700">
      Hello world!
    </h1>

    <button
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded `}>
      hari
    </button>
      <h2>Advocate List</h2>

      <div>
        <button onClick={() => setSelectedType('Divorce Law')}>Divorce Law</button>
        <button onClick={() => setSelectedType('Criminal Law')}>Criminal Law</button>
        <button onClick={() => setSelectedType('Property Law')}>Property Law</button>
        <button onClick={() => setSelectedType('Civil Law')}>Civil Law</button>
      </div>

      {selectedType && (
        <div>
          <h3>{selectedType} Lawyers</h3>
          <ul>
            {getAdvocatesByType(selectedType).map((advocate) => (
              <li key={advocate.id}>
                <strong>{advocate.name}</strong>
                <p>Experience: {advocate.experience}</p>
                <p>Place of Work: {advocate.placeOfWork}</p>
                <p>Practice Area: {advocate.practiceArea}</p>
                <p>Skills: {advocate.skills}</p>
                <button>Contact</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdvocateList;


// const people = [
//     {
//       name: 'Leslie Alexander',
//       role: 'Co-Founder / CEO',
//       imageUrl:
//         'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     },
//     // More people...
//   ]
  
//   export default function Example() {
//     return (
//       <div className="bg-white py-24 sm:py-32">
//         <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
//           <div className="max-w-2xl">
//             <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet our leadership</h2>
//             <p className="mt-6 text-lg leading-8 text-gray-600">
//               Libero fames augue nisl porttitor nisi, quis. Id ac elit odio vitae elementum enim vitae ullamcorper
//               suspendisse.
//             </p>
//           </div>
//           <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
//             {people.map((person) => (
//               <li key={person.name}>
//                 <div className="flex items-center gap-x-6">
//                   <img className="h-16 w-16 rounded-full" src={person.imageUrl} alt="" />
//                   <div>
//                     <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
//                     <p className="text-sm font-semibold leading-6 text-indigo-600">{person.role}</p>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     )
//   }
  