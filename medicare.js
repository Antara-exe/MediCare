const symptomDatabase = {
            'fever': {
                symptoms: ['high temperature', 'fever', 'hot', 'chills', 'sweating'],
                advice: 'Monitor temperature, stay hydrated, rest. Seek medical attention if fever exceeds 103°F (39.4°C) or persists beyond 3 days.',
                severity: 'moderate'
            },
            'headache': {
                symptoms: ['headache', 'head pain', 'migraine', 'head hurts'],
                advice: 'Try rest in a dark room, stay hydrated, consider over-the-counter pain relievers. Seek immediate help for sudden severe headaches.',
                severity: 'mild'
            },
            'chest pain': {
                symptoms: ['chest pain', 'chest hurts', 'heart pain', 'chest pressure'],
                advice: '🚨 SEEK IMMEDIATE MEDICAL ATTENTION! Call emergency services. This could indicate a heart attack or other serious condition.',
                severity: 'severe'
            },
            'shortness of breath': {
                symptoms: ['shortness of breath', 'breathing difficulty', 'cant breathe', 'breathless'],
                advice: '🚨 URGENT: Sit upright, try to stay calm. Seek immediate medical attention, especially if sudden onset.',
                severity: 'severe'
            },
            'stomach pain': {
                symptoms: ['stomach pain', 'belly pain', 'abdominal pain', 'stomach ache'],
                advice: 'Try gentle movements, stay hydrated. Seek medical attention for severe, persistent pain or if accompanied by fever.',
                severity: 'moderate'
            },
            'cough': {
                symptoms: ['cough', 'coughing', 'persistent cough'],
                advice: 'Stay hydrated, use honey for soothing. See a doctor if cough persists beyond 2 weeks or is accompanied by blood.',
                severity: 'mild'
            }
        };

        function showTab(tabId) {
            document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.nav-tab').forEach(btn => btn.classList.remove('active'));
            
            document.getElementById(tabId).classList.add('active');
            event.target.classList.add('active');
        }

        function handleSymptomKeyPress(event) {
            if (event.key === 'Enter') {
                processSymptom();
            }
        }

        function processSymptom() {
            const input = document.getElementById('symptom-input');
            const userMessage = input.value.trim();
            
            if (!userMessage) return;
            
            addMessage(userMessage, 'user');
            input.value = '';
            
            setTimeout(() => {
                const response = analyzeSymptom(userMessage);
                addMessage(response, 'bot');
            }, 1000);
        }

        function addMessage(message, sender) {
            const chatMessages = document.getElementById('chat-messages');
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}-message`;
            
            if (sender === 'bot') {
                messageDiv.innerHTML = message;
            } else {
                messageDiv.textContent = message;
            }
            
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function analyzeSymptom(userInput) {
            const inputLower = userInput.toLowerCase();
            let bestMatch = null;
            let highestScore = 0;
            
            for (const [condition, data] of Object.entries(symptomDatabase)) {
                for (const symptom of data.symptoms) {
                    if (inputLower.includes(symptom)) {
                        const score = symptom.length / inputLower.length;
                        if (score > highestScore) {
                            highestScore = score;
                            bestMatch = data;
                        }
                    }
                }
            }
            
            if (bestMatch) {
                let severityIcon = '💊';
                if (bestMatch.severity === 'severe') severityIcon = '🚨';
                else if (bestMatch.severity === 'moderate') severityIcon = '⚠️';
                
                return `${severityIcon} <strong>Preliminary Assessment:</strong><br><br>${bestMatch.advice}<br><br>⚠️ <em>This is not a medical diagnosis. Please consult a healthcare professional for proper evaluation and treatment.</em>`;
            } else {
                return `I understand you're experiencing some symptoms. While I can't provide specific guidance for your situation, I recommend:<br><br>
                • Monitor your symptoms<br>
                • Stay hydrated and rest<br>
                • Consult a healthcare professional if symptoms worsen or persist<br>
                • Seek immediate medical attention for severe symptoms<br><br>
                ⚠️ <em>Always consult a healthcare professional for accurate diagnosis and treatment.</em>`;
            }
        }

        // First Aid Guide
        const firstAidGuides = {
            'cpr': {
                title: '💓 CPR (Cardiopulmonary Resuscitation)',
                steps: [
                    '1. Check for responsiveness - tap shoulders and shout "Are you okay?"',
                    '2. Call emergency services (102 in India) immediately',
                    '3. Position: Place heel of one hand on center of chest between nipples',
                    '4. Place other hand on top, interlacing fingers',
                    '5. Push hard and fast at least 2 inches deep',
                    '6. Compress at rate of 100-120 per minute',
                    '7. Allow complete chest recoil between compressions',
                    '8. Continue until emergency services arrive'
                ],
                warning: '⚠️ Only perform if person is unresponsive and not breathing normally'
            },
            'choking': {
                title: '🫁 Choking - Heimlich Maneuver',
                steps: [
                    '1. Stand behind the person',
                    '2. Wrap arms around their waist',
                    '3. Make a fist with one hand, place thumb side against stomach above navel',
                    '4. Grasp fist with other hand',
                    '5. Give quick upward thrusts into the abdomen',
                    '6. Repeat until object is expelled or person becomes unconscious',
                    '7. If unconscious, begin CPR and call emergency services'
                ],
                warning: '⚠️ For infants under 1 year: Use back blows and chest thrusts instead'
            },
            'bleeding': {
                title: '🩸 Severe Bleeding Control',
                steps: [
                    '1. Call emergency services for severe bleeding',
                    '2. Wear gloves if available',
                    '3. Apply direct pressure to wound with clean cloth',
                    '4. Maintain pressure - do not remove blood-soaked cloths',
                    '5. Add more cloths on top if needed',
                    '6. Elevate injured area above heart level if possible',
                    '7. Apply pressure to pressure points if direct pressure fails',
                    '8. Monitor for shock symptoms'
                ],
                warning: '⚠️ Do not remove embedded objects - stabilize them instead'
            },
            'burns': {
                title: '🔥 Burn Treatment',
                steps: [
                    '1. Remove from heat source immediately',
                    '2. Cool burn with cool (not cold) water for 10-20 minutes',
                    '3. Remove jewelry/clothing from burned area before swelling',
                    '4. Cover with sterile gauze (do not use cotton)',
                    '5. Take over-the-counter pain medication if needed',
                    '6. Do not break blisters',
                    '7. Seek medical attention for large or deep burns'
                ],
                warning: '⚠️ For chemical burns: Remove contaminated clothing and flush with water'
            },
            'fractures': {
                title: '🦴 Fracture Management',
                steps: [
                    '1. Do not move the person unless in immediate danger',
                    '2. Check for circulation, feeling, and movement below injury',
                    '3. Immobilize the injury using splints',
                    '4. Splint should extend beyond joints above and below fracture',
                    '5. Pad splints to prevent pressure sores',
                    '6. Apply ice packs to reduce swelling',
                    '7. Monitor for shock',
                    '8. Get immediate medical attention'
                ],
                warning: '⚠️ Do not try to realign bones or push protruding bones back in'
            },
            'allergic': {
                title: '🤧 Allergic Reaction Management',
                steps: [
                    '1. Remove or avoid the allergen if known',
                    '2. For mild reactions: antihistamines may help',
                    '3. Apply cool compresses to affected skin',
                    '4. Monitor breathing and consciousness',
                    '5. For severe reactions (anaphylaxis): Call emergency services',
                    '6. Use epinephrine auto-injector if available',
                    '7. Keep person lying down with legs elevated',
                    '8. Be prepared to perform CPR'
                ],
                warning: '⚠️ Anaphylaxis is life-threatening - call emergency services immediately'
            }
        };

        function showFirstAid(type) {
            const guide = firstAidGuides[type];
            const detailsDiv = document.getElementById('first-aid-details');
            const contentDiv = document.getElementById('first-aid-content');
            
            let stepsHtml = guide.steps.map(step => `<li>${step}</li>`).join('');
            
            contentDiv.innerHTML = `
                <h3>${guide.title}</h3>
                <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 15px; margin: 15px 0;">
                    ${guide.warning}
                </div>
                <ol style="margin: 20px 0; padding-left: 20px;">
                    ${stepsHtml}
                </ol>
                <div style="background: #f8d7da; border: 1px solid #f5c6cb; border-radius: 8px; padding: 15px; margin: 15px 0;">
                    <strong>🚨 Remember:</strong> These are emergency procedures. Always seek professional medical help as soon as possible.
                </div>
            `;
            
            detailsDiv.style.display = 'block';
            detailsDiv.scrollIntoView({ behavior: 'smooth' });
        }

        // Hospital Locator
        let userLocation = null;
        const sampleHospitals = [
            { name: 'Apollo Hospital', address: '58, Canal Circular Road, Kolkata', phone: '+91-33-2320-3040', distance: '2.3 km', specialty: 'Multi-specialty' },
            { name: 'AMRI Hospital', address: 'P-4 & 5, CIT Scheme XLVIII, Kolkata', phone: '+91-33-2324-0200', distance: '3.1 km', specialty: 'Cardiac Care' },
            { name: 'Fortis Hospital', address: '730, Anandapur, E M Bypass, Kolkata', phone: '+91-33-6628-4000', distance: '4.2 km', specialty: 'Cancer Care' },
            { name: 'Rabindranath Tagore International Institute', address: '124, Mukundapur, Kolkata', phone: '+91-33-6633-4000', distance: '5.1 km', specialty: 'Heart Institute' },
            { name: 'Peerless Hospital', address: '360, Panchasayar, Garia, Kolkata', phone: '+91-33-6602-3040', distance: '6.3 km', specialty: 'Multi-specialty' }
        ];

        function getCurrentLocation() {
            const mapContainer = document.getElementById('map-container');
            mapContainer.innerHTML = '<div class="loading"></div> <span style="margin-left: 10px;">Getting your location...</span>';
            
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        userLocation = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        showMap();
                        displayHospitals();
                    },
                    (error) => {
                        mapContainer.innerHTML = '❌ Location access denied. Please enter your location manually.';
                    }
                );
            } else {
                mapContainer.innerHTML = '❌ Geolocation not supported by this browser.';
            }
        }

        function searchLocation() {
            const location = document.getElementById('location-search').value.trim();
            if (!location) return;
            
            const mapContainer = document.getElementById('map-container');
            mapContainer.innerHTML = `<div class="loading"></div> <span style="margin-left: 10px;">Searching for hospitals in ${location}...</span>`;
            
            setTimeout(() => {
                showMap();
                displayHospitals(location);
            }, 1500);
        }

        function showMap() {
            const mapContainer = document.getElementById('map-container');
            mapContainer.innerHTML = `
                <div style="text-align: center; color: #666; line-height: 1.6;">
                    🗺️ <strong>Interactive Map</strong><br>
                    📍 Your location and nearby hospitals would be displayed here<br>
                    <small>In a real implementation, this would integrate with Google Maps or OpenStreetMap</small>
                </div>
            `;
        }

        function displayHospitals(searchLocation = null) {
            const hospitalsList = document.getElementById('hospitals-list');
            const title = searchLocation ? `Hospitals near ${searchLocation}` : 'Hospitals near you';
            
            let hospitalsHtml = `<h3>${title}</h3>`;
            
            sampleHospitals.forEach(hospital => {
                hospitalsHtml += `
                    <div class="hospital-card">
                        <h4>🏥 ${hospital.name}</h4>
                        <p><strong>📍 Address:</strong> ${hospital.address}</p>
                        <p><strong>📞 Phone:</strong> <a href="tel:${hospital.phone}" style="color: #667eea;">${hospital.phone}</a></p>
                        <p><strong>📏 Distance:</strong> ${hospital.distance}</p>
                        <p><strong>🏥 Specialty:</strong> ${hospital.specialty}</p>
                        <button onclick="getDirections('${hospital.name}')" style="background: #667eea; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; margin-top: 10px;">Get Directions</button>
                    </div>
                `;
            });
            
            hospitalsList.innerHTML = hospitalsHtml;
        }

        function getDirections(hospitalName) {
            alert(`🗺️ Directions to ${hospitalName}\n\nIn a real implementation, this would:\n• Open your default maps app\n• Provide turn-by-turn navigation\n• Show real-time traffic conditions\n• Estimate arrival time`);
        }

        // Emergency contacts and additional features
        function showEmergencyContacts() {
            const emergencyInfo = `
                🚨 EMERGENCY CONTACTS (India)
                
                • Medical Emergency: 102
                • Fire: 101
                • Police: 100
                • Disaster Management: 108
                • Women Helpline: 1091
                • Child Helpline: 1098
                
                📞 Save these numbers in your phone!
            `;
            alert(emergencyInfo);
        }

        // Initialize the application
        document.addEventListener('DOMContentLoaded', function() {
            // Add emergency contact button
            const header = document.querySelector('.header');
            const emergencyBtn = document.createElement('button');
            emergencyBtn.innerHTML = '🚨 Emergency Contacts';
            emergencyBtn.className = 'location-btn';
            emergencyBtn.onclick = showEmergencyContacts;
            emergencyBtn.style.position = 'fixed';
            emergencyBtn.style.top = '20px';
            emergencyBtn.style.right = '20px';
            emergencyBtn.style.zIndex = '1000';
            document.body.appendChild(emergencyBtn);

            // Add some sample interaction to the symptom checker
            setTimeout(() => {
                const chatMessages = document.getElementById('chat-messages');
                const suggestionDiv = document.createElement('div');
                suggestionDiv.className = 'message bot-message';
                suggestionDiv.innerHTML = `
                    💡 <strong>Quick suggestions to try:</strong><br>
                    • "I have a headache and fever"<br>
                    • "Chest pain and shortness of breath"<br>
                    • "Stomach ache after eating"<br>
                    • "Persistent cough for 3 days"
                `;
                chatMessages.appendChild(suggestionDiv);
            }, 3000);
        });

        // Add voice input capability
        function startVoiceInput() {
            if ('webkitSpeechRecognition' in window) {
                const recognition = new webkitSpeechRecognition();
                recognition.continuous = false;
                recognition.interimResults = false;
                recognition.lang = 'en-US';
                
                recognition.onstart = function() {
                    document.getElementById('symptom-input').placeholder = '🎤 Listening...';
                };
                
                recognition.onresult = function(event) {
                    const transcript = event.results[0][0].transcript;
                    document.getElementById('symptom-input').value = transcript;
                    processSymptom();
                };
                
                recognition.onerror = function(event) {
                    document.getElementById('symptom-input').placeholder = 'Voice recognition error. Please type your symptoms...';
                };
                
                recognition.onend = function() {
                    document.getElementById('symptom-input').placeholder = 'Describe your symptoms...';
                };
                
                recognition.start();
            } else {
                alert('Voice recognition not supported in this browser.');
            }
        }

        // Add voice button to chat input
        setTimeout(() => {
            const chatInputContainer = document.querySelector('.chat-input-container');
            const voiceBtn = document.createElement('button');
            voiceBtn.innerHTML = '🎤';
            voiceBtn.className = 'send-btn';
            voiceBtn.onclick = startVoiceInput;
            voiceBtn.title = 'Voice Input';
            chatInputContainer.insertBefore(voiceBtn, chatInputContainer.lastElementChild);
        }, 1000);

        // Enhanced symptom analysis with more conditions
        const enhancedSymptomDatabase = {
            ...symptomDatabase,
            'back pain': {
                symptoms: ['back pain', 'lower back pain', 'spine pain', 'back hurts'],
                advice: 'Rest, apply ice for first 24 hours then heat. Gentle stretching may help. See a doctor if pain persists or radiates down legs.',
                severity: 'moderate'
            },
            'nausea': {
                symptoms: ['nausea', 'feeling sick', 'queasy', 'want to vomit'],
                advice: 'Try small sips of clear fluids, rest. Avoid solid foods initially. Seek medical attention if persistent or with severe abdominal pain.',
                severity: 'mild'
            },
            'dizziness': {
                symptoms: ['dizzy', 'lightheaded', 'vertigo', 'spinning sensation'],
                advice: 'Sit or lie down immediately. Stay hydrated. Avoid sudden movements. Seek immediate help if with chest pain or severe headache.',
                severity: 'moderate'
            },
            'rash': {
                symptoms: ['rash', 'skin irritation', 'red spots', 'itchy skin'],
                advice: 'Keep area clean and dry. Avoid scratching. Consider antihistamines for itching. Seek medical attention if spreading rapidly.',
                severity: 'mild'
            },
            'joint pain': {
                symptoms: ['joint pain', 'arthritis', 'knee pain', 'shoulder pain', 'wrist pain'],
                advice: 'Rest affected joint, apply ice for swelling or heat for stiffness. Over-the-counter anti-inflammatory may help. See doctor if persistent.',
                severity: 'moderate'
            }
        };

        // Update the symptom database
        Object.assign(symptomDatabase, enhancedSymptomDatabase);

        // Add medication reminder feature
        let medicationReminders = [];

        function addMedicationReminder() {
            const medication = prompt('Enter medication name:');
            const time = prompt('Enter time (HH:MM format):');
            
            if (medication && time) {
                medicationReminders.push({ medication, time });
                alert(`✅ Reminder set for ${medication} at ${time}`);
                // In a real app, this would integrate with device notifications
            }
        }

        // Health tips rotation
        const healthTips = [
            "💧 Drink at least 8 glasses of water daily",
            "🚶‍♂️ Take a 10-minute walk after meals",
            "😴 Aim for 7-9 hours of sleep each night",
            "🥗 Include 5 servings of fruits and vegetables daily",
            "🧘‍♀️ Practice deep breathing for 5 minutes daily",
            "🏃‍♂️ Exercise for at least 30 minutes, 3 times a week",
            "📱 Take regular breaks from screens",
            "🧴 Wash hands frequently for at least 20 seconds"
        ];

        function showRandomHealthTip() {
            const tip = healthTips[Math.floor(Math.random() * healthTips.length)];
            const tipDiv = document.createElement('div');
            tipDiv.style.cssText = 'position: fixed; bottom: 20px; right: 20px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 15px; border-radius: 10px; max-width: 300px; z-index: 1000; animation: slideIn 0.5s ease-out;';
            tipDiv.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div><strong>💡 Health Tip:</strong><br>${tip}</div>
                    <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: white; font-size: 18px; cursor: pointer;">×</button>
                </div>
            `;
            document.body.appendChild(tipDiv);
            
            setTimeout(() => {
                if (tipDiv.parentNode) {
                    tipDiv.remove();
                }
            }, 5000);
        }

        // Show health tip every 30 seconds
        setInterval(showRandomHealthTip, 30000);

        // Add BMI Calculator
        function calculateBMI() {
            const weight = prompt('Enter your weight in kg:');
            const height = prompt('Enter your height in cm:');
            
            if (weight && height) {
                const heightM = height / 100;
                const bmi = (weight / (heightM * heightM)).toFixed(1);
                
                let category = '';
                if (bmi < 18.5) category = 'Underweight';
                else if (bmi < 25) category = 'Normal weight';
                else if (bmi < 30) category = 'Overweight';
                else category = 'Obese';
                
                alert(`📊 Your BMI: ${bmi}\nCategory: ${category}\n\nRemember: BMI is just one health indicator. Consult a healthcare professional for comprehensive health assessment.`);
            }
        }

        // Enhanced keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case '1':
                        e.preventDefault();
                        showTab('symptom-checker');
                        document.querySelector('[onclick="showTab(\'symptom-checker\')"]').classList.add('active');
                        break;
                    case '2':
                        e.preventDefault();
                        showTab('first-aid');
                        document.querySelector('[onclick="showTab(\'first-aid\')"]').classList.add('active');
                        break;
                    case '3':
                        e.preventDefault();
                        showTab('hospital-locator');
                        document.querySelector('[onclick="showTab(\'hospital-locator\')"]').classList.add('active');
                        break;
                }
            }
        });

        // Add a footer with additional information
        setTimeout(() => {
            const footer = document.createElement('div');
            footer.innerHTML = `
                <div style="text-align: center; margin-top: 40px; padding: 20px; background: rgba(255,255,255,0.1); border-radius: 15px; color: white;">
                    <h3>🏥 MediCare - Additional Features</h3>
                    <div style="display: flex; justify-content: center; gap: 20px; margin: 20px 0; flex-wrap: wrap;">
                        <button onclick="calculateBMI()" class="location-btn">📊 BMI Calculator</button>
                        <button onclick="addMedicationReminder()" class="location-btn">💊 Medication Reminder</button>
                        <button onclick="showRandomHealthTip()" class="location-btn">💡 Health Tips</button>
                    </div>
                    <p style="font-size: 14px; opacity: 0.8;">
                        ⚠️ <strong>Medical Disclaimer:</strong> This tool provides general health information and is not a substitute for professional medical advice, diagnosis, or treatment. 
                        Always consult qualified healthcare providers for medical concerns.
                    </p>
                    <p style="font-size: 12px; margin-top: 10px; opacity: 0.7;">
                        Keyboard shortcuts: Ctrl+1 (Symptoms) | Ctrl+2 (First Aid) | Ctrl+3 (Hospitals)
                    </p>
                </div>
            `;
            document.querySelector('.container').appendChild(footer);
        }, 2000);