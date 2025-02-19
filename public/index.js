const script = document.createElement('script');
script.src = 'https://unpkg.com/vue@3/dist/vue.global.prod.js';
script.onload = () => {
    const app = document.createElement('div');
    app.id = 'app';
    document.body.appendChild(app);
    const { createApp, h, ref, reactive, onMounted, watch } = Vue;
    createApp({
        setup() {
            const showCheckBox = ref(false)
            const checkboxModel = ref(false)
            const checkBox = ref(null)

            function handleButtonClick() {
                if (!showCheckBox.value) {
                    showCheckBox.value = true;
                } else {
                    checkBox.value.style.animation = 'shake 0.5s ease-in-out';
                    checkBox.value.style.borderColor = '#f53f3f';
                    checkBox.value.style.boxShadow = '0 4px 10px #ffece8'
                    checkBox.value.addEventListener('animationend', () => {
                        checkBox.value.style.animation = '';
                        checkBox.value.style.borderColor = '#e5e6eb';
                        checkBox.value.style.boxShadow = '0 4px 10px #0000001a'
                    });
                }
            }

            watch(() => checkboxModel.value, (newValue) => {
                if (newValue) {
                    imgDialog.value = true;
                }
            })

            const form = reactive({
                imgFile: null,
                imgUrl: null,
                cameraFile: null,
                cameraUrl: null,
            });

            const imgDialog = ref(false);
            const errorDialog = ref(false);
            const errorText = ref('');
            const cameraDialog = ref(false);
            const videoElement = ref(null);
            const loading = ref(false);

            function openImgFile() {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.click();

                input.onchange = function (event) {
                    const file = event.target.files[0];
                    if (file) {
                        const validTypes = ['image/jpeg', 'image/png', 'image/tiff'];
                        if (!validTypes.includes(file.type)) {
                            errorDialog.value = true;
                            errorText.value = 'The uploaded image format must be JPEG, PNG, or TIFF.';
                            return;
                        }

                        const maxSize = 5 * 1024 * 1024;
                        if (file.size > maxSize) {
                            errorDialog.value = true;
                            errorText.value = '上传的图片大小不能超过 5MB，请选择较小的图片。';
                            return;
                        }

                        form.imgFile = file;
                        form.imgUrl = URL.createObjectURL(file);
                    }
                };
            }

            function openCamera() {
                cameraDialog.value = true
                navigator.mediaDevices.getUserMedia({ video: true })
                    .then(function (stream) {
                        videoElement.value.srcObject = stream;
                    })
                    .catch(function (err) {
                        cameraDialog.value = false
                        errorDialog.value = true
                        errorText.value = 'Please allow access to the camera. Go to your browser settings to enable camera permissions.';
                    });
            }

            function capturePhoto() {
                loading.value = true;
                const canvas = document.createElement('canvas');
                canvas.width = videoElement.value.videoWidth;
                canvas.height = videoElement.value.videoHeight;
                const context = canvas.getContext('2d');
                context.drawImage(videoElement.value, 0, 0, canvas.width, canvas.height);

                canvas.toBlob(function (blob) {
                    const file = new File([blob], "captured-photo.png", { type: "image/png" });
                    form.cameraFile = file;
                    form.cameraUrl = URL.createObjectURL(file);
                    setTimeout(() => {
                        const code = 200;
                        if (code === 200) {
                            console.log(form);
                            
                            imgDialog.value = false;
                            showCheckBox.value = false;
                            stopCameraDialog();
                        } else {
                            errorDialog.value = true;
                            errorText.value = 'Failed to capture photo. Please try again.';
                            stopCameraDialog();
                        }

                    }, 3000);
                }, 'image/png');

            }

            function stopCameraDialog() {
                if (videoElement.value.srcObject) {
                    videoElement.value.srcObject.getTracks().forEach(track => track.stop());
                }
                loading.value = false;
                cameraDialog.value = false;
            }

            function closeCameraDialog(event) {
                if (event.target === event.currentTarget) {
                    stopCameraDialog()
                }
            }

            function formSubmit() {
                if (form.imgFile) {
                    openCamera()
                }

            }

            function closeImgDialog(event) {
                if (event.target === event.currentTarget) {
                    imgDialog.value = false;
                    checkboxModel.value = false;
                }
            }

            function closeErrorDialog(event) {
                if (event.target === event.currentTarget) {
                    errorDialog.value = false
                }
            }

            onMounted(() => {
                window.onload = function () {
                    const style = document.createElement('style');
                    style.innerHTML = `
                        @keyframes shake {
                            0% {
                                transform: translateX(0);
                            }
                            25% {
                                transform: translateX(-5px);
                            }
                            50% {
                                transform: translateX(5px);
                            }
                            75% {
                                transform: translateX(-5px);
                            }
                            100% {
                                transform: translateX(5px);
                            }
                        }

                        .qz-model {
                            position: fixed;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background-color: rgba(0, 0, 0, 0.8);
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            z-index: 9999;
                        }

                        .qz-model-content {
                            width: 380px;
                            max-width: 90%;
                            background-color: white;
                            padding: 15px;
                            border-radius: 8px;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                        }

                        .upload-content {
                            width: 100%;
                            display: flex;
                            flex-direction: column;
                        }

                        .upload-picture-card {
                            width: 100%;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            width: 100%;
                            height: 175px;
                            margin-bottom: 0;
                            color: #4e5969;
                            text-align: center;
                            background: #f2f3f5;
                            border: 1px dashed #e5e6eb;
                            border-radius: 8px;
                            transition: all .1s cubic-bezier(0, 0, 1, 1);
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            cursor: pointer;
                        }

                        .upload-icon {
                            display: inline-block;
                            width: 1.5em;
                            height: 1.5em;
                            color: inherit;
                            font-style: normal;
                            vertical-align: -2px;
                            outline: none;
                        }

                        .submit_button {
                            width: 100%;
                            height: 40px;
                            background-color: #165dff;
                            color: white;
                            border: none;
                            border-radius: 5px;
                            cursor: pointer;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            font-size: 16px;
                            margin-top: 20px;
                        }

                        .error_icon {
                            background: #ffece8;
                            border-radius: 100%;
                            width: 45px;
                            height: 45px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }

                        .preview_img {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                            border-radius: 8px;
                        }

                        .check_box {
                            width: 400px;
                            max-width: 90%;
                            border: 1px solid #e5e6eb;
                            position: fixed;
                            padding: 15px;
                            right: 10px;
                            bottom: 10px;
                            cursor: pointer;
                            box-shadow: 0 4px 10px #0000001a;
                            border-radius:4px;
                        }
                        .btn-disabled {
                            background-color: #94bfff;
                            color: #fff;
                            cursor: not-allowed;
                        }
                    `;
                    document.head.appendChild(style);

                    const elements = [
                        document.getElementById("CartDrawer-Checkout"),
                        document.getElementById("checkout"),
                        document.getElementById("cart-notification-button")
                    ];

                    elements.forEach(element => {
                        if (element) {
                            element.addEventListener("click", function (e) {
                                e.preventDefault();
                                if (!checkboxModel.value)
                                    handleButtonClick();
                            });
                        }
                    });
                };
            });

            return {
                showCheckBox,
                checkBox,
                checkboxModel,
                imgDialog,
                openImgFile,
                closeImgDialog,
                cameraDialog,
                videoElement,
                openCamera,
                closeCameraDialog,
                capturePhoto,
                errorDialog,
                errorText,
                closeErrorDialog,
                form,
                formSubmit,
                loading
            };
        },
        render() {
            return h('div', [
                this.showCheckBox && h('div', {
                    ref: 'checkBox',
                    class: 'check_box'
                }, [
                    h('input', {
                        type: 'checkbox',
                        id: 'verify_card',
                        checked: this.checkboxModel,
                        onInput: (event) => {
                            this.checkboxModel = event.target.checked;
                        }
                    }),

                    h('label', { for: 'verify_card', style: { marginLeft: '5px' } }, 'You need to verify your age before proceeding to checkout. Are you over 18 years of age?')
                ]),

                this.imgDialog && h('div', {
                    class: 'qz-model',
                    onClick: this.closeImgDialog
                }, [
                    h('div', { class: 'qz-model-content' }, [
                        h('div', { class: 'upload-content' }, [
                            h('div', {
                                class: 'upload-picture-card',
                                onClick: this.openImgFile
                            }, [
                                !this.form.imgUrl ?
                                    h('div', {
                                        style: {
                                            display: 'flex', flexDirection: 'column', alignItems: 'center',
                                            justifyContent: 'center'
                                        }
                                    }, [
                                        h('svg', {
                                            viewBox: '0 0 48 48',
                                            fill: 'none',
                                            xmlns: 'http://www.w3.org/2000/svg',
                                            stroke: 'currentColor',
                                            class: 'upload-icon',
                                            strokeWidth: '4',
                                            strokeLinecap: 'butt',
                                            strokeLinejoin: 'miter'
                                        }, [
                                            h('path', { d: 'M5 24h38M24 5v38' })
                                        ]), h('span', { style: { fontSize: '12px', marginTop: '5px', textAlign: 'center', } }, 'Upload pictures')
                                    ])
                                    : h('img', { class: 'preview_img', src: this.form.imgUrl })
                            ]),
                        ]),
                        h('div', {
                            class: {
                                'submit_button': true,
                                'btn-disabled': !this.form.imgUrl 
                            },
                            onClick: this.formSubmit
                        }, [
                            h('span', 'Start facial authentication')
                        ])
                    ])
                ]),

                this.cameraDialog && h('div', {
                    class: 'qz-model',
                    onClick: this.closeCameraDialog
                }, [
                    h('div', { 
                        class: 'qz-model-content' }, [
                        h('video', {
                            ref: 'videoElement',
                            autoplay: true,
                            style: { width: '150px', height: '150px', objectFit: 'cover', margin: '0 auto', backgroundColor: 'black', borderRadius: '100%', border: '1px dashed #e5e6eb' },
                            class: ''
                        }),
                        h('div', {
                            class: 'submit_button',
                            onClick: this.capturePhoto
                        }, [
                            !this.loading ? h('span', 'Start video check') : h('span', 'loading....')
                        ])
                    ])
                ]),

                this.errorDialog && h('div', {
                    class: 'qz-model',
                    onClick: this.closeErrorDialog
                }, [
                    h('div', { class: 'qz-model-content' }, [
                        h('div', { class: 'error_icon' }, [
                            h('svg', {
                                viewBox: '0 0 48 48',
                                fill: 'none',
                                xmlns: 'http://www.w3.org/2000/svg',
                                stroke: '#f53f3f',
                                class: 'upload-icon arco-icon-close',
                                strokeWidth: '4',
                                strokeLinecap: 'butt',
                                strokeLinejoin: 'miter'
                            }, [
                                h('path', {
                                    d: 'M9.857 9.858 24 24m0 0 14.142 14.142M24 24 38.142 9.858M24 24 9.857 38.142'
                                })
                            ])
                        ]),
                        h('span', {
                            style: { fontSize: '14px', marginTop: '5px', textAlign: 'center' }
                        }, this.errorText),
                        h('div', {
                            class: 'submit_button',
                            onClick: this.closeErrorDialog
                        }, 'OK')
                    ])
                ])
            ])
        }

    }).mount('#app');
};

document.head.appendChild(script);
