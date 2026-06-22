 // Variables globales
        let currentStep = 1;
        const totalSteps = 9;

        // Navigation de la navbar
        window.addEventListener('scroll', function() {
            const nav = document.querySelector('nav');
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });

        // Modals
        function openModal(modalIndex) {
            const modal = document.getElementById(`modal${modalIndex}`);
            modal.classList.add('active');
        }

        function closeModal(modalIndex) {
            const modal = document.getElementById(`modal${modalIndex}`);
            modal.classList.remove('active');
        }

        function closeModalByBackground(event, modalIndex) {
            if (event.target.id === `modal${modalIndex}`) {
                closeModal(modalIndex);
            }
        }

        // Fermer les modals avec ESC
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                document.querySelectorAll('.modal.active').forEach(modal => {
                    modal.classList.remove('active');
                });
            }
        });

        // Formulaire multi-étapes
        function showStep(step) {
            document.querySelectorAll('.form-step').forEach(el => el.classList.remove('active'));
            document.getElementById(`step-${step}`).classList.add('active');
            
            updateProgressBar();
            updateButtons();
            updateStepTitle();
        }

        function updateProgressBar() {
            const progress = (currentStep / totalSteps) * 100;
            document.getElementById('progressFill').style.width = progress + '%';
        }

        function updateButtons() {
            const btnPrev = document.getElementById('btnPrev');
            const btnNext = document.getElementById('btnNext');
            const btnSubmit = document.getElementById('btnSubmit');

            if (currentStep === 1) {
                btnPrev.style.display = 'none';
            } else {
                btnPrev.style.display = 'block';
            }

            if (currentStep === totalSteps) {
                btnNext.style.display = 'none';
                btnSubmit.style.display = 'block';
            } else {
                btnNext.style.display = 'block';
                btnSubmit.style.display = 'none';
            }
        }

        function updateStepTitle() {
            const titles = [
                'Identification du candidat',
                'Informations de contact',
                'Représentant légal',
                'Approvisionnement en matière premières',
                'Site d\'exploitation',
                'Présentation du projet',
                'Capacité financière',
                'Capacité technique',
                'Impacts et finalisation'
            ];
            document.getElementById('stepTitle').textContent = titles[currentStep - 1];
        }

        function nextStep() {
            if (validateStep(currentStep)) {
                if (currentStep < totalSteps) {
                    currentStep++;
                    showStep(currentStep);
                    //window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }
        }

        function previousStep() {
            if (currentStep > 1) {
                currentStep--;
                showStep(currentStep);
       //         window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }

        function validateStep(step) {
            const form = document.getElementById('multiStepForm');
            const inputs = document.getElementById(`step-${step}`).querySelectorAll('input[required], select[required], textarea[required]');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value) {
                    isValid = false;
                    input.style.borderColor = '#FF6B6B';
                } else {
                    input.style.borderColor = '';
                }
            });

            return isValid;
        }

        // Soumission du formulaire
        document.getElementById('multiStepForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateStep(currentStep)) {
                const formData = new FormData(this);
                const data = Object.fromEntries(formData);
                
                // EmailJS Integration (vous devez configurer EmailJS)
                // Pour démo, on affiche juste un message
                alert('Formulaire soumis avec succès ! Vos données ont été envoyées.');
                console.log('Données du formulaire:', data);
                
                // Réinitialiser le formulaire
                this.reset();
                currentStep = 1;
                showStep(currentStep);
               window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });

        // Initialisation
        showStep(1);

        document.getElementById('forme_juridique').addEventListener('change', function() {
            const autreDiv = document.getElementById('forme_autre_input');
            const autreInput = document.getElementById('forme_autre_details');
            
            if (this.value === 'Autre') {
                autreDiv.style.display = 'block';
                autreInput.required = true;
            } else {
                autreDiv.style.display = 'none';
                autreInput.required = false;
                autreInput.value = ''; // Vider le champ
            }
        });