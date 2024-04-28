        var questions; // Esta variable almacenará las preguntas cargadas desde el JSON

        function checkAnswer(questionNumber, correctAnswer, selectedAnswer) {
            var resultElement = document.getElementById("result" + questionNumber);
            var marker = document.querySelector(".marker-container").children[questionNumber - 1];

            if (selectedAnswer === correctAnswer) {
                resultElement.innerHTML = "Respuesta correcta";
                resultElement.className = "correct";
                marker.innerHTML = questionNumber + "✅";
                marker.classList.add("correct");
            } else {
                resultElement.innerHTML = "Respuesta incorrecta";
                resultElement.className = "incorrect";
                marker.innerHTML = questionNumber + "❌";
                marker.classList.add("incorrect");

                setTimeout(function() {
                    resetQuestion(questionNumber);
                }, 60000);
            }
            resultElement.style.display = "block";
        }

        function resetQuestion(questionNumber) {
            var marker = document.querySelector(".marker-container").children[questionNumber - 1];
            var resultElement = document.getElementById("result" + questionNumber);

            marker.innerHTML = questionNumber;
            marker.classList.remove("correct", "incorrect");

            if (resultElement) {
                resultElement.style.display = "none";
            }

            var questionElement = document.getElementById("question" + questionNumber);
            var radioInputs = questionElement.querySelectorAll(".answer-input");
            radioInputs.forEach(function(input) {
                input.checked = false;
            });
        }

        function scrollToQuestion(questionNumber) {
            var questionElement = document.getElementById("question" + questionNumber);
            questionElement.scrollIntoView({ behavior: 'smooth' });
        }

        // Función para reordenar un array de forma aleatoria (algoritmo de Fisher-Yates)
        function shuffleArray(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        function loadQuiz() {
            // Aquí se cargarán las preguntas desde el JSON
            fetch('https://raw.githubusercontent.com/Josemlg993/MagicTest/Bibliotecadepreguntas/Cuestionario%20Analisis.json')
                .then(response => response.json())
                .then(data => {
                    questions = data; // Guardamos las preguntas en la variable
                    renderQuiz(); // Llamamos a la función para renderizar el cuestionario
                })
                .catch(error => console.error('Error al cargar el cuestionario:', error));
        }

        function renderQuiz() {
            var form = document.getElementById("quizForm");
            var markerContainer = document.querySelector(".marker-container");

            form.innerHTML = '';
            markerContainer.innerHTML = '';

            questions = shuffleArray(questions);

            questions.forEach(function (item, index) {
                var questionNumber = index + 1;
                var questionHTML = "<div id='question" + questionNumber + "' class='question'>";
                questionHTML += "<h2>Pregunta " + questionNumber + ":</h2>";
                questionHTML += "<p>" + item.question + "</p>";

                var shouldShuffleAnswers = !item.answers.some(answer => answer.match(/A y B son correctas.|A y C son correctas.|A y D son correctas.|B y C son correctas.|B y D son correctas.|C y D son correctas.|A y B son correctas|A y C son correctas|A y D son correctas|B y C son correctas|B y D son correctas|C y D son correctas|todas son correctas|Ninguno de los anteriores|Ninguna es correcta.|Ninguna es correcta|todas son incorrectas|todas las anteriores|ninguna de las anteriores/i));
                var answers = shouldShuffleAnswers ? shuffleArray(item.answers.slice()) : item.answers;

                answers.forEach(function (answer) {
                    questionHTML += '<input type="radio" class="answer-input" name="q' + questionNumber + '" value="' + answer + '" onclick="checkAnswer(' + questionNumber + ', \'' + item.correctAnswer + '\', \'' + answer + '\')"> ' + answer + '<br>';
                });
                questionHTML += "<p id='result" + questionNumber + "' style='display:none'></p>";
                questionHTML += "</div>";
                form.innerHTML += questionHTML;

                var marker = document.createElement("div");
                marker.classList.add("marker");
                marker.textContent = questionNumber;
                marker.addEventListener("click", function() {
                    scrollToQuestion(questionNumber);
                });
                markerContainer.appendChild(marker);
            });
        }

        window.onload = loadQuiz;
