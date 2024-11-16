import React, { useState, useEffect } from 'react';
import { Users, Download } from 'lucide-react';

const CardHeader: React.FC<{className?: string; children: React.ReactNode}> = ({className, children}) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const CardTitle: React.FC<{className?: string; children: React.ReactNode}> = ({className, children}) => (
  <h3 className={`text-2xl font-semibold ${className}`}>{children}</h3>
);

const CardContent: React.FC<{className?: string; children: React.ReactNode}> = ({className, children}) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const Card: React.FC<{className?: string; children: React.ReactNode}> = ({className, children}) => (
  <div className={`bg-white rounded-lg border shadow-sm ${className}`}>{children}</div>
);

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input
    {...props}
    className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${props.className}`}
  />
);

const Badge: React.FC<{children: React.ReactNode; variant?: string; className?: string}> = ({children, variant = 'default', className = ''}) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
    variant === 'secondary' ? 'bg-gray-100 text-gray-800' : ''
  } ${className}`}>
    {children}
  </span>
);

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & {variant?: string}> = ({
  children,
  className = '',
  variant = 'default',
  ...props
}) => (
  <button
    className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring px-4 py-2 ${
      variant === 'outline' ? 'border border-input bg-background hover:bg-accent hover:text-accent-foreground' : ''
    } ${className}`}
    {...props}
  >
    {children}
  </button>
);

type AwarenessStage = 'most' | 'solution' | 'problem';

interface Settings {
  callsPerWeek: number;
  salesPeople: number;
  totalMarket: number;
  awarenessStage: AwarenessStage;
  personasPerAccount: number;
}

export const TargetingCalculator: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    callsPerWeek: 150,
    salesPeople: 1,
    totalMarket: 10000,
    awarenessStage: 'problem',
    personasPerAccount: 1
  });

  const [derivedData, setDerivedData] = useState({
    callsPerMonth: 0,
    reachableMarket: 0,
    coverage: 0,
    timeToComplete: 0
  });

  const awarenessDistribution: Record<AwarenessStage, number> = {
    most: 0.05,
    solution: 0.20,
    problem: 0.35,
  };

  useEffect(() => {
    const callsPerMonth = settings.callsPerWeek * 4 * settings.salesPeople;
    const totalMarketForStage = Math.floor(settings.totalMarket * awarenessDistribution[settings.awarenessStage]);
    const adjustedMarketSize = totalMarketForStage * settings.personasPerAccount;
    const coverage = Math.min(100, (callsPerMonth / adjustedMarketSize) * 100);
    const monthsToComplete = adjustedMarketSize / callsPerMonth;

    setDerivedData({
      callsPerMonth,
      reachableMarket: totalMarketForStage,
      coverage,
      timeToComplete: monthsToComplete
    });
  }, [settings]);

  const handleExport = () => {
    alert("Utilisez la capture d'écran de votre système pour sauvegarder les résultats.");
  };

  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader className="border-b">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Calculateur de Ciblage ABM</CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Account Based Marketing - Stratégie de ciblage par entreprise
            </p>
          </div>
          <Button onClick={handleExport} className="flex items-center gap-2" variant="outline">
            <Download size={16} />
            Capture d'écran
          </Button>
        </div>
      </CardHeader>
      
      {/* Le reste du composant reste identique */}
      
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4">
          <div className="space-y-6">
            {/* Configuration inputs */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Calls par semaine par commercial
              </label>
              <Input
                type="number"
                value={settings.callsPerWeek}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  callsPerWeek: parseInt(e.target.value) || 0
                }))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Nombre de commerciaux
              </label>
              <Input
                type="number"
                value={settings.salesPeople}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  salesPeople: parseInt(e.target.value) || 1
                }))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Users size={16} />
                Personas par compte
              </label>
              <Input
                type="number"
                value={settings.personasPerAccount}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  personasPerAccount: parseInt(e.target.value) || 1
                }))}
                className="w-full"
              />
              <p className="text-sm text-gray-500 mt-1">
                Plus de personas = meilleure pénétration du compte mais temps de couverture plus long
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Taille totale du marché (entreprises)
              </label>
              <Input
                type="number"
                value={settings.totalMarket}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  totalMarket: parseInt(e.target.value) || 0
                }))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Stade d'Awareness
              </label>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(awarenessDistribution).map(([stage, percentage]) => (
                  <button
                    key={stage}
                    className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                      settings.awarenessStage === stage
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                    }`}
                    onClick={() => setSettings(prev => ({
                      ...prev,
                      awarenessStage: stage as AwarenessStage
                    }))}
                  >
                    <div className="text-base mb-1">
                      {stage.charAt(0).toUpperCase() + stage.slice(1)}
                    </div>
                    <div className="text-xs opacity-90">
                      ({Math.round(percentage * 100)}%)
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="aspect-square relative rounded-lg bg-gray-50 border flex items-center justify-center overflow-hidden">
              {/* Visualization circles */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-4/5 h-4/5">
                  <div className="absolute inset-0 rounded-full border-2 border-gray-300 bg-gray-100 opacity-30" />
                  <div 
                    className="absolute rounded-full border-2 border-blue-300 bg-blue-100 opacity-50"
                    style={{
                      top: '50%',
                      left: '50%',
                      width: `${Math.sqrt(derivedData.reachableMarket / settings.totalMarket) * 100}%`,
                      height: `${Math.sqrt(derivedData.reachableMarket / settings.totalMarket) * 100}%`,
                      transform: 'translate(-50%, -50%)',
                      transition: 'all 0.3s ease'
                    }}
                  />
                  <div 
                    className="absolute rounded-full border-2 border-green-300 bg-green-100"
                    style={{
                      top: '50%',
                      left: '50%',
                      width: `${Math.sqrt(derivedData.coverage / 100) * Math.sqrt(derivedData.reachableMarket / settings.totalMarket) * 100}%`,
                      height: `${Math.sqrt(derivedData.coverage / 100) * Math.sqrt(derivedData.reachableMarket / settings.totalMarket) * 100}%`,
                      transform: 'translate(-50%, -50%)',
                      transition: 'all 0.3s ease'
                    }}
                  />
                </div>
              </div>

              <div className="absolute top-4 left-4 text-sm space-y-2 bg-white/90 p-3 rounded-lg shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-100 border-2 border-gray-300" />
                  <span>Marché Total: {settings.totalMarket.toLocaleString()} entreprises</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-100 border-2 border-blue-300" />
                  <span>Marché Adressable: {derivedData.reachableMarket.toLocaleString()} entreprises</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-100 border-2 border-green-300" />
                  <span>Couverture: {Math.round(derivedData.coverage)}%</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-4">Analyse du Ciblage</h3>
              <div className="grid gap-3">
                <div className="flex justify-between items-center">
                  <Badge variant="secondary">Capacité mensuelle</Badge>
                  <span className="font-medium">{derivedData.callsPerMonth.toLocaleString()} calls/mois</span>
                </div>
                <div className="flex justify-between items-center">
                  <Badge variant="secondary">Marché adressable</Badge>
                  <span className="font-medium">
                    {derivedData.reachableMarket.toLocaleString()} entreprises 
                    ({(derivedData.reachableMarket * settings.personasPerAccount).toLocaleString()} contacts)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <Badge variant="secondary">Temps de couverture estimé</Badge>
                  <span className="font-medium">
                    {Math.round(derivedData.timeToComplete * 10) / 10} mois
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold mb-2">Recommandations</h4>
                <div className={`p-3 rounded-lg ${
                  derivedData.coverage < 20 ? 'bg-yellow-50 text-yellow-800' :
                  derivedData.coverage > 80 ? 'bg-green-50 text-green-800' :
                  'bg-blue-50 text-blue-800'
                }`}>
                  {derivedData.coverage < 20 && 
                    "Couverture faible : Considérez d'augmenter vos ressources commerciales ou de cibler un segment plus spécifique."
                  }
{derivedData.coverage > 80 &&
                    "Excellente couverture : Vous pourriez élargir votre ciblage ou diversifier vos actions marketing."
                  }
                  {derivedData.coverage >= 20 && derivedData.coverage <= 80 &&
                    "Bonne couverture : Votre capacité est bien alignée avec la taille du marché ciblé."
                  }
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Impact des personas multiples :</strong> Avec {settings.personasPerAccount} persona{settings.personasPerAccount > 1 ? 's' : ''} par entreprise, 
                    la pénétration des comptes est {settings.personasPerAccount > 1 ? 'plus profonde' : 'basique'} mais {settings.personasPerAccount > 1 ? 'ralentit' : 'permet'} la couverture complète du marché.
                    {settings.personasPerAccount > 2 && " Cette approche est recommandée pour les comptes à fort potentiel (PME+) où l'investissement en temps est justifié par un panier moyen plus élevé."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TargetingCalculator;
