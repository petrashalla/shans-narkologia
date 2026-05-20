document.addEventListener('DOMContentLoaded', () => {

    function clearInput(button) {
        const input = button.parentNode.querySelector('input');
        input.value = '';
        toggleClearButton(button);
    }

    function toggleClearButton(button) {
        const input = button.parentNode.querySelector('input');
        const clearButton = button;
        if (input.value.length > 0) {
            clearButton.style.display = 'block';
        } else {
            clearButton.style.display = 'none';
        }
    }

    const clearInputButtons = document.querySelectorAll('.input-clear');
    clearInputButtons.forEach(button => {
        const input = button.parentNode.querySelector('input');
        input.addEventListener('input', () => toggleClearButton(button));
        toggleClearButton(button);
        button.addEventListener('click', () => clearInput(button));
    });


    ;[].forEach.call(
        document.querySelectorAll('input[type=tel]'),
        function (input) {
            let keyCode
            function mask(event) {
                event.keyCode && (keyCode = event.keyCode)
                let pos = this.selectionStart
                if (pos < 3) event.preventDefault()
                let matrix = '+7 (___) ___-__-__',
                    i = 0,
                    def = matrix.replace(/\D/g, ''),
                    val = this.value.replace(/\D/g, ''),
                    new_value = matrix.replace(/[_\d]/g, function (a) {
                        return i < val.length ? val.charAt(i++) || def.charAt(i) : a
                    })
                i = new_value.indexOf('_')
                if (i != -1) {
                    i < 5 && (i = 3)
                    new_value = new_value.slice(0, i)
                }
                let reg = matrix
                    .substr(0, this.value.length)
                    .replace(/_+/g, function (a) {
                        return '\\d{1,' + a.length + '}'
                    })
                    .replace(/[+()]/g, '\\$&')
                reg = new RegExp('^' + reg + '$')
                if (
                    !reg.test(this.value) ||
                    this.value.length < 5 ||
                    (keyCode > 47 && keyCode < 58)
                )
                    this.value = new_value
                if (event.type == 'blur' && this.value.length < 5) this.value = ''
            }

            input.addEventListener('input', mask, false)
            input.addEventListener('focus', mask, false)
            input.addEventListener('blur', mask, false)
            input.addEventListener('keydown', mask, false)
        }
    )

    function GetYMCID() {
        var match = document.cookie.match('(?:^|;)\\s*_ym_uid=([^;]*)');
        return (match) ? decodeURIComponent(match[1]) : false;
    }

    const formButtons = document.querySelectorAll('button[type="submit"]');

    formButtons.forEach(button => {

        const formObj = button.parentNode;
        const divWrap = document.createElement('div');
        divWrap.innerHTML =
            `<input name="trafficSource" type="hidden" value="">
            <input name="istochnik" type="hidden" value="">
            <input name="clientID" type="hidden" value="${GetYMCID()}">`;
        formObj.appendChild(divWrap);

        if (typeof sbjs !== 'undefined') {
            sbjs.init(divWrap);
            formObj.querySelector("input[name=trafficSource]").value = sbjs.get.current.typ;
            formObj.querySelector("input[name=istochnik]").value = sbjs.get.current.src;
        }

        button.addEventListener('click', async function (event) {
            event.preventDefault();
            console.log("testr");
            const form = this.closest('form');
            const modalOpen = form.dataset.modalOpen;
            const popups = {
                success: form.dataset.modalOk,
                error: form.dataset.modalErr
            };

            const fields = {};
            const inputs = form.querySelectorAll('input[type="tel"], textarea, input[type="text"]');
            inputs.forEach(input => {
                if (input.hasAttribute('required')) {
                    fields[input.name] = {
                        type: input.type,
                        value: input.value
                    };
                }
            })

            const resultWrappers = {
                success: document.querySelector(popups.success),
                error: document.querySelector(popups.error)
            };

            if (validateInputs(fields)) {
                await handleSubmission(this, form, resultWrappers, modalOpen);
            } else {
                markErrors(form);
            }

        });

        const urlInputs = document.querySelectorAll("input[name='urlMessage'], input[name='title_url_message']");
        urlInputs.forEach(input => {
            input.value = input.name === 'urlMessage' ? window.location.href : document.title;
        });
    });

    function validateInputs(fields) {
        let isValid = true;
        for (let fieldName in fields) {
            const field = fields[fieldName];
            switch (field.type) {
                case 'tel':
                    const phoneNumber = field.value.replace(/\D/g, '');
                    if (phoneNumber.length < 11) {
                        isValid = false;
                    }
                    break;
                case 'textarea':
                case 'text':
                    if (!/[а-яА-ЯёЁ]/.test(field.value) || field.value.trim().length <= 2) {
                        isValid = false;
                    }
                    break;
                default:
                    isValid = false;
                    break;
            }
            if (!isValid) {
                break;
            }
        }
        return isValid;
    }

    async function handleSubmission(button, form, resultWrappers, modalOpen) {
        const originalText = button.innerText;
        button.innerHTML = "Отправление";
        button.disabled = true;
        try {
            const response = await fetch(`/netcat_template/ajax/request.php`, {
                method: 'POST',
                body: new FormData(form)
            });
            const responseText = await response.text();
            const isSuccess = response.ok;
            openModal(isSuccess ? resultWrappers.success : resultWrappers.error, responseText, modalOpen);

        } catch (error) {
            openModal(resultWrappers.error, error.message, modalOpen);
        } finally {
            resetButton(button, originalText);
        }
    }

    function openModal(wrapper, content, modalOpen) {
        const modal = wrapper.closest('.popup');
        modal.classList.add(modalOpen);
        wrapper.innerHTML = content;
    }

    function resetButton(button, buttonText) {
        button.innerText = buttonText;
        button.disabled = false;
    }

    function validateInputs(fields) {
        let isValid = true;
        for (let fieldName in fields) {
            const field = fields[fieldName];
            switch (field.type) {
                case 'tel':
                    const phoneNumber = field.value.replace(/\D/g, '');
                    if (phoneNumber.length < 11) {
                        isValid = false;
                    }
                    break;
                case 'textarea':
                case 'text':
                    if (!/[а-яА-ЯёЁ]/.test(field.value) || field.value.trim().length <= 2) {
                        isValid = false;
                    }
                    break;
                default:
                    isValid = false;
                    break;
            }
            if (!isValid) {
                break;
            }
        }
        return isValid;
    }

    function markErrors(form) {

        const inputs = form.querySelectorAll('input[type="tel"], textarea, input[type="text"]');

        inputs.forEach(input => {
            removeErrorStyle(input);
            const errorMessage = getErrorMessage(input);

            if (errorMessage) {
                addErrorStyle(input, errorMessage,);
                setTimeout(() => {
                    removeErrorStyle(input);
                }, 3000);
            }

            input.addEventListener('input', function () {
                if (this.value) {
                    removeErrorStyle(this);
                }
            });
        });
    }

    function getErrorMessage(input) {

        let message = '';

        switch (input.type) {
            case 'tel':
                const phoneNumber = input.value.replace(/\D/g, '');
                if (phoneNumber.length < 11) {
                    message = 'Введите верный номер телефона';
                }
                break;
            case 'textarea':
            case 'text':
                if (!/[а-яА-ЯёЁ]/.test(input.value) || input.value.trim().length <= 2) {
                    message = 'Текст должен содержать русские буквы';
                }
                break;
            default:
                message = 'Поле не заполнено';
                break;
        }

        return message;
    }

    function addErrorStyle(input, message) {
        input.classList.add("error-wrapper");
        input.classList.add('error');
    }

    function removeErrorStyle(input) {
        input.classList.remove('error');
        input.classList.remove('error-wrapper');
    }

});

