import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { calculateHealthMetrics } from '../utils/healthCalculator';

const Dashboard = ({ onLogout }) => {
    const [showExportModal, setShowExportModal] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', age: '', gender: 'Male', bloodGroup: '',
        height: '', weight: '', address: '', place: '', pincode: '', phone: '', membershipNo: ''
    });
    const [calcOptions, setCalcOptions] = useState({ bmi: false, bmr: false });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleCheck = (e) => setCalcOptions({ ...calcOptions, [e.target.name]: e.target.checked });

    const generatePDF = () => {
        const doc = new jsPDF();
        const metrics = calculateHealthMetrics(formData);

        doc.setFillColor(15, 23, 42); 
        doc.rect(0, 0, 210, 45, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(22);
        doc.text("LEXUS PRIME", 105, 20, null, null, "center");
        
        let y = 60;
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(14);
        doc.text("Member Details", 14, y);
        
        doc.autoTable({
            startY: y + 5,
            body: [
                ['Name', `${formData.firstName} ${formData.lastName}`],
                ['Phone', formData.phone],
                ['Details', `${formData.age} yrs / ${formData.gender}`],
                ['Address', formData.address]
            ]
        });

        if (calcOptions.bmi || calcOptions.bmr) {
            y = doc.lastAutoTable.finalY + 15;
            doc.text("Health Analysis", 14, y);
            const healthBody = [];
            if(calcOptions.bmi) healthBody.push(['BMI', `${metrics.bmi} (${metrics.bmiStatus})`]);
            if(calcOptions.bmi) healthBody.push(['Advice', metrics.bmiAdvice]);
            if(calcOptions.bmr) healthBody.push(['BMR', `${metrics.bmr} kcal/day`]);
            
            doc.autoTable({ startY: y + 5, body: healthBody });
        }
        
        doc.save(`Lexus_${formData.firstName}.pdf`);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-white p-4 shadow flex justify-between items-center">
                <h1 className="text-xl font-bold text-blue-900">Lexus Prime</h1>
                <button onClick={onLogout} className="text-red-500 font-bold">Logout</button>
            </header>
            <main className="p-8 max-w-4xl mx-auto w-full">
                <div className="bg-white p-8 rounded-xl shadow">
                    <h2 className="text-2xl font-bold mb-6">New Member</h2>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <input name="firstName" onChange={handleChange} placeholder="First Name" className="p-3 border rounded" />
                        <input name="phone" onChange={handleChange} placeholder="Phone" className="p-3 border rounded" />
                        <input name="age" type="number" onChange={handleChange} placeholder="Age" className="p-3 border rounded" />
                        <input name="height" type="number" onChange={handleChange} placeholder="Height (cm)" className="p-3 border rounded" />
                        <input name="weight" type="number" onChange={handleChange} placeholder="Weight (kg)" className="p-3 border rounded" />
                        <textarea name="address" onChange={handleChange} placeholder="Address" className="col-span-2 p-3 border rounded"></textarea>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded mb-6">
                        <label className="mr-4"><input type="checkbox" name="bmi" onChange={handleCheck} /> Add BMI</label>
                        <label><input type="checkbox" name="bmr" onChange={handleCheck} /> Add BMR</label>
                    </div>

                    <button onClick={() => setShowExportModal(true)} className="bg-blue-900 text-white px-6 py-2 rounded">Proceed</button>
                </div>
            </main>

            {showExportModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded">
                        <h3 className="font-bold text-lg mb-4">Export</h3>
                        <button onClick={generatePDF} className="bg-red-500 text-white w-full py-2 rounded mb-2">Download PDF</button>
                        <button onClick={() => alert("Connected to Sheets")} className="bg-green-600 text-white w-full py-2 rounded mb-4">Save to Sheets</button>
                        <button onClick={() => setShowExportModal(false)} className="text-gray-500 w-full">Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};
export default Dashboard;