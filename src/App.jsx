// ============================================
// ARCHIVO: src/App.jsx - DEMO COMPLETO
// ============================================
import React, { useState } from 'react';
import {
  OrganicBox,
  OrganicButton,
  OrganicInput,
  OrganicCard,
  OrganicSelect,
  OrganicCheckbox,
  OrganicRadio,
  OrganicRadioGroup,
  OrganicToggle,
  OrganicModal,
  useModal,
  OrganicBadge,
  OrganicBadgeCount,
  OrganicTooltip,
  OrganicAlert,
  OrganicToastProvider,
  useOrganicToast,
  OrganicNavbar,
  OrganicTabs,
  OrganicFileUpload,
  OrganicSlider,
  OrganicPagination,
  OrganicDrawer,
  OrganicPopover,
  OrganicTable,
  OrganicStepper,
  OrganicDivider,
  ThemeProvider,
  useTheme
} from './components/organic-ui';
import {
  TfiPalette,
  TfiBarChart,
  TfiSettings,
  TfiCheckBox,
  TfiWrite,
  TfiCommentAlt,
  TfiBell,
  TfiBoltAlt,
  TfiLayoutMenuSeparated,
  TfiLayoutGrid2,
  TfiPulse
} from 'react-icons/tfi';

function App() {
  return (
    <ThemeProvider>
      <OrganicToastProvider>
        <AppDemo />
      </OrganicToastProvider>
    </ThemeProvider>
  );
}

function AppDemo() {
  const { addToast } = useOrganicToast();
  const { theme, toggleTheme, tokens } = useTheme();
  const isDarkTheme = theme === 'dark';

  // Estados para el formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [country, setCountry] = useState('');
  const [terms, setTerms] = useState(false);
  const [newsletter, setNewsletter] = useState(true);
  const [notifications, setNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // Estado para el tercer toggle
  const [gender, setGender] = useState('');
  const [formTheme, setFormTheme] = useState('light');
  const [notificationCount, setNotificationCount] = useState(5);
  
  // Estados para las tareas
  const [task1, setTask1] = useState(true);
  const [task2, setTask2] = useState(true);
  const [task3, setTask3] = useState(false);
  const [task4, setTask4] = useState(false);
  const [filesList, setFilesList] = useState([]);
  const [volume, setVolume] = useState(40);
  const [brightness, setBrightness] = useState(65);
  const [warmth, setWarmth] = useState(25);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(2);
  const [activeStep, setActiveStep] = useState(1);

  // Modal
  const modal = useModal();
  const confirmModal = useModal();

  // Opciones para select
  const countries = [
    { value: 'mx', label: 'México' },
    { value: 'us', label: 'Estados Unidos' },
    { value: 'ca', label: 'Canadá' },
    { value: 'es', label: 'España' },
    { value: 'ar', label: 'Argentina' }
  ];

  // Opciones para radio
  const genderOptions = [
    { value: 'male', label: 'Masculino' },
    { value: 'female', label: 'Femenino' },
    { value: 'other', label: 'Otro' },
    { value: 'prefer-not', label: 'Prefiero no decir' }
  ];

  const themeOptions = [
    { value: 'light', label: 'Claro' },
    { value: 'dark', label: 'Oscuro' },
    { value: 'auto', label: 'Automático' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      email,
      password,
      message,
      country,
      terms,
      newsletter,
      notifications,
      gender,
      theme
    });
    confirmModal.open();
  };

  const toastVariants = [
    { variant: 'info', label: 'Info' },
    { variant: 'success', label: 'Éxito' },
    { variant: 'warning', label: 'Alerta' },
    { variant: 'danger', label: 'Error' }
  ];

  const tabs = [
    {
      value: 'overview',
      label: 'Resumen',
      content: (
        <p className="text-sm text-[#1e1e1e]/80">
          Un vistazo general del proyecto, métricas clave y actividades recientes.
        </p>
      )
    },
    {
      value: 'activity',
      label: 'Actividad',
      content: (
        <ul className="space-y-2 text-sm text-[#1e1e1e]/80">
          <li>• 09:34 - Se publicó la nueva versión de la librería.</li>
          <li>• 08:12 - Se aprobaron tres pull requests.</li>
          <li>• 07:58 - John Doe comentó en la tarea #120.</li>
        </ul>
      )
    },
    {
      value: 'team',
      label: 'Equipo',
      content: (
        <p className="text-sm text-[#1e1e1e]/80">
          Equipo distribuido entre CDMX, Buenos Aires y Madrid. 12 personas activas.
        </p>
      )
    }
  ];

  return (
    <div
      className="min-h-screen transition-colors duration-500"
      style={{ background: tokens.palette.background, color: tokens.palette.text }}
    >
      <div
        className="max-w-7xl mx-auto space-y-8"
        style={{ padding: tokens.spacing.section }}
      >
        <OrganicNavbar
          brand={
            <div className="flex items-center gap-2">
              <TfiBoltAlt className="h-5 w-5" />
              <span>Brushstyle UI</span>
            </div>
          }
          links={[
            { label: 'Componentes', href: '#components' },
            { label: 'Tokens', href: '#tokens' },
            { label: 'Docs', href: '#docs' }
          ]}
          actions={{
            primary: {
              label: 'Descargar',
              onClick: () => addToast({
                variant: 'success',
                title: 'Descarga iniciada',
                description: 'Exportando paquete Brushstyle...'
              })
            },
            secondary: {
              label: theme === 'light' ? 'Modo oscuro' : 'Modo claro',
              onClick: toggleTheme
            }
          }}
        />
        
        {/* Header con Badge y Tooltip */}
        <OrganicBox
          className="p-8 text-center text-[#1e1e1e]"
          backgroundColor="#ffffff"
          strokeColor="#111827"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-5xl font-black">UI Brushstyle</h1>
            <OrganicBadge variant="primary" size="small">v1.0</OrganicBadge>
            <div className="relative">
              <OrganicTooltip content={`Tienes ${notificationCount} notificaciones`} position="bottom">
                <div className="relative inline-block">
                  <svg className="w-8 h-8 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <div className="absolute -top-2 -right-2">
                    <OrganicBadgeCount count={notificationCount} />
                  </div>
                </div>
              </OrganicTooltip>
            </div>
          </div>
          <p className="text-gray-600 text-lg">Componentes React con estilo orgánico tipo "brushstroke"</p>
          <div className="flex gap-3 justify-center mt-4 flex-wrap">
            <OrganicBadge variant="success">Listo para producción</OrganicBadge>
            <OrganicBadge variant="info">Tree-shakeable</OrganicBadge>
            <OrganicBadge variant="warning">Optimizado</OrganicBadge>
          </div>
        </OrganicBox>

        {/* Alerts */}
        <OrganicCard
          title={
            <span className="inline-flex items-center gap-2">
              <TfiBell className="h-5 w-5" /> Alertas
            </span>
          }
          className="p-6"
        >
          <div className="space-y-4">
            <OrganicAlert
              variant="info"
              title="Actualización disponible"
              description="Hay una nueva versión de Brushstyle UI lista para instalar."
              onClose={() => addToast({ variant: 'info', title: 'Recordatorio', description: 'Puedes actualizar cuando quieras.' })}
            />
            <OrganicAlert
              variant="success"
              title="Guardado correcto"
              description="Tus cambios se sincronizaron con el servidor."
              compact
              onClose={() => addToast({
                variant: 'success',
                title: 'Alerta cerrada',
                description: 'La alerta de guardado se ocultó.'
              })}
            />
            <OrganicAlert
              variant="danger"
              title="Error al conectar"
              description="No se pudo establecer conexión con el API. Revisaremos los logs."
              onClose={() => addToast({
                variant: 'danger',
                title: 'Alerta cerrada',
                description: 'Revisaremos los detalles más tarde.'
              })}
            />
          </div>
        </OrganicCard>

        {/* Toasts */}
        <OrganicCard
          title={
            <span className="inline-flex items-center gap-2">
              <TfiCommentAlt className="h-5 w-5" /> Toasts
            </span>
          }
        >
          <p className="text-sm text-[#1e1e1e]/80 mb-4">
            Dispara mensajes flotantes que siguen la misma estética orgánica con `useOrganicToast`.
          </p>
          <div className="flex flex-wrap gap-3">
            {toastVariants.map(({ variant, label }) => (
              <OrganicButton
                key={variant}
                variant={variant === 'info' ? 'info' : variant}
                size="small"
                fullWidth={false}
                className="px-8"
                onClick={() =>
                  addToast({
                    variant,
                    title: `${label} toast`,
                    description: `Este es un mensaje ${label.toLowerCase()} generado con Brushstyle.`
                  })
                }
              >
                {label}
              </OrganicButton>
            ))}
          </div>
        </OrganicCard>

        {/* Showcase de Botones */}
        <OrganicCard
          title={
            <span className="inline-flex items-center gap-2">
              <TfiPalette className="h-5 w-5" /> Variantes de Botones
            </span>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <OrganicButton variant="default" strokeWidth={4}>Default</OrganicButton>
            <OrganicButton variant="primary">Primary</OrganicButton>
            <OrganicButton variant="success">Success</OrganicButton>
            <OrganicButton variant="danger">Danger</OrganicButton>
            <OrganicButton variant="warning">Warning</OrganicButton>
            <OrganicButton variant="gray">Gray</OrganicButton>
            <OrganicButton variant="info">Info</OrganicButton>
            <OrganicButton variant="primary" disabled>Disabled</OrganicButton>
            <OrganicButton variant="primary" onClick={modal.open}>Abrir Modal</OrganicButton>
          </div>

          <h4 className="text-lg font-bold mt-6 mb-3">Tamaños</h4>
          <div className="space-y-3">
            <OrganicButton variant="primary" size="small">Small Button</OrganicButton>
            <OrganicButton variant="primary" size="medium">Medium Button</OrganicButton>
            <OrganicButton variant="primary" size="large">Large Button</OrganicButton>
          </div>
        </OrganicCard>

        {/* Badges */}
        <OrganicCard
          title={
            <span className="inline-flex items-center gap-2">
              <TfiBoltAlt className="h-5 w-5" /> Badges
            </span>
          }
          className="p-6 space-y-6"
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="flex flex-col gap-4">
              <p className="text-sm text-[#1e1e1e]/70">Variantes sólidas</p>
              <div className="flex flex-wrap gap-3">
                <OrganicBadge variant="default">Default</OrganicBadge>
                <OrganicBadge variant="primary">Nuevo</OrganicBadge>
                <OrganicBadge variant="success">Activo</OrganicBadge>
                <OrganicBadge variant="warning">Beta</OrganicBadge>
                <OrganicBadge variant="danger">Error</OrganicBadge>
                <OrganicBadge variant="info">Info</OrganicBadge>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-sm text-[#1e1e1e]/70">Contadores superpuestos</p>
              <div className="flex flex-wrap items-center gap-4">
                <div className="relative inline-flex items-center">
                  <OrganicButton variant="default" size="small" fullWidth={false}>
                    Notificaciones
                  </OrganicButton>
                  <OrganicBadgeCount count={notificationCount} className="-right-3 -top-3" />
                </div>
                <div className="relative inline-flex items-center">
                  <OrganicButton variant="primary" size="small" fullWidth={false}>
                    Tareas
                  </OrganicButton>
                  <OrganicBadgeCount count={23} className="-right-3 -top-3" />
                </div>
                <div className="relative inline-flex items-center">
                  <OrganicButton variant="success" size="small" fullWidth={false}>
                    Mensajes
                  </OrganicButton>
                  <OrganicBadgeCount count={3} className="-right-3 -top-3" />
                </div>
              </div>
            </div>
          </div>
        </OrganicCard>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="components">
          <OrganicCard
            title={
              <span className="inline-flex items-center gap-2">
                <TfiBarChart className="h-5 w-5" /> Estadísticas
              </span>
            }
          >
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Usuarios</span>
                <OrganicBadge variant="primary">1,234</OrganicBadge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Ventas</span>
                <OrganicBadge variant="success">$45.2K</OrganicBadge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Pendientes</span>
                <OrganicBadge variant="warning">23</OrganicBadge>
              </div>
            </div>
          </OrganicCard>
          
          <OrganicCard
            title={
              <span className="inline-flex items-center gap-2">
                <TfiSettings className="h-5 w-5" /> Configuración
              </span>
            }
          >
            <div className="space-y-6">
              <OrganicToggle
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                label="Notificaciones"
              />
              <OrganicToggle
                checked={newsletter}
                onChange={(e) => setNewsletter(e.target.checked)}
                label="Newsletter"
                size="small"
              />
              <OrganicToggle
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
                label="Modo oscuro"
                size="large"
              />
            </div>
          </OrganicCard>
          
          <OrganicCard
            title={
              <span className="inline-flex items-center gap-2">
                <TfiCheckBox className="h-5 w-5" /> Tareas
              </span>
            }
          >
            <div className="space-y-3">
              <OrganicCheckbox
                checked={task1}
                onChange={(e) => setTask1(e.target.checked)}
                label="Diseñar componentes"
              />
              <OrganicCheckbox
                checked={task2}
                onChange={(e) => setTask2(e.target.checked)}
                label="Implementar lógica"
              />
              <OrganicCheckbox
                checked={task3}
                onChange={(e) => setTask3(e.target.checked)}
                label="Escribir tests"
              />
              <OrganicCheckbox
                checked={task4}
                onChange={(e) => setTask4(e.target.checked)}
                label="Documentación"
              />
            </div>
          </OrganicCard>
        </div>

        {/* Formulario Completo */}
        <OrganicBox
          className="p-8 text-[#1e1e1e]"
          backgroundColor="#ffffff"
          strokeColor="#111827"
        >
          <h2 className="text-3xl font-bold mb-6 inline-flex items-center gap-2">
            <TfiWrite className="h-6 w-6" /> Formulario de Registro
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Email */}
              <div>
                <label className="block mb-3 font-semibold text-gray-700">Email *</label>
                <OrganicInput
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block mb-3 font-semibold text-gray-700">Contraseña *</label>
                <OrganicInput
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* País */}
            <div>
              <label className="block mb-3 font-semibold text-gray-700">País</label>
              <OrganicSelect
                options={countries}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Selecciona tu país"
              />
            </div>

            {/* Mensaje */}
            <div>
              <label className="block mb-3 font-semibold text-gray-700">Mensaje</label>
              <OrganicInput
                multiline
                rows={4}
                placeholder="Cuéntanos sobre ti..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={500}
              />
              <p className="text-sm text-gray-500 mt-1">{message.length}/500 caracteres</p>
            </div>

            {/* Radio Group - Género */}
            <div>
              <label className="block mb-3 font-semibold text-gray-700">Género</label>
              <OrganicRadioGroup
                options={genderOptions}
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                name="gender"
                orientation="horizontal"
              />
            </div>

            {/* Radio Group - Tema */}
            <div>
              <label className="block mb-3 font-semibold text-gray-700">Tema preferido</label>
              <OrganicRadioGroup
                options={themeOptions}
                value={formTheme}
                onChange={(e) => setFormTheme(e.target.value)}
                name="theme"
                orientation="vertical"
              />
            </div>

            {/* Checkboxes */}
            <div className="space-y-3 pt-4 border-t border-gray-200">
              <OrganicCheckbox
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                label="Acepto los términos y condiciones *"
                required
              />
              <OrganicCheckbox
                checked={newsletter}
                onChange={(e) => setNewsletter(e.target.checked)}
                label="Quiero recibir el newsletter"
              />
            </div>

            {/* Botones */}
            <div className="flex gap-4 pt-4">
              <OrganicButton variant="primary" type="submit">
                Registrarse
              </OrganicButton>
              <OrganicButton variant="default" type="button" onClick={() => {
                setEmail('');
                setPassword('');
                setMessage('');
                setCountry('');
                setTerms(false);
                setGender('');
                setFormTheme('light');
              }}>
                Limpiar
              </OrganicButton>
            </div>
          </form>
        </OrganicBox>

        {/* File Upload Demo */}
        <section className="space-y-4">
          <h3 className={`font-black text-3xl ${isDarkTheme ? 'text-white' : 'text-[#1e1e1e]'}`}>
            Carga de archivos
          </h3>
          <OrganicFileUpload
            onFilesSelected={setFilesList}
            maxSize={5 * 1024 * 1024}
          />
          {filesList.length > 0 && (
            <p className={`text-sm ${isDarkTheme ? 'text-white/80' : 'text-[#1e1e1e]/70'}`}>
              {filesList.length} archivo(s) listos para subir.
            </p>
          )}
        </section>

        {/* Slider Demo */}
        <OrganicCard title="Control deslizante" className="p-6 space-y-6">
          <OrganicSlider
            label="Volumen"
            value={volume}
            min={0}
            max={100}
            onChange={setVolume}
            accentColor="#2563eb"
            baseColor="#e0e7ff"
          />
          <OrganicSlider
            label="Brillo"
            value={brightness}
            min={0}
            max={100}
            onChange={setBrightness}
            accentColor="#f97316"
            baseColor="#fef3c7"
          />
          <OrganicSlider
            label="Temperatura"
            value={warmth}
            min={0}
            max={100}
            onChange={setWarmth}
            accentColor="#10b981"
            baseColor="#dcfce7"
          />
        </OrganicCard>

        {/* Dividers */}
        <OrganicCard title="Divisores" className="p-6 space-y-6">
          <div className="space-y-6">
            <OrganicDivider thickness={10} color="#111827" />
            <div className="flex items-stretch gap-6">
              <div className="flex-1 space-y-3 text-sm text-[#1e1e1e]/80">
                <p className="font-semibold text-[#1e1e1e]">Bloque izquierdo</p>
                <p>
                  Usa el divisor horizontal para separar secciones dentro de cards o paneles. El trazo mantiene
                  variaciones orgánicas.
                </p>
              </div>
              <OrganicDivider orientation="vertical" length="120px" thickness={10} color="#2563eb" />
              <div className="flex-1 space-y-3 text-sm text-[#1e1e1e]/80">
                <p className="font-semibold text-[#1e1e1e]">Bloque derecho</p>
                <p>
                  También puedes usar la versión vertical para separar acciones, resumenes o listados dentro de layouts
                  más complejos.
                </p>
              </div>
            </div>
          </div>
        </OrganicCard>

        {/* Pagination Demo */}
        <OrganicCard title="Paginación" className="p-6">
          <OrganicPagination
            page={currentPage}
            totalPages={12}
            onPageChange={setCurrentPage}
          />
        </OrganicCard>

        {/* Drawer & Popover */}
        <OrganicCard
          title={
            <span className="inline-flex items-center gap-2">
              <TfiLayoutMenuSeparated className="h-5 w-5" /> Paneles flotantes
            </span>
          }
          className="p-6 space-y-4"
        >
          <div className="flex flex-wrap items-center gap-4">
            <OrganicButton variant="primary" onClick={() => setDrawerOpen(true)} fullWidth={false}>
              Abrir Drawer
            </OrganicButton>
            <OrganicPopover
              placement="bottom"
              trigger={
                <OrganicButton variant="default" fullWidth={false}>
                  Ver opciones
                </OrganicButton>
              }
            >
              <div className="space-y-2 text-left">
                <p className="font-semibold text-[#1e1e1e]">Acciones rápidas</p>
                <ul className="space-y-1 text-sm">
                  <li>• Crear tablero</li>
                  <li>• Importar datos</li>
                  <li>• Invitar equipo</li>
                </ul>
              </div>
            </OrganicPopover>
          </div>
        </OrganicCard>

        {/* Table */}
        <OrganicCard
          title={
            <span className="inline-flex items-center gap-2">
              <TfiLayoutGrid2 className="h-5 w-5" /> Tabla de equipo
            </span>
          }
          className="p-6"
        >
          <OrganicTable
            columns={[
              { label: 'Nombre', accessor: 'name' },
              { label: 'Rol', accessor: 'role' },
              { label: 'País', accessor: 'country' }
            ]}
            data={[
              { name: 'Ana María', role: 'Diseño', country: 'México' },
              { name: 'Luis R.', role: 'Frontend', country: 'España' },
              { name: 'Carolina', role: 'Backend', country: 'Argentina' }
            ]}
          />
        </OrganicCard>

        {/* Stepper */}
        <OrganicCard
          title={
            <span className="inline-flex items-center gap-2">
              <TfiPulse className="h-5 w-5" /> Progreso del onboarding
            </span>
          }
          className="p-6 space-y-6"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            <OrganicStepper
              className="flex-1"
              steps={[{ label: 'Cuenta' }, { label: 'Equipo' }, { label: 'Integraciones' }, { label: 'Lanzamiento' }]}
              current={activeStep}
            />
            <div className="flex w-full flex-col gap-4 lg:w-64">
              <OrganicStepper
                variant="circular"
                steps={[{ label: 'Preparar' }, { label: 'Diseñar' }, { label: 'Publicar' }]}
                current={Math.min(activeStep, 2)}
              />
              <div className="flex items-center justify-end gap-3">
                <OrganicButton
                  variant="default"
                  fullWidth={false}
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                >
                  Retroceder
                </OrganicButton>
                <OrganicButton
                  variant="primary"
                  fullWidth={false}
                  disabled={activeStep === 3}
                  onClick={() => setActiveStep((prev) => Math.min(3, prev + 1))}
                >
                  Avanzar
                </OrganicButton>
              </div>
            </div>
          </div>
        </OrganicCard>

        {/* Tabs */}
        <OrganicCard
          title={
            <span className="inline-flex items-center gap-2">
              <TfiPalette className="h-5 w-5" /> Tabs
            </span>
          }
        >
          <OrganicTabs tabs={tabs} />
        </OrganicCard>

        {/* Tooltips Demo */}
        <OrganicCard
          title={
            <span className="inline-flex items-center gap-2">
              <TfiCommentAlt className="h-5 w-5" /> Tooltips
            </span>
          }
        >
          <div className="flex gap-8 flex-wrap justify-center items-center py-8">
            <OrganicTooltip content="Tooltip arriba" position="top">
              <OrganicButton variant="default" size="small">Top</OrganicButton>
            </OrganicTooltip>
            
            <OrganicTooltip content="Tooltip abajo" position="bottom">
              <OrganicButton variant="default" size="small">Bottom</OrganicButton>
            </OrganicTooltip>
            
            <OrganicTooltip content="Tooltip izquierda" position="left">
              <OrganicButton variant="default" size="small">Left</OrganicButton>
            </OrganicTooltip>
            
            <OrganicTooltip content="Tooltip derecha" position="right">
              <OrganicButton variant="default" size="small">Right</OrganicButton>
            </OrganicTooltip>
          </div>
        </OrganicCard>

        {/* Footer */}
        <OrganicBox
          className="p-8 text-center text-[#1e1e1e]"
          backgroundColor="#ffffff"
          strokeColor="#111827"
        >
          <p className="text-gray-600">
            Hecho con ❤️ usando React + Vite + SVG
          </p>
          <div className="flex gap-2 justify-center mt-3">
            <OrganicBadge variant="gray" size="small">React 18</OrganicBadge>
            <OrganicBadge variant="gray" size="small">Vite 5</OrganicBadge>
            <OrganicBadge variant="gray" size="small">Tailwind CSS</OrganicBadge>
          </div>
        </OrganicBox>

      </div>

      {/* Modal de Ejemplo */}
      <OrganicModal
        isOpen={modal.isOpen}
        onClose={modal.close}
        title={
          <span className="inline-flex items-center gap-2">
            <TfiPalette className="h-5 w-5" /> Modal de Ejemplo
          </span>
        }
        size="medium"
        footer={
          <div className="flex gap-3 justify-end">
            <OrganicButton variant="default" onClick={modal.close}>
              Cancelar
            </OrganicButton>
            <OrganicButton variant="primary" onClick={modal.close}>
              Aceptar
            </OrganicButton>
          </div>
        }
      >
        <p className="text-gray-700 mb-4">
          Este es un modal con estilo orgánico. Puedes personalizarlo con diferentes tamaños,
          agregar contenido personalizado y controlar su comportamiento.
        </p>
        <div className="space-y-3">
          <OrganicCheckbox label="Opción 1" checked={true} onChange={() => {}} />
          <OrganicCheckbox label="Opción 2" checked={false} onChange={() => {}} />
          <OrganicCheckbox label="Opción 3" checked={false} onChange={() => {}} />
        </div>
      </OrganicModal>

      {/* Modal de Confirmación */}
      <OrganicModal
        isOpen={confirmModal.isOpen}
        onClose={confirmModal.close}
        title={
          <span className="inline-flex items-center gap-2">
            <TfiCheckBox className="h-5 w-5" /> Registro Exitoso
          </span>
        }
        size="small"
      >
        <p className="text-gray-700 mb-4">
          ¡Tu registro ha sido procesado exitosamente!
        </p>
        <div className="flex justify-center">
          <OrganicButton variant="success" onClick={confirmModal.close}>
            Entendido
          </OrganicButton>
        </div>
      </OrganicModal>

      <OrganicDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Centro de comandos"
        size="medium"
        footer={
          <div className="flex justify-end gap-3">
            <OrganicButton variant="default" fullWidth={false} onClick={() => setDrawerOpen(false)}>
              Cancelar
            </OrganicButton>
            <OrganicButton variant="primary" fullWidth={false} onClick={() => setDrawerOpen(false)}>
              Guardar cambios
            </OrganicButton>
          </div>
        }
      >
        <p className="text-sm text-[#1e1e1e]/70 mb-4">
          El drawer permite mostrar configuraciones avanzadas sin salir del contexto actual.
        </p>
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-[#1e1e1e]">Nombre del panel</label>
          <OrganicInput placeholder="Centro creativo" />
        </div>
        <div className="mt-4 space-y-2">
          <OrganicCheckbox label="Activar modo colaborativo" />
          <OrganicCheckbox label="Notificar a mi equipo" />
        </div>
      </OrganicDrawer>
    </div>
  );
}

export default App;

