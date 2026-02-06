// Selecionar todos os itens do menu
var menuItem = document.querySelectorAll('.item-menu');

// Função para selecionar o link ativo
function selectLink() {
    // Remove a classe 'active' de todos os itens
    menuItem.forEach((item) => {
        item.classList.remove('active');
    });
    
    // Adiciona a classe 'active' apenas ao item clicado
    this.classList.add('active');
}

// Adiciona evento de clique a cada item do menu
menuItem.forEach((item) => {
    item.addEventListener('click', selectLink);
});

// Menu Lateral Expandir/Retrair
const btnExpandir = document.querySelector('#btn-expandir');
const menuSidebar = document.querySelector('.menu-lateral');
const body = document.querySelector('body');

btnExpandir.addEventListener('click', () => {
    menuSidebar.classList.toggle('expandir');
    body.classList.toggle('expandir-body');
});

// Submenu Expandir/Retrair

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('configuracoes-toggle');
  const submenu = document.getElementById('configuracoes-submenu');

  if (toggle && submenu) {
    toggle.addEventListener('click', () => {
      submenu.classList.toggle('open');
    });
  }
});


// 

// Sistema de Autenticação - Login e Cadastro
document.addEventListener('DOMContentLoaded', function() {
    // Elementos principais
    const loginTab = document.getElementById('login-tab');
    const cadastroTab = document.getElementById('cadastro-tab');
    const loginForm = document.getElementById('login-form');
    const cadastroForm = document.getElementById('cadastro-form');
    const authTitle = document.getElementById('auth-title');
    const authMessage = document.getElementById('auth-message');
    const modalRedefinir = document.getElementById('modal-redefinir');
    
    // Toggle entre Login e Cadastro
    window.showLoginForm = function() {
        loginTab.classList.add('active');
        cadastroTab.classList.remove('active');
        loginForm.classList.add('active');
        cadastroForm.classList.remove('active');
        updateAuthTitle('login');
        clearAuthMessage();
    };
    
    window.showCadastroForm = function() {
        cadastroTab.classList.add('active');
        loginTab.classList.remove('active');
        cadastroForm.classList.add('active');
        loginForm.classList.remove('active');
        updateAuthTitle('cadastro');
        clearAuthMessage();
    };
    
    function updateAuthTitle(mode) {
        if (mode === 'login') {
            authTitle.innerHTML = `
                <h1><i class="fa-solid fa-right-to-bracket"></i> Faça seu Login</h1>
                <p class="subtitle">Entre com suas credenciais para acessar o sistema Eco.control</p>
            `;
        } else {
            authTitle.innerHTML = `
                <h1><i class="fa-solid fa-user-plus"></i> Criar Nova Conta</h1>
                <p class="subtitle">Preencha os dados abaixo para criar uma nova conta no sistema Eco.control</p>
            `;
        }
    }
    
    // Funções para mensagens
    function showAuthMessage(type, text) {
        authMessage.className = `auth-message ${type}`;
        authMessage.innerHTML = `
            <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : type === 'error' ? 'fa-circle-exclamation' : 'fa-circle-info'}"></i>
            ${text}
        `;
        authMessage.style.display = 'block';
        
        // Auto-esconder após 5 segundos
        if (type !== 'error') {
            setTimeout(() => {
                authMessage.style.display = 'none';
            }, 5000);
        }
    }
    
    function clearAuthMessage() {
        authMessage.style.display = 'none';
        authMessage.className = 'auth-message';
    }
    
    // Configurar toggle de senhas
    function setupPasswordToggles() {
        const toggles = document.querySelectorAll('.toggle-password');
        toggles.forEach(toggle => {
            toggle.addEventListener('click', function() {
                const input = this.parentElement.querySelector('input');
                const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                input.setAttribute('type', type);
                this.innerHTML = type === 'password' 
                    ? '<i class="fa-solid fa-eye"></i>' 
                    : '<i class="fa-solid fa-eye-slash"></i>';
            });
        });
    }
    
    // VALIDAÇÃO DE LOGIN
    const loginFormEl = document.getElementById('login-form');
    if (loginFormEl) {
        loginFormEl.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value.trim();
            const senha = document.getElementById('login-senha').value.trim();
            let isValid = true;
            
            // Reset errors
            clearLoginErrors();
            
            // Validação de email
            if (!email) {
                showLoginError('login-email-error', 'E-mail é obrigatório');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showLoginError('login-email-error', 'Digite um e-mail válido');
                isValid = false;
            }
            
            // Validação de senha
            if (!senha) {
                showLoginError('login-senha-error', 'Senha é obrigatória');
                isValid = false;
            } else if (senha.length < 6) {
                showLoginError('login-senha-error', 'Senha deve ter no mínimo 6 caracteres');
                isValid = false;
            }
            
            if (isValid) {
                // Simular login (substituir por API real)
                showAuthMessage('info', 'Autenticando...');
                
                setTimeout(() => {
                    // Verificação de credenciais mock
                    if (email === 'admin@ecocontrol.com' && senha === 'admin123') {
                        showAuthMessage('success', 'Login realizado com sucesso! Redirecionando...');
                        
                        // Simular redirecionamento
                        setTimeout(() => {
                            window.location.href = '../html/index.html';
                        }, 1500);
                    } else {
                        showAuthMessage('error', 'E-mail ou senha incorretos');
                    }
                }, 1000);
            }
        });
    }
    
    function showLoginError(elementId, message) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = message;
        }
    }
    
    function clearLoginErrors() {
        const errors = document.querySelectorAll('#login-form .error-message');
        errors.forEach(error => error.textContent = '');
    }
    
    // VALIDAÇÃO DE CADASTRO (reutilizando código anterior)
    const cadastroFormEl = document.getElementById('cadastro-form');
    if (cadastroFormEl) {
        // Configurar máscaras
        const telefoneInput = document.getElementById('telefone');
        const cpfInput = document.getElementById('cpf');
        const senhaInput = document.getElementById('senha');
        const confirmarSenhaInput = document.getElementById('confirmar-senha');
        
        // Máscara para telefone
        if (telefoneInput) {
            telefoneInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 10) {
                    value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
                } else if (value.length > 6) {
                    value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
                } else if (value.length > 2) {
                    value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
                }
                e.target.value = value;
            });
        }
        
        // Máscara para CPF
        if (cpfInput) {
            cpfInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 9) {
                    value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, '$1.$2.$3-$4');
                } else if (value.length > 6) {
                    value = value.replace(/^(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
                } else if (value.length > 3) {
                    value = value.replace(/^(\d{3})(\d{0,3})/, '$1.$2');
                }
                e.target.value = value;
            });
        }
        
        // Força da senha
        if (senhaInput) {
            senhaInput.addEventListener('input', function() {
                updatePasswordStrength(this.value);
            });
        }
        
        // Confirmar senha
        if (confirmarSenhaInput) {
            confirmarSenhaInput.addEventListener('input', function() {
                const senhaError = document.getElementById('senha-error');
                if (this.value !== senhaInput.value) {
                    senhaError.textContent = 'As senhas não coincidem';
                    this.style.borderColor = '#ff4444';
                } else {
                    senhaError.textContent = '';
                    this.style.borderColor = '#56d57c';
                }
            });
        }
        
        // Submit do cadastro
        cadastroFormEl.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateCadastroForm()) {
                showAuthMessage('info', 'Processando cadastro...');
                
                // Simular envio para API
                setTimeout(() => {
                    const formData = {
                        nome: document.getElementById('nome').value,
                        email: document.getElementById('email').value,
                        telefone: document.getElementById('telefone').value,
                        cpf: document.getElementById('cpf').value,
                        tipo: document.getElementById('tipo').value,
                        setor: document.getElementById('setor').value
                    };
                    
                    console.log('Cadastro enviado:', formData);
                    
                    showAuthMessage('success', 'Cadastro realizado com sucesso! Você receberá um e-mail de confirmação.');
                    resetCadastroForm();
                    
                    // Voltar para login após 3 segundos
                    setTimeout(() => {
                        showLoginForm();
                    }, 3000);
                }, 1500);
            }
        });
    }
    
    function validateCadastroForm() {
        const requiredFields = cadastroForm.querySelectorAll('[required]');
        let isValid = true;
        
        // Validar campos obrigatórios
        requiredFields.forEach(field => {
            const errorElement = document.getElementById(field.id + '-error');
            if (!field.value.trim()) {
                if (errorElement) {
                    errorElement.textContent = 'Este campo é obrigatório';
                }
                field.style.borderColor = '#ff4444';
                isValid = false;
            } else {
                if (errorElement) {
                    errorElement.textContent = '';
                }
                field.style.borderColor = '#56d57c';
            }
        });
        
        // Validar email
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('email-error');
        if (emailInput && emailInput.value) {
            if (!isValidEmail(emailInput.value)) {
                emailError.textContent = 'Digite um e-mail válido';
                emailInput.style.borderColor = '#ff4444';
                isValid = false;
            }
        }
        
        // Validar senhas
        const senhaInput = document.getElementById('senha');
        const confirmarSenhaInput = document.getElementById('confirmar-senha');
        const senhaError = document.getElementById('senha-error');
        
        if (senhaInput.value.length < 6) {
            senhaError.textContent = 'Senha deve ter no mínimo 6 caracteres';
            senhaInput.style.borderColor = '#ff4444';
            isValid = false;
        }
        
        if (senhaInput.value !== confirmarSenhaInput.value) {
            senhaError.textContent = 'As senhas não coincidem';
            confirmarSenhaInput.style.borderColor = '#ff4444';
            isValid = false;
        }
        
        // Validar termos
        const termosCheckbox = document.getElementById('termos');
        if (!termosCheckbox.checked) {
            showAuthMessage('error', 'Você deve aceitar os termos de uso');
            isValid = false;
        }
        
        return isValid;
    }
    
    window.resetCadastroForm = function() {
        const form = document.getElementById('cadastro-form');
        if (form) form.reset();
        
        // Resetar estilos
        const inputs = cadastroForm.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.style.borderColor = '';
        });
        
        // Resetar mensagens de erro
        const errors = cadastroForm.querySelectorAll('.error-message');
        errors.forEach(error => {
            error.textContent = '';
        });
        
        // Resetar força da senha
        updatePasswordStrength('');
    };
    
    // Função auxiliar para validar email
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Força da senha
    function updatePasswordStrength(password) {
        const strengthBar = document.querySelector('.strength-bar');
        const strengthValue = document.getElementById('strength-value');
        
        if (!strengthBar || !strengthValue) return;
        
        let strength = 0;
        
        // Verificar comprimento
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        
        // Verificar complexidade
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        
        // Atualizar visual
        const width = Math.min(strength * 20, 100);
        let color = '#ff4444';
        let text = 'Fraca';
        
        if (strength >= 4) {
            color = '#ffa726';
            text = 'Média';
        }
        if (strength >= 5) {
            color = '#66bb6a';
            text = 'Forte';
        }
        if (strength >= 6) {
            color = '#2e7d32';
            text = 'Muito Forte';
        }
        
        // Atualizar barra via CSS custom property
        strengthBar.style.setProperty('--strength-width', width + '%');
        strengthBar.style.setProperty('--strength-color', color);
        strengthValue.textContent = text;
        strengthValue.style.color = color;
    }
    
    // Modal de redefinição de senha
    const esqueciSenhaLink = document.querySelector('.esqueci-senha');
    if (esqueciSenhaLink) {
        esqueciSenhaLink.addEventListener('click', function(e) {
            e.preventDefault();
            modalRedefinir.classList.add('active');
        });
    }
    
    window.closeModal = function() {
        modalRedefinir.classList.remove('active');
    };
    
    // Fechar modal ao clicar fora
    modalRedefinir.addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
    
    // Formulário de redefinição
    const formRedefinir = document.getElementById('form-redefinir');
    if (formRedefinir) {
        formRedefinir.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('redefinir-email').value;
            
            if (email && isValidEmail(email)) {
                showAuthMessage('success', `Link de redefinição enviado para: ${email}`);
                closeModal();
                formRedefinir.reset();
            } else {
                showAuthMessage('error', 'Digite um e-mail válido');
            }
        });
    }
    
    // Botões de login social
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const provider = this.classList.contains('google') ? 'Google' : 'Microsoft';
            showAuthMessage('info', `Redirecionando para login com ${provider}...`);
            
            // Simular redirecionamento
            setTimeout(() => {
                showAuthMessage('error', 'Integração com ' + provider + ' em desenvolvimento');
            }, 1500);
        });
    });
    
    // Inicializar
    setupPasswordToggles();
    updatePasswordStrength(''); // Inicializar barra de força
    
    // Verificar se há parâmetro na URL para mostrar cadastro
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('mode') === 'cadastro') {
        showCadastroForm();
    }
});