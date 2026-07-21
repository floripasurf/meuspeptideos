import type {
  CompoundTranslation,
  CompoundTranslations,
} from "@/lib/compound-translations";

const translations: CompoundTranslations = {
  "aod-9604": {
    description:
      "Fragmento modificado de la hormona de crecimiento humano (aminoácidos 177-191) desarrollado específicamente por su efecto lipolítico (quema de grasa) sin los efectos secundarios de la HGH completa. Aprobado en Australia como suplemento alimentario.",
    mechanism:
      "AOD-9604 corresponde a la región C-terminal de la hormona de crecimiento, responsable del efecto lipolítico. Estimula la lipólisis (degradación de grasa) e inhibe la lipogénesis (formación de grasa) sin afectar los niveles de IGF-1 ni causar resistencia a la insulina — a diferencia de la HGH completa.",
    benefits: [
      {
        name: "Efecto lipolítico",
        description:
          "Estudios en animales y fase 2 en humanos demostraron efecto en la reducción de grasa, pero los resultados clínicos en humanos fueron modestos.",
      },
      {
        name: "Sin efectos sobre IGF-1",
        description:
          "A diferencia de la HGH, no aumenta IGF-1 ni causa resistencia a la insulina, lo que reduce el perfil de riesgo.",
      },
    ],
    risks: [
      {
        name: "Eficacia incierta",
        frequency: "N/A",
        description:
          "El estudio de fase 2b en humanos obesos no alcanzó el endpoint primario de pérdida de peso significativa. La eficacia como agente anti-obesidad es cuestionable.",
      },
    ],
    internetVsScience: [
      {
        claim: "Quema grasa sin dieta",
        whatTheySay:
          "Promocionado como péptido que elimina grasa abdominal sin necesidad de dieta ni ejercicio.",
        actualEvidence:
          "Los estudios clínicos en humanos mostraron resultados modestos. El estudio de fase 2b falló en demostrar pérdida de peso clínicamente significativa. Muy inferior a semaglutida/tirzepatida.",
      },
    ],
    faqs: [],
  },

  "bpc-157": {
    description:
      "Péptido derivado de una proteína presente en el jugo gástrico humano. Ampliamente estudiado en modelos animales para regeneración de tejidos, cicatrización y protección gastrointestinal. Extremadamente popular en la comunidad de biohacking, pero sin estudios clínicos en humanos publicados.",
    mechanism:
      "El BPC-157 es un pentadecapéptido (15 aminoácidos) que parece actuar a través de múltiples mecanismos: estimula la angiogénesis (formación de nuevos vasos sanguíneos), modula el sistema de óxido nítrico, interactúa con el sistema dopaminérgico y promueve la expresión de factores de crecimiento. En modelos animales, demostró acelerar la cicatrización de tendones, músculos, huesos, piel y mucosa gastrointestinal.",
    benefits: [
      {
        name: "Cicatrización de tendones y ligamentos",
        description:
          "Múltiples estudios en ratas demostraron aceleración de la cicatrización del tendón de Aquiles y ligamentos. Ningún estudio en humanos publicado.",
      },
      {
        name: "Protección gastrointestinal",
        description:
          "En modelos animales, protege contra úlceras gástricas, colitis y daños intestinales causados por AINEs. Derivado de proteína gástrica natural.",
      },
      {
        name: "Cicatrización muscular",
        description:
          "Estudios en ratas mostraron recuperación acelerada de lesiones musculares. Resultados prometedores pero limitados a modelos animales.",
      },
    ],
    risks: [
      {
        name: "Seguridad desconocida en humanos",
        frequency: "Desconocido",
        description:
          "Sin ensayos clínicos en humanos publicados. El perfil de seguridad se basa únicamente en estudios animales, que no son directamente transferibles a humanos.",
      },
      {
        name: "Contaminación de productos",
        frequency: "Variable",
        description:
          "Productos vendidos como 'research chemicals' frecuentemente no pasan por un control de calidad riguroso. Riesgo de contaminación, dosificación incorrecta o adulteración.",
      },
    ],
    internetVsScience: [
      {
        claim: "Cura cualquier lesión",
        whatTheySay:
          "Comunidades online promueven BPC-157 como cura universal para lesiones musculares, tendinosas, articulares e incluso cerebrales.",
        actualEvidence:
          "Los resultados en animales son prometedores para cicatrización, pero CERO estudios clínicos en humanos han sido publicados. Extrapolar resultados de ratas a humanos es científicamente inadecuado.",
      },
      {
        claim: "Es completamente seguro porque es natural",
        whatTheySay:
          "Por ser derivado de una proteína del estómago humano, es considerado seguro por influencers.",
        actualEvidence:
          "El hecho de ser derivado de proteína humana no garantiza seguridad. Muchos péptidos naturales pueden tener efectos inesperados en dosis farmacológicas. Sin estudios de seguridad en humanos, es imposible afirmar que es seguro.",
      },
    ],
    faqs: [
      {
        question: "¿BPC-157 es legal?",
        answer:
          "BPC-157 no es un medicamento aprobado por las agencias reguladoras (FDA, EMA). No existe regulación específica para su uso terapéutico. Los productos vendidos como 'para investigación' operan en un área gris regulatoria.",
      },
      {
        question: "¿Por qué no existen estudios en humanos?",
        answer:
          "Los ensayos clínicos en humanos son costosos y complejos. Como BPC-157 es un péptido natural que no puede ser fácilmente patentado, hay poco incentivo económico para que las empresas farmacéuticas inviertan en estudios clínicos de fase 1-3.",
      },
    ],
  },

  "cjc-1295": {
    description:
      "Análogo sintético de la hormona liberadora de hormona de crecimiento (GHRH) con vida media prolongada. Frecuentemente combinado con ipamorelina para potenciar la liberación de GH. Disponible en versiones con y sin DAC (Drug Affinity Complex).",
    mechanism:
      "CJC-1295 mimetiza la GHRH natural, uniéndose a los receptores en la hipófisis anterior para estimular la síntesis y liberación de hormona de crecimiento. La versión con DAC se une a la albúmina sérica, extendiendo la vida media de minutos a días. Amplifica los pulsos naturales de GH sin suprimir el eje hipotálamo-hipófisis.",
    benefits: [
      {
        name: "Aumento sostenido de GH e IGF-1",
        description:
          "Estudio en humanos demostró aumento de 2-10x en los niveles de GH y aumento de 1.5-3x en los niveles de IGF-1 tras dosis única.",
      },
    ],
    risks: [
      {
        name: "Reacción en el sitio de inyección",
        frequency: "Común",
        description:
          "Enrojecimiento, hinchazón o dolor en el sitio de la inyección subcutánea.",
      },
      {
        name: "Retención hídrica",
        frequency: "Variable",
        description:
          "Edema leve puede ocurrir, relacionado con el aumento de GH/IGF-1.",
      },
    ],
    internetVsScience: [],
    faqs: [],
  },

  cagrisema: {
    description:
      "CagriSema es una combinación en dosis fija de cagrilintida (análogo de amilina de larga duración) y semaglutida (agonista de GLP-1) desarrollada por Novo Nordisk. La terapia combina dos mecanismos complementarios en una única inyección subcutánea semanal, alcanzando una pérdida de peso de aproximadamente 20% en 68 semanas en los ensayos clínicos — superior a la semaglutida sola. Se encuentra en fase 3 de desarrollo clínico (programa REDEFINE) con respuesta de la FDA pendiente para 2026.",
    mechanism:
      "CagriSema combina dos péptidos con mecanismos complementarios. La semaglutida activa el receptor de GLP-1, estimulando la secreción de insulina, suprimiendo el glucagón y reduciendo el apetito a través de los centros hipotalámicos de saciedad. La cagrilintida es un análogo de larga duración de la amilina, hormona cosecretada con la insulina por las células beta pancreáticas. La amilina retrasa el vaciamiento gástrico, suprime la secreción de glucagón y activa áreas cerebrales diferentes del GLP-1 para promover saciedad. La combinación de los dos mecanismos — GLP-1 actuando predominantemente en el hipotálamo y amilina en el área postrema — crea un efecto sinérgico sobre la reducción del apetito, resultando en una pérdida de peso significativamente mayor que cada componente por separado.",
    benefits: [
      {
        name: "Pérdida de peso superior (~20%)",
        description:
          "En los estudios REDEFINE, los participantes perdieron aproximadamente 20% del peso corporal en 68 semanas — superior a la semaglutida 2,4 mg sola (~16%). La combinación de mecanismos explica la eficacia adicional.",
      },
      {
        name: "Mecanismo dual sinérgico",
        description:
          "La combinación de amilina + GLP-1 actúa en vías neuronales complementarias de saciedad. La cagrilintida añade supresión del apetito por el área postrema, mientras que la semaglutida actúa en el hipotálamo, generando un efecto aditivo.",
      },
      {
        name: "Control glucémico",
        description:
          "Estudios en pacientes con diabetes tipo 2 muestran reducción robusta de HbA1c. La amilina complementa la acción del GLP-1 sobre el metabolismo de la glucosa, con reducción adicional de la glucemia posprandial.",
      },
      {
        name: "Potencial en NASH/esteatosis hepática",
        description:
          "La pérdida de peso sustancial (~20%) sugiere beneficios significativos en la esteatosis hepática no alcohólica. Estudios específicos para NASH están en planificación.",
      },
    ],
    risks: [
      {
        name: "Náuseas",
        frequency: "35-45% de los pacientes",
        description:
          "Efecto secundario más frecuente, especialmente durante la titulación. La combinación de dos péptidos puede intensificar los síntomas gastrointestinales al inicio del tratamiento. La titulación gradual es esencial.",
      },
      {
        name: "Reacciones en el sitio de inyección",
        frequency: "10-15% de los pacientes",
        description:
          "Enrojecimiento, hinchazón o dolor leve en el sitio de aplicación. Generalmente transitorio y autolimitado. Se recomienda rotación del sitio de inyección.",
      },
      {
        name: "Riesgo de pancreatitis",
        frequency: "Raro (<1%)",
        description:
          "Riesgo de clase de los agonistas GLP-1 y análogos de amilina. Casos raros pero graves de pancreatitis aguda reportados. Suspender inmediatamente en caso de dolor abdominal severo persistente. Contraindicado en pacientes con historial de pancreatitis.",
      },
    ],
    internetVsScience: [
      {
        claim: "CagriSema es el mejor adelgazante del mundo",
        whatTheySay:
          "Con 20% de pérdida de peso, CagriSema supera todos los demás tratamientos disponibles.",
        actualEvidence:
          "CagriSema realmente demostró ~20% de pérdida de peso, superando a la semaglutida sola (~16%). Sin embargo, la retatrutida (agonista triple) alcanzó ~24% en estudios fase 2. Además, CagriSema aún no ha sido aprobada — los resultados son de ensayos clínicos controlados. La comparación entre estudios diferentes tiene limitaciones.",
      },
      {
        claim: "Es más seguro que Ozempic porque usa dos medicamentos en dosis menor",
        whatTheySay:
          "Como combina dos medicamentos, cada uno en dosis más baja, los efectos secundarios son menores.",
        actualEvidence:
          "No es exactamente así. La semaglutida en CagriSema se usa en la misma dosis de 2,4 mg del Wegovy, con adición de la cagrilintida. Los efectos gastrointestinales (náuseas, vómitos) tienden a ser similares o ligeramente más frecuentes que la semaglutida sola. El perfil de seguridad general es comparable.",
      },
      {
        claim: "Ya se puede conseguir CagriSema en clínicas",
        whatTheySay:
          "Algunas clínicas de adelgazamiento ya ofrecen la combinación cagrilintida + semaglutida magistral.",
        actualEvidence:
          "CagriSema NO ha sido aprobada por ninguna agencia reguladora (FDA, ANVISA, EMA). La cagrilintida sola tampoco tiene aprobación. Cualquier oferta de 'CagriSema' o combinación similar es ilegal y no regulada. Los componentes requieren condiciones específicas de fabricación que no pueden replicarse en farmacias magistrales.",
      },
      {
        claim: "CagriSema reemplaza la cirugía bariátrica",
        whatTheySay:
          "Con 20% de pérdida de peso, ya no es necesario hacer bariátrica.",
        actualEvidence:
          "La cirugía bariátrica resulta en 25-35% de pérdida de peso sostenida por décadas, además de remisión de diabetes en 60-80% de los casos. CagriSema (~20%) se acerca, pero sigue siendo inferior, y los efectos dependen del uso continuo. Para obesidad grado III (IMC > 40) o con múltiples comorbilidades, la cirugía puede seguir siendo la opción más eficaz. La decisión debe ser individualizada con el médico.",
      },
    ],
    faqs: [
      {
        question: "¿Qué es exactamente CagriSema?",
        answer:
          "CagriSema es una combinación en dosis fija de dos péptidos en una única inyección semanal: cagrilintida (análogo de amilina de larga duración) y semaglutida (agonista de GLP-1, el mismo principio activo de Ozempic/Wegovy). Novo Nordisk desarrolla el producto como evolución de la semaglutida sola.",
      },
      {
        question: "¿Cuál es la diferencia entre CagriSema y Amycretin?",
        answer:
          "Son productos diferentes de Novo Nordisk. CagriSema combina dos péptidos separados (cagrilintida + semaglutida) en una inyección. Amycretin es una molécula única que integra actividad de GLP-1 y amilina en el mismo péptido — se encuentra en una etapa más temprana de desarrollo. Ambos exploran la sinergia amilina + GLP-1, pero con enfoques moleculares distintos.",
      },
      {
        question: "¿Cuándo será aprobado CagriSema?",
        answer:
          "Novo Nordisk presentó CagriSema a la FDA con respuesta esperada para el segundo semestre de 2026. Si se aprueba en EE.UU., las presentaciones a otras agencias reguladoras probablemente ocurrirán en los 6-12 meses siguientes.",
      },
      {
        question: "¿Es mejor que Wegovy (semaglutida)?",
        answer:
          "En los ensayos clínicos, sí: CagriSema (~20% de pérdida de peso) superó a la semaglutida sola (~16%). El mecanismo dual (amilina + GLP-1) explica la eficacia superior. Sin embargo, CagriSema puede tener costos más elevados y no está disponible comercialmente aún. Para muchos pacientes, la semaglutida sola puede ser suficiente.",
      },
      {
        question:
          "¿Puedo usar cagrilintida por separado junto con mi Ozempic?",
        answer:
          "No. La cagrilintida (análogo de amilina) no está disponible comercialmente como producto aislado. La combinación CagriSema fue desarrollada con proporciones específicas y titulación cuidadosa. Combinar medicamentos por cuenta propia es peligroso y puede causar hipoglucemia severa u otros efectos adversos graves. Nunca realice combinaciones sin orientación médica.",
      },
    ],
  },

  cerebrolysin: {
    description:
      "Mezcla de péptidos de bajo peso molecular y aminoácidos derivada de cerebro porcino purificado. Aprobada en más de 40 países para ACV, demencia y traumatismo craneoencefálico. No aprobada en EE.UU. Uno de los neurotróficos más estudiados clínicamente, con más de 200 estudios clínicos.",
    mechanism:
      "Cerebrolysin contiene fragmentos peptídicos que mimetizan la acción de factores neurotróficos naturales (BDNF, GDNF, NGF, CNTF). Promueve neuroplasticidad, neuroprotección, neurogénesis y sinaptogénesis. Actúa en múltiples vías simultáneamente, a diferencia de moléculas únicas que actúan sobre un solo blanco.",
    benefits: [
      {
        name: "Recuperación de ACV",
        description:
          "Metaanálisis de ensayos clínicos demuestran mejoría en la recuperación funcional post-ACV cuando se administra en las primeras 72 horas. Aprobado para esta indicación en 40+ países.",
      },
      {
        name: "Demencia y Alzheimer",
        description:
          "Estudios clínicos muestran mejoría modesta en la función cognitiva en pacientes con Alzheimer leve a moderado. Resultados mixtos en metaanálisis.",
      },
      {
        name: "Traumatismo craneoencefálico",
        description:
          "Estudios clínicos en TBI muestran potencial neuroprotector, pero la evidencia aún es insuficiente para una recomendación definitiva.",
      },
    ],
    risks: [
      {
        name: "Reacción alérgica",
        frequency: "Raro",
        description:
          "Por ser derivado de cerebro porcino, puede causar reacciones alérgicas en individuos sensibles.",
      },
      {
        name: "Vértigo y agitación",
        frequency: "Infrecuente",
        description:
          "Efectos secundarios neurológicos leves reportados en estudios clínicos.",
      },
    ],
    internetVsScience: [
      {
        claim: "Superdroga para el cerebro",
        whatTheySay:
          "Cerebrolysin regenera neuronas y cura daños cerebrales.",
        actualEvidence:
          "Tiene más de 200 estudios clínicos y aprobación en 40+ países — mucha más evidencia que la mayoría de los péptidos. Eficacia real en recuperación de ACV. Pero no 'regenera' neuronas perdidas y los resultados en Alzheimer son modestos. No aprobado por la FDA por cuestiones de estandarización del producto biológico.",
      },
    ],
    faqs: [
      {
        question: "¿Por qué Cerebrolysin no está aprobado en EE.UU.?",
        answer:
          "La FDA exige estandarización rigurosa de la composición para la aprobación. Como Cerebrolysin es una mezcla compleja de péptidos derivados de cerebro porcino, cada lote puede tener composición ligeramente diferente, lo que dificulta cumplir con los criterios de la FDA. Está aprobado en más de 40 países incluyendo Alemania, Rusia, China y Corea del Sur.",
      },
    ],
  },

  dsip: {
    description:
      "Neuropéptido descubierto en 1977 que modula el sueño delta (sueño profundo de ondas lentas). Investigado para insomnio, manejo del estrés y regulación del ritmo circadiano. Se encuentra naturalmente en el cerebro humano.",
    mechanism:
      "DSIP es un nonapéptido (9 aminoácidos) que modula la actividad GABAérgica y serotoninérgica en el tronco encefálico y el hipotálamo. Promueve el sueño de ondas lentas (delta sleep), reduce los niveles de cortisol y modula la liberación de hormona de crecimiento durante el sueño. También influye en la producción de LH y el eje hipotálamo-hipófisis-suprarrenal.",
    benefits: [
      {
        name: "Mejora del sueño profundo",
        description:
          "Estudios clínicos pequeños demuestran aumento del sueño de ondas lentas y mejoría subjetiva de la calidad del sueño en pacientes con insomnio.",
      },
      {
        name: "Reducción del estrés",
        description:
          "Estudios muestran reducción de los niveles de cortisol y normalización de la respuesta al estrés en modelos animales y pequeños estudios en humanos.",
      },
    ],
    risks: [
      {
        name: "Estudios clínicos limitados",
        frequency: "N/A",
        description:
          "Los estudios clínicos son antiguos (1980s-1990s), pequeños y con metodología cuestionable según los estándares actuales.",
      },
      {
        name: "Vida media muy corta",
        frequency: "N/A",
        description:
          "Se degrada rápidamente en sangre (vida media ~7-8 minutos), cuestionando la eficacia de la administración periférica.",
      },
    ],
    internetVsScience: [
      {
        claim: "Cura el insomnio naturalmente",
        whatTheySay:
          "DSIP es el péptido natural del sueño — lo tomas y duermes como un bebé, sin efectos de somníferos.",
        actualEvidence:
          "Modula el sueño profundo en algunos estudios, pero la evidencia es débil y antigua. La vida media extremadamente corta cuestiona si llega al cerebro en cantidades eficaces. No es sustituto de la higiene del sueño ni del tratamiento médico del insomnio.",
      },
    ],
    faqs: [],
  },

  dihexa: {
    description:
      "Péptido nootrópico derivado de la angiotensina IV con potencia 10 millones de veces mayor que el BDNF en la formación de nuevas conexiones neuronales (sinaptogénesis). Investigado para Alzheimer y deterioro cognitivo. Extremadamente potente pero con datos clínicos muy limitados.",
    mechanism:
      "Dihexa se une al receptor HGF (Hepatocyte Growth Factor) / c-Met, potenciando la señalización de HGF en el cerebro. Esto promueve sinaptogénesis (formación de nuevas sinapsis), neurogénesis y supervivencia neuronal. Es estable oralmente, lo cual es raro para péptidos.",
    benefits: [
      {
        name: "Sinaptogénesis potente",
        description:
          "Estudio seminal demostró potencia 10^7 veces mayor que BDNF en la formación de nuevas sinapsis in vitro. Restauró la función cognitiva en ratas con demencia inducida.",
      },
      {
        name: "Biodisponibilidad oral",
        description:
          "A diferencia de la mayoría de los péptidos, es estable y activo cuando se administra oralmente en modelos animales.",
      },
    ],
    risks: [
      {
        name: "Riesgo oncológico teórico",
        frequency: "Desconocido",
        description:
          "Activa la vía HGF/c-Met, que es un oncogén conocido. La sobreactivación de esta vía está asociada con crecimiento y metástasis tumoral. El riesgo a largo plazo es completamente desconocido.",
      },
      {
        name: "Cero datos en humanos",
        frequency: "N/A",
        description:
          "Toda la evidencia proviene de un único laboratorio (Universidad de Washington). Ningún estudio en humanos publicado.",
      },
    ],
    internetVsScience: [
      {
        claim: "El nootrópico más potente que existe",
        whatTheySay:
          "Dihexa es 10 millones de veces más potente que BDNF — el superpéptido para el cerebro.",
        actualEvidence:
          "La potencia in vitro es real (publicada en revista peer-reviewed), pero potencia in vitro no equivale a eficacia clínica. Cero estudios en humanos. Riesgo oncológico real vía c-Met. Usar un activador de oncogén como nootrópico es extremadamente riesgoso sin datos de seguridad.",
      },
    ],
    faqs: [],
  },

  epithalon: {
    description:
      "Tetrapéptido sintético (Ala-Glu-Asp-Gly) basado en la epithalamina, péptido natural producido por la glándula pineal. Investigado por sus efectos en la activación de la telomerasa y su potencial anti-envejecimiento. Desarrollado por el gerontólogo ruso Vladimir Khavinson.",
    mechanism:
      "Epithalon activa la telomerasa, enzima que alarga los telómeros — las capas protectoras de los cromosomas que se acortan con cada división celular. Telómeros más largos están asociados con mayor longevidad celular. También regula la producción de melatonina por la glándula pineal y modula la expresión génica relacionada con el envejecimiento.",
    benefits: [
      {
        name: "Activación de la telomerasa",
        description:
          "Estudios in vitro demuestran activación de la telomerasa y alargamiento de telómeros en células humanas. Estudios in vivo en modelos animales confirman el efecto.",
      },
      {
        name: "Regulación de melatonina",
        description:
          "Estudios en primates y humanos mayores muestran restauración del ritmo circadiano y producción de melatonina por la pineal.",
      },
      {
        name: "Aumento de longevidad en animales",
        description:
          "Estudios en ratas y ratones por Khavinson et al. demostraron aumento de 25-30% en el tiempo de vida.",
      },
    ],
    risks: [
      {
        name: "Estudios mayoritariamente rusos",
        frequency: "N/A",
        description:
          "Casi toda la investigación fue conducida por el mismo grupo en Rusia (Khavinson). Faltan replicaciones independientes y estudios clínicos robustos fuera de Rusia.",
      },
      {
        name: "Riesgo teórico de cáncer",
        frequency: "Desconocido",
        description:
          "La activación de la telomerasa es una característica de las células cancerosas. Aunque los estudios en animales no mostraron aumento de cáncer, el riesgo teórico existe y no ha sido adecuadamente evaluado en humanos.",
      },
    ],
    internetVsScience: [
      {
        claim: "Revierte el envejecimiento biológico",
        whatTheySay:
          "Epithalon es la fuente de la juventud — alarga telómeros y revierte el reloj biológico.",
        actualEvidence:
          "Activa la telomerasa en laboratorio, pero alargar telómeros no es sinónimo de revertir el envejecimiento. El envejecimiento es multifactorial. Los estudios de longevidad en animales son prometedores pero conducidos solo por un grupo. Ningún estudio clínico de fase 3 en humanos.",
      },
    ],
    faqs: [
      {
        question: "¿Epithalon puede causar cáncer?",
        answer:
          "Es una preocupación teórica legítima, ya que la telomerasa está activada en 85-90% de los cánceres humanos. Sin embargo, los estudios en animales de Khavinson no mostraron aumento en la incidencia de tumores — de hecho, algunos mostraron reducción. Pero esos estudios no fueron diseñados para evaluar riesgo oncológico y no han sido replicados independientemente.",
      },
    ],
  },

  espermidina: {
    description:
      "IMPORTANTE: La espermidina no es un péptido, es una poliamina natural presente en todas las células vivas. Se encuentra en alta concentración en germen de trigo, queso madurado (especialmente cheddar maduro), champiñones, soja y nattō. Activa la autofagia (reciclaje celular) y ha mostrado aumentar la longevidad en modelos animales. En humanos, está asociada con reducción de la mortalidad cardiovascular.",
    mechanism:
      "La espermidina es un inductor potente de autofagia — el proceso celular de reciclar componentes dañados. Inhibe acetiltransferasas de histonas, modulando la expresión génica. Reduce la inflamación, mejora la función mitocondrial y cardíaca, y mimetiza los efectos de la restricción calórica en varios sistemas.",
    benefits: [
      {
        name: "Inducción de autofagia",
        description:
          "Demostrada en múltiples estudios in vitro e in vivo. Considerada uno de los inductores naturales más potentes de autofagia.",
      },
      {
        name: "Salud cardiovascular",
        description:
          "Estudios poblacionales asocian un consumo dietético alto de espermidina con menor mortalidad cardiovascular y por todas las causas.",
      },
      {
        name: "Función cognitiva",
        description:
          "El estudio SmartAge mostró mejoría modesta en memoria en adultos mayores con deterioro cognitivo subjetivo después de 3 meses de suplementación.",
      },
      {
        name: "Longevidad animal",
        description:
          "Aumento del tiempo de vida demostrado en levaduras, gusanos, moscas, ratones y cardiomiocitos humanos in vitro.",
      },
    ],
    risks: [
      {
        name: "Estudios clínicos limitados",
        frequency: "N/A",
        description:
          "Existe en la dieta desde siempre, por lo que el perfil de seguridad es favorable. Pero los estudios clínicos con dosis suplementarias aún son limitados.",
      },
    ],
    internetVsScience: [
      {
        claim: "Comer queso cheddar te hace vivir más",
        whatTheySay:
          "El queso madurado tiene espermidina y por eso prolonga la vida.",
        actualEvidence:
          "Es verdad que el cheddar maduro contiene espermidina. Estudios poblacionales asocian un mayor consumo dietético con longevidad. Pero atribuir la longevidad a un único componente del queso es una simplificación — la dieta en su conjunto importa.",
      },
    ],
    faqs: [],
  },

  "foxo4-dri": {
    description:
      "Péptido senolítico desarrollado por Peter de Keizer en la Universidad de Utrecht (2017). El FOXO4-DRI es un péptido D-retro-inverso diseñado para eliminar selectivamente células senescentes — las llamadas 'células zombi' que se acumulan con el envejecimiento y secretan factores inflamatorios perjudiciales. En estudios con ratones envejecidos, el péptido restauró vigor físico, densidad del pelaje y función renal, convirtiéndose en uno de los compuestos anti-envejecimiento más comentados en la comunidad científica.",
    mechanism:
      "FOXO4-DRI funciona interrumpiendo la interacción entre las proteínas FOXO4 y p53 dentro de las células senescentes. Normalmente, FOXO4 se une a p53 en el núcleo de las células senescentes, impidiendo que p53 active la vía de apoptosis (muerte celular programada). El péptido FOXO4-DRI compite con la FOXO4 endógena por esta unión, desplazando a p53 al citoplasma. Una vez libre en el citoplasma, p53 activa la cascada mitocondrial de apoptosis, llevando a la muerte selectiva de la célula senescente. Las células sanas no se ven afectadas porque no dependen de la interacción FOXO4-p53 para sobrevivir. La estructura D-retro-inverso (aminoácidos D en secuencia invertida) confiere resistencia a la degradación por proteasas, aumentando la vida media del péptido in vivo.",
    benefits: [
      {
        name: "Eliminación de células senescentes",
        description:
          "En ratones envejecidos y genéticamente modificados, FOXO4-DRI redujo significativamente la carga de células senescentes en múltiples tejidos, incluyendo hígado, riñón e intestino.",
      },
      {
        name: "Potencial anti-envejecimiento",
        description:
          "Ratones tratados con FOXO4-DRI presentaron mejora en la actividad física, apariencia general y marcadores de envejecimiento. La senólisis es considerada una de las estrategias más prometedoras contra el envejecimiento biológico.",
      },
      {
        name: "Regeneración del pelaje en ratones envejecidos",
        description:
          "Ratones naturalmente envejecidos tratados con FOXO4-DRI presentaron regeneración significativa del pelaje, indicando rejuvenecimiento de los folículos pilosos tras la eliminación de células senescentes.",
      },
      {
        name: "Mejora de la función renal",
        description:
          "Los ratones tratados presentaron mejoría en la función renal, medida por la reducción de los niveles de urea plasmática, sugiriendo que la eliminación de células senescentes en los riñones puede restaurar parcialmente la función del órgano.",
      },
    ],
    risks: [
      {
        name: "Costo extremadamente elevado",
        frequency: "Siempre",
        description:
          "La síntesis del FOXO4-DRI es compleja y costosa debido a su estructura D-retro-inverso (48 aminoácidos D). El costo por dosis estimado es de miles de dólares, haciéndolo inaccesible para la mayoría de las personas.",
      },
      {
        name: "Efectos a largo plazo desconocidos",
        frequency: "Desconocido",
        description:
          "No existen estudios a largo plazo, ni siquiera en animales. Los efectos de la eliminación crónica de células senescentes a lo largo de años son completamente desconocidos.",
      },
      {
        name: "Riesgo de eliminar células senescentes beneficiosas",
        frequency: "Teórico",
        description:
          "No todas las células senescentes son perjudiciales. Algunas desempeñan roles importantes en la cicatrización de heridas, supresión tumoral y desarrollo embrionario. La eliminación indiscriminada puede tener consecuencias inesperadas.",
      },
      {
        name: "Ausencia total de datos en humanos",
        frequency: "N/A",
        description:
          "No existe ningún ensayo clínico en humanos. Toda la evidencia proviene de ratones. La traducción de resultados de modelos murinos a humanos frecuentemente falla, especialmente en intervenciones anti-envejecimiento.",
      },
    ],
    internetVsScience: [
      {
        claim: "FOXO4-DRI revierte el envejecimiento",
        whatTheySay:
          "El péptido rejuvenece el cuerpo entero, revirtiendo años de envejecimiento en pocas semanas.",
        actualEvidence:
          "En ratones, hubo mejoría en marcadores específicos de envejecimiento (pelaje, función renal, actividad física). Esto no es 'reversión del envejecimiento' — es la remoción de uno de los factores que contribuyen al deterioro funcional. El envejecimiento es multifactorial y ningún compuesto aislado lo 'revierte'.",
      },
      {
        claim: "Ya está disponible para uso en humanos",
        whatTheySay:
          "Clínicas de longevidad y proveedores de péptidos ofrecen FOXO4-DRI para administración en humanos.",
        actualEvidence:
          "No existe NINGÚN ensayo clínico en humanos concluido o en curso. Cualquier uso en humanos es completamente experimental, sin datos de seguridad, farmacocinética o dosificación establecidos para nuestra especie.",
      },
      {
        claim: "FOXO4-DRI cura el cáncer",
        whatTheySay:
          "Como elimina células viejas y dañadas, el péptido puede curar o prevenir el cáncer.",
        actualEvidence:
          "La relación entre senescencia celular y cáncer es compleja. Las células senescentes pueden tanto suprimir como promover tumores (vía SASP — fenotipo secretorio asociado a la senescencia). La eliminación de células senescentes puede reducir el microambiente protumoral, pero también remover una barrera contra la proliferación de células premalignas. No hay evidencia de que FOXO4-DRI prevenga o trate el cáncer.",
      },
    ],
    faqs: [
      {
        question:
          "¿Qué son las células senescentes y por qué eliminarlas?",
        answer:
          "Las células senescentes son células que dejaron de dividirse pero no mueren. Se acumulan con la edad y secretan sustancias inflamatorias (llamadas SASP) que dañan tejidos vecinos, contribuyendo a enfermedades cardiovasculares, neurodegeneración, artritis y otras condiciones asociadas al envejecimiento. Eliminar estas 'células zombi' es una de las estrategias más prometedoras de la medicina anti-envejecimiento.",
      },
      {
        question: "¿Puedo usar FOXO4-DRI en humanos hoy?",
        answer:
          "No hay datos de seguridad en humanos. No existen ensayos clínicos concluidos o en curso. La dosificación, farmacocinética y efectos secundarios en humanos son completamente desconocidos. Cualquier uso es experimental y riesgoso. Además, el costo de síntesis es prohibitivo — miles de dólares por dosis.",
      },
      {
        question:
          "¿Cuál es la diferencia entre FOXO4-DRI y otros senolíticos como dasatinib + quercetina?",
        answer:
          "Dasatinib + quercetina (D+Q) son moléculas pequeñas ya aprobadas para otros usos (dasatinib es un quimioterapéutico) y son mucho más accesibles. FOXO4-DRI es un péptido diseñado específicamente para senólisis con mecanismo más selectivo (bloquea FOXO4-p53). En la práctica, D+Q tiene más datos clínicos en humanos, mientras que FOXO4-DRI permanece restringido a estudios animales.",
      },
      {
        question:
          "¿Los resultados en ratones se traducen a humanos?",
        answer:
          "No siempre. La biología del envejecimiento en ratones difiere significativamente de la humana. Los ratones viven ~2 años, por lo que los cambios en marcadores de envejecimiento son más fáciles de detectar. Muchas intervenciones anti-envejecimiento prometedoras en ratones fallaron al ser probadas en humanos. FOXO4-DRI aún necesita pasar por ensayos clínicos rigurosos para determinar si los beneficios observados en roedores se aplican a personas.",
      },
    ],
  },

  fisetina: {
    description:
      "IMPORTANTE: La fisetina no es un péptido, es un flavonoide (polifenol) encontrado en frutas y vegetales como fresas (la fuente más rica), manzanas, caquis, uvas y cebollas. Ganó destaque en la investigación de longevidad como senolítico — compuesto que elimina selectivamente células senescentes ('zombis') que se acumulan con la edad y contribuyen a la inflamación crónica.",
    mechanism:
      "La fisetina se clasifica como senolítico — induce apoptosis selectiva en células senescentes (células viejas que dejaron de dividirse pero no mueren, secretando moléculas inflamatorias). También tiene propiedades antioxidantes, antiinflamatorias y neuroprotectoras. Atraviesa la barrera hematoencefálica.",
    benefits: [
      {
        name: "Actividad senolítica",
        description:
          "Demostrada en estudios in vitro y en ratones. Fue identificada como el senolítico más potente entre los flavonoides probados.",
      },
      {
        name: "Aumento de longevidad en ratones",
        description:
          "Ratones tratados con fisetina tardíamente en la vida tuvieron un aumento de 10% en el tiempo de vida y reducción de marcadores de senescencia.",
      },
      {
        name: "Neuroprotección",
        description:
          "Estudios en modelos animales de Alzheimer y Parkinson muestran efectos neuroprotectores y mejora cognitiva.",
      },
    ],
    risks: [
      {
        name: "Biodisponibilidad muy baja",
        frequency: "Universal",
        description:
          "La fisetina tiene una absorción oral muy baja. Las dosis suplementarias necesitan ser mucho mayores que las obtenidas naturalmente de la dieta.",
      },
      {
        name: "Sin estudios humanos completos",
        frequency: "N/A",
        description:
          "Los ensayos clínicos en humanos están en fase 1/2 (ej: estudio en Mayo Clinic). La eficacia en humanos aún no ha sido confirmada.",
      },
    ],
    internetVsScience: [
      {
        claim: "Mata células zombi y te rejuvenece",
        whatTheySay:
          "La fisetina es el senolítico natural que limpia células viejas y revierte el envejecimiento.",
        actualEvidence:
          "La actividad senolítica es real en laboratorio y en ratones. Pero el efecto 'rejuvenecedor' en humanos aún no ha sido demostrado en ensayos clínicos. Investigación prometedora, pero no concluyente.",
      },
    ],
    faqs: [],
  },

  "ghk-cu": {
    description:
      "Tripéptido naturalmente presente en el plasma sanguíneo que se une al cobre. Investigado extensivamente por sus efectos anti-envejecimiento en la piel, incluyendo estimulación de colágeno, cicatrización y reducción de arrugas. Uno de los pocos péptidos con aplicación tópica bien estudiada.",
    mechanism:
      "GHK-Cu (glicil-L-histidil-L-lisina cobre) se encuentra naturalmente en la sangre humana, pero sus niveles disminuyen con la edad. El complejo cobre-péptido activa genes involucrados en la síntesis de colágeno, elastina y glicosaminoglicanos. También tiene efectos antioxidantes, antiinflamatorios y estimula la remodelación de la matriz extracelular.",
    benefits: [
      {
        name: "Estimulación de colágeno",
        description:
          "Múltiples estudios in vitro y clínicos confirman el aumento en la producción de colágeno tipo I y III cuando se aplica tópicamente.",
      },
      {
        name: "Reducción de arrugas y líneas finas",
        description:
          "Estudios clínicos pequeños demostraron mejora en la textura de la piel y reducción de arrugas después del uso tópico de cremas con GHK-Cu.",
      },
      {
        name: "Cicatrización de heridas",
        description:
          "Evidencia de aceleración de la cicatrización en estudios animales y pequeños estudios clínicos.",
      },
    ],
    risks: [
      {
        name: "Irritación cutánea",
        frequency: "Infrecuente",
        description:
          "Puede causar irritación leve en pieles sensibles cuando se usa tópicamente.",
      },
    ],
    internetVsScience: [
      {
        claim: "Revierte el envejecimiento",
        whatTheySay:
          "Promocionado como 'anti-aging milagroso' que revierte años de envejecimiento de la piel.",
        actualEvidence:
          "Mejora comprobada en la calidad de la piel y colágeno, pero no 'revierte' el envejecimiento. Los efectos son modestos y graduales. El uso tópico tiene más evidencia que el inyectable.",
      },
    ],
    faqs: [
      {
        question: "¿GHK-Cu funciona mejor tópico o inyectable?",
        answer:
          "La mayoría de los estudios clínicos usaron GHK-Cu en formulaciones tópicas (cremas y sueros). La aplicación tópica tiene más evidencia científica que la inyectable para efectos en la piel.",
      },
    ],
  },

  glutationa: {
    description:
      "A diferencia del NMN/NAC/Resveratrol, el glutatión ES TÉCNICAMENTE UN PÉPTIDO — un tripéptido compuesto por glutamato, cisteína y glicina (γ-Glu-Cis-Gli). Es el principal antioxidante intracelular del organismo y desempeña un papel central en la desintoxicación hepática, la función inmune y la protección contra el estrés oxidativo. Los niveles disminuyen con la edad.",
    mechanism:
      "El glutatión actúa como secuestrador de radicales libres, regenera otros antioxidantes (vitaminas C y E), conjuga toxinas en el hígado para su excreción y modula la función inmune. La enzima glutatión peroxidasa usa GSH para neutralizar el peróxido de hidrógeno. También regula la señalización celular y la expresión génica mediante reacciones redox.",
    benefits: [
      {
        name: "Antioxidante intracelular",
        description:
          "Comprobadamente el principal antioxidante endógeno. Los niveles de GSH son un marcador de salud celular.",
      },
      {
        name: "Soporte hepático",
        description:
          "Esencial para la fase 2 de la desintoxicación hepática. Utilizado clínicamente en hepatopatías e intoxicaciones.",
      },
      {
        name: "Suplementación oral",
        description:
          "La forma liposomal aumenta los niveles de GSH en humanos. La suplementación convencional tiene absorción limitada — NAC es frecuentemente preferido por aumentar el GSH endógeno indirectamente.",
      },
      {
        name: "Aclaramiento de piel",
        description:
          "Popular en clínicas estéticas para aclaramiento de piel. La evidencia clínica es limitada y el mecanismo es controvertido.",
      },
    ],
    risks: [
      {
        name: "Absorción oral baja",
        frequency: "Forma convencional",
        description:
          "El glutatión oral convencional se degrada en el intestino. Las formas liposomales o la administración intravenosa son alternativas, pero el costo es mayor.",
      },
      {
        name: "Uso intravenoso para aclaramiento",
        frequency: "Variable",
        description:
          "El uso IV de glutatión para aclaramiento de piel tiene riesgos: reacciones alérgicas, problemas renales e infecciones por mala praxis. Agencias reguladoras han emitido alertas contra el uso off-label.",
      },
    ],
    internetVsScience: [
      {
        claim: "El glutatión intravenoso aclara la piel permanentemente",
        whatTheySay:
          "Aplicación IV de glutatión en clínicas estéticas para 'aclaramiento de la piel'.",
        actualEvidence:
          "La evidencia clínica es limitada y las agencias reguladoras no aprueban el uso para aclaramiento. Hay reportes de eventos adversos. Los efectos son temporales cuando ocurren.",
      },
      {
        claim: "Tomar glutatión oral aumenta sus niveles",
        whatTheySay:
          "Cápsulas de glutatión aumentan el glutatión en el cuerpo.",
        actualEvidence:
          "El glutatión oral convencional tiene biodisponibilidad muy baja — se degrada en el intestino. Las formas liposomales tienen mejor absorción. NAC (precursor) es frecuentemente más eficaz para aumentar el GSH endógeno.",
      },
    ],
    faqs: [
      {
        question: "¿El glutatión es realmente un péptido?",
        answer:
          "Sí. El glutatión es técnicamente un tripéptido (3 aminoácidos: glutamato, cisteína, glicina). A diferencia del NMN, NAC o resveratrol, cumple con la definición de péptido. Está clasificado en esta base como péptido inmunológico.",
      },
    ],
  },

  ipamorelin: {
    description:
      "Péptido secretagogo de hormona de crecimiento (GH) que estimula la liberación de GH por la hipófisis. Considerado uno de los secretagogos más selectivos, con menos efectos secundarios que otros de la misma clase. Frecuentemente combinado con CJC-1295.",
    mechanism:
      "La ipamorelina es un pentapéptido que actúa como agonista del receptor de grelina (GHSR) en la hipófisis anterior, estimulando la liberación pulsátil de hormona de crecimiento. A diferencia de otros secretagogos, no afecta significativamente los niveles de cortisol ni de prolactina, haciéndolo más selectivo.",
    benefits: [
      {
        name: "Aumento de GH",
        description:
          "Estudios clínicos confirman un aumento dosis-dependiente en la liberación de hormona de crecimiento en humanos sanos.",
      },
      {
        name: "Selectividad (menos efectos secundarios)",
        description:
          "No eleva cortisol ni prolactina significativamente, a diferencia de otros secretagogos como GHRP-6.",
      },
    ],
    risks: [
      {
        name: "Dolor de cabeza",
        frequency: "Común",
        description:
          "Efecto secundario reportado con frecuencia en estudios clínicos.",
      },
      {
        name: "Retención hídrica",
        frequency: "Variable",
        description:
          "Puede ocurrir hinchazón leve debido al aumento de GH.",
      },
    ],
    internetVsScience: [
      {
        claim: "Reemplaza las inyecciones de HGH",
        whatTheySay:
          "Promocionado como alternativa más segura y económica a la hormona de crecimiento sintética.",
        actualEvidence:
          "Estimula la liberación natural de GH, pero los niveles alcanzados son significativamente menores que con HGH exógena. No es equivalente.",
      },
    ],
    faqs: [],
  },

  kpv: {
    description:
      "Tripéptido derivado de la hormona alfa-MSH (alfa-melanocito estimulante) con potente efecto antiinflamatorio. Investigado para enfermedades inflamatorias intestinales, dermatitis e inflamación sistémica. Popular en la comunidad de biohacking por su perfil antiinflamatorio sin inmunosupresión.",
    mechanism:
      "KPV está compuesto por los tres aminoácidos C-terminales de la alfa-MSH (Lisina-Prolina-Valina). Inhibe la activación de NF-κB, principal vía de señalización inflamatoria, y reduce la producción de citocinas proinflamatorias (TNF-α, IL-6, IL-1β). A diferencia de los inmunosupresores, modula la inflamación sin suprimir la respuesta inmune adaptativa.",
    benefits: [
      {
        name: "Antiinflamatorio potente",
        description:
          "Estudios in vitro y en animales demuestran inhibición significativa de NF-κB y reducción de citocinas inflamatorias sin inmunosupresión.",
      },
      {
        name: "Protección intestinal",
        description:
          "Estudios en modelos animales de colitis muestran reducción de la inflamación intestinal y protección de la mucosa. Potencial para enfermedad de Crohn y colitis ulcerosa.",
      },
      {
        name: "Cicatrización de heridas",
        description:
          "Acelera la cicatrización en modelos animales vía reducción de la inflamación local y modulación de macrófagos.",
      },
    ],
    risks: [
      {
        name: "Sin estudios en humanos",
        frequency: "Desconocido",
        description:
          "Cero ensayos clínicos en humanos publicados. Toda la evidencia es preclínica (in vitro y animal).",
      },
    ],
    internetVsScience: [
      {
        claim: "Cura enfermedades intestinales",
        whatTheySay:
          "KPV oral cura leaky gut, SII, Crohn y colitis — el antiinflamatorio perfecto.",
        actualEvidence:
          "Efectos antiinflamatorios reales demostrados en modelos animales de colitis, pero CERO estudios en humanos. La biodisponibilidad oral de péptidos es generalmente muy baja. No existe evidencia de que 'cure' ninguna condición.",
      },
    ],
    faqs: [],
  },

  "ll-37": {
    description:
      "Único péptido antimicrobiano de la familia de las catelicidinas encontrado en humanos. Actúa como primera línea de defensa inmune innata contra bacterias, virus y hongos. Investigado para infecciones resistentes a antibióticos y modulación inmunológica.",
    mechanism:
      "LL-37 es un péptido de 37 aminoácidos clivado de la proteína precursora hCAP18. Posee actividad antimicrobiana directa — rompe membranas bacterianas formando poros. También actúa como inmunomodulador, reclutando células inmunes, estimulando la angiogénesis y promoviendo la cicatrización. Producido naturalmente por neutrófilos, macrófagos y células epiteliales.",
    benefits: [
      {
        name: "Actividad antimicrobiana amplia",
        description:
          "Demostrada actividad contra bacterias grampositivas, gramnegativas, virus envueltos y hongos in vitro. Activo contra biopelículas bacterianas.",
      },
      {
        name: "Inmunomodulación",
        description:
          "Recluta células inmunes, modula la inflamación y promueve la cicatrización. Estudios clínicos de fase 1/2 para úlceras venosas mostraron resultados positivos.",
      },
    ],
    risks: [
      {
        name: "Toxicidad en altas dosis",
        frequency: "Dosis-dependiente",
        description:
          "En concentraciones altas, LL-37 puede ser citotóxico para células humanas (mismo mecanismo de ruptura de membrana que usa contra bacterias).",
      },
    ],
    internetVsScience: [
      {
        claim: "Antibiótico natural que reemplaza medicamentos",
        whatTheySay:
          "LL-37 mata bacterias, virus y hongos naturalmente — puede reemplazar antibióticos.",
        actualEvidence:
          "Tiene actividad antimicrobiana real y comprobada in vitro, pero las concentraciones necesarias in vivo son difíciles de alcanzar sin toxicidad. No reemplaza antibióticos para infecciones establecidas. La investigación se centra en uso tópico para heridas.",
      },
    ],
    faqs: [],
  },

  "mots-c": {
    description:
      "Péptido codificado por el ADN mitocondrial que actúa como hormona del ejercicio (exercise mimetic). Regula el metabolismo de la glucosa, la sensibilidad a la insulina y la homeostasis energética. Considerado uno de los péptidos mitocondriales más prometedores para metabolismo y longevidad.",
    mechanism:
      "MOTS-c es un péptido de 16 aminoácidos codificado por el gen 12S rRNA del ADN mitocondrial. Actúa como una mitoquina — hormona secretada por la mitocondria que actúa sistémicamente. Activa la vía AMPK, mejora la captación de glucosa muscular, aumenta el metabolismo de ácidos grasos y regula la vía del folato. En respuesta al estrés metabólico, transloca al núcleo celular donde regula la expresión génica.",
    benefits: [
      {
        name: "Mimetiza el ejercicio físico",
        description:
          "Estudios en ratones demuestran que MOTS-c activa vías metabólicas similares al ejercicio, incluyendo la activación de AMPK y mejora en la captación de glucosa muscular.",
      },
      {
        name: "Sensibilidad a la insulina",
        description:
          "Mejora la resistencia a la insulina inducida por dieta en modelos animales. El primer estudio clínico en humanos (fase 1) fue publicado en 2023.",
      },
      {
        name: "Protección contra la obesidad",
        description:
          "Previene el aumento de peso inducido por dieta hipercalórica en ratones. Aumenta el gasto energético y la oxidación de ácidos grasos.",
      },
    ],
    risks: [
      {
        name: "Datos clínicos muy limitados",
        frequency: "Desconocido",
        description:
          "Solo un estudio clínico de fase 1 publicado en humanos (2023, n=10). El perfil de seguridad a largo plazo es completamente desconocido.",
      },
    ],
    internetVsScience: [
      {
        claim: "Reemplaza el ejercicio físico",
        whatTheySay:
          "Llamado 'exercise in a pill' — toma MOTS-c y no necesitas entrenar.",
        actualEvidence:
          "Activa algunas vías similares al ejercicio en modelos animales, pero no replica todos los beneficios del ejercicio (cardiovascular, mental, óseo). Solo 1 estudio en humanos publicado. No reemplaza el ejercicio.",
      },
    ],
    faqs: [
      {
        question: "¿MOTS-c es natural del cuerpo?",
        answer:
          "Sí. MOTS-c es producido naturalmente por las mitocondrias humanas y sus niveles circulantes disminuyen con la edad. Es el primer péptido hormonal codificado por el ADN mitocondrial (no nuclear) en ser identificado.",
      },
    ],
  },

  "melanotan-ii": {
    description:
      "Análogo sintético de la hormona alfa-MSH que estimula la producción de melanina (bronceado) y tiene efectos sobre la función sexual. Ampliamente usado en el mercado clandestino para bronceado sin sol. No aprobado por ninguna agencia reguladora. Asociado a riesgos significativos.",
    mechanism:
      "Melanotan II activa múltiples receptores de melanocortina (MC1R-MC5R). Vía MC1R, estimula a los melanocitos a producir melanina, causando bronceado sin exposición UV. Vía MC4R, afecta centros de deseo sexual en el hipotálamo (mismo receptor del PT-141/Vyleesi). Vía MC3R/MC4R, puede suprimir el apetito.",
    benefits: [
      {
        name: "Bronceado sin UV",
        description:
          "Estudios clínicos de fase 2 confirman aumento significativo de melanina y bronceado de la piel sin exposición solar.",
      },
      {
        name: "Efecto sobre la función sexual",
        description:
          "Efecto secundario observado que llevó al desarrollo del PT-141 (bremelanotida/Vyleesi) como medicamento separado.",
      },
    ],
    risks: [
      {
        name: "Nevos atípicos / melanoma",
        frequency: "Reportes de caso",
        description:
          "Reportes de aparición de nevos atípicos (lunares irregulares) y potencial transformación maligna. La estimulación de melanocitos puede promover melanoma en individuos predispuestos.",
      },
      {
        name: "Náusea severa",
        frequency: "Muy común",
        description:
          "Náusea intensa es el efecto secundario más frecuente, especialmente en las primeras dosis.",
      },
      {
        name: "Aumento de la presión arterial",
        frequency: "Común",
        description:
          "Hipertensión transitoria reportada en estudios clínicos.",
      },
      {
        name: "Contaminación de productos",
        frequency: "Variable",
        description:
          "Productos vendidos en línea frecuentemente contaminados o con dosificación incorrecta. Sin control de calidad.",
      },
    ],
    internetVsScience: [
      {
        claim: "Bronceado seguro sin sol",
        whatTheySay:
          "MT-2 da un bronceado perfecto sin riesgo de quemadura solar. Más seguro que tomar sol.",
        actualEvidence:
          "Causa bronceado real, pero NO es seguro. Asociado a aparición de nevos atípicos y riesgo teórico de melanoma. Prohibido en Europa y Australia. Los productos del mercado negro frecuentemente están contaminados. No aprobado en ningún país.",
      },
    ],
    faqs: [
      {
        question: "¿Melanotan II es legal?",
        answer:
          "No. Melanotan II está prohibido para venta como producto de consumo en la mayoría de los países. La TGA (Australia) y MHRA (Reino Unido) emitieron alertas contra su uso. Las agencias reguladoras no lo aprueban. Los productos vendidos en línea operan ilegalmente.",
      },
      {
        question: "¿Cuál es la diferencia entre Melanotan II y PT-141?",
        answer:
          "El PT-141 (bremelanotida/Vyleesi) fue desarrollado a partir del Melanotan II, pero modificado para actuar predominantemente sobre el receptor MC4R (función sexual) con menor efecto sobre MC1R (melanina). El PT-141 está aprobado por la FDA; el Melanotan II no está aprobado en ningún país.",
      },
    ],
  },

  metformina: {
    description:
      "IMPORTANTE: La metformina no es un péptido, es una biguanida derivada de la planta Galega officinalis. Es el medicamento de primera línea para diabetes tipo 2 desde hace décadas, con miles de millones de prescripciones. Ganó enorme atención en longevidad después de que estudios sugirieran que los diabéticos que toman metformina viven más que los no diabéticos. El estudio TAME está probando si prolonga la vida humana saludable.",
    mechanism:
      "La metformina activa AMPK (sensor energético celular), inhibe la gluconeogénesis hepática, mejora la sensibilidad a la insulina y tiene efectos directos sobre la microbiota intestinal. Los mecanismos adicionales incluyen reducción de la inflamación sistémica, modulación de mTOR y un potencial efecto directo en vías del envejecimiento.",
    benefits: [
      {
        name: "Diabetes tipo 2",
        description:
          "Tratamiento de primera línea desde hace décadas. Reduce HbA1c en 1-2%, con perfil de seguridad excelente y bajo costo.",
      },
      {
        name: "Prevención de diabetes",
        description:
          "El estudio DPP demostró reducción de 31% en la incidencia de diabetes en personas prediabéticas tratadas con metformina.",
      },
      {
        name: "Posible efecto anticancerígeno",
        description:
          "Estudios observacionales sugieren que los diabéticos con metformina tienen menor incidencia de varios tipos de cáncer. El mecanismo aún está en investigación.",
      },
      {
        name: "Longevidad",
        description:
          "Estudios epidemiológicos sugieren que los diabéticos con metformina viven más que los no diabéticos. El estudio TAME (en curso) probará si la metformina retrasa el envejecimiento en humanos no diabéticos.",
      },
    ],
    risks: [
      {
        name: "Malestar gastrointestinal",
        frequency: "20-30%",
        description:
          "Náuseas, diarrea y malestar abdominal son comunes, especialmente al inicio. Generalmente disminuye con el tiempo. La versión XR (liberación prolongada) es mejor tolerada.",
      },
      {
        name: "Deficiencia de B12",
        frequency: "Uso a largo plazo",
        description:
          "El uso prolongado puede reducir la absorción de vitamina B12. Se recomienda suplementación periódica.",
      },
      {
        name: "Acidosis láctica (raro)",
        frequency: "Muy raro",
        description:
          "Complicación rara pero grave, especialmente en pacientes con insuficiencia renal. Contraindicada en insuficiencia renal severa.",
      },
    ],
    internetVsScience: [
      {
        claim: "Píldora anti-aging para todos",
        whatTheySay:
          "Toda persona mayor de 40 debería tomar metformina para envejecer más lento.",
        actualEvidence:
          "La evidencia de longevidad proviene de estudios observacionales en diabéticos, no en personas sanas. Estudios en atletas sanos sugieren que la metformina puede de hecho reducir los beneficios del ejercicio. El estudio TAME en curso responderá esta pregunta.",
      },
      {
        claim: "Reduce los beneficios del ejercicio",
        whatTheySay:
          "La metformina cancela las ganancias de fuerza y la adaptación al ejercicio.",
        actualEvidence:
          "Verdadero en estudios. En adultos no diabéticos sanos, la metformina atenuó las ganancias en fuerza y aptitud cardiorrespiratoria inducidas por entrenamiento. Para atletas, puede ser contraproducente.",
      },
    ],
    faqs: [
      {
        question: "¿Puedo tomar metformina sin ser diabético?",
        answer:
          "La metformina requiere prescripción médica. El uso off-label para longevidad o prediabetes es una decisión entre paciente y médico. El estudio TAME (en curso) probará si la metformina prolonga la vida saludable en no diabéticos.",
      },
    ],
  },

  nac: {
    description:
      "IMPORTANTE: NAC no es un péptido, es un derivado de aminoácido (cisteína acetilada). Es un precursor del glutatión, el principal antioxidante endógeno del organismo. Uso médico establecido como mucolítico (expectorante) y antídoto para intoxicación por paracetamol. Popularizado en el biohacking por su potencial antioxidante y antiinflamatorio.",
    mechanism:
      "NAC se convierte en cisteína en el organismo, que es el aminoácido limitante para la síntesis de glutatión (GSH). El glutatión es el principal antioxidante intracelular, neutralizando radicales libres y protegiendo las células del estrés oxidativo. NAC también tiene propiedades mucolíticas (rompe enlaces del moco) y modula vías inflamatorias.",
    benefits: [
      {
        name: "Antídoto para paracetamol",
        description:
          "Tratamiento estándar para sobredosis de paracetamol/acetaminofén. Salva vidas cuando se administra precozmente.",
      },
      {
        name: "Mucolítico",
        description:
          "Aprobado y ampliamente usado para fluidificar secreciones pulmonares en EPOC, fibrosis quística y bronquitis crónica.",
      },
      {
        name: "Salud mental",
        description:
          "Múltiples estudios clínicos muestran beneficios en trastorno obsesivo-compulsivo, trastorno bipolar y tricotilomanía.",
      },
      {
        name: "Salud reproductiva masculina",
        description:
          "Estudios muestran mejora en la calidad espermática y la fertilidad masculina.",
      },
    ],
    risks: [
      {
        name: "Náuseas y malestar gastrointestinal",
        frequency: "Común",
        description:
          "Efecto secundario más común, especialmente en dosis altas. Tomarlo con alimentos ayuda.",
      },
      {
        name: "Sabor y olor desagradables",
        frequency: "Universal",
        description:
          "NAC tiene un sabor sulfuroso característico (olor a huevo podrido). Las cápsulas y sobres lo solucionan.",
      },
    ],
    internetVsScience: [
      {
        claim: "Cura el long COVID",
        whatTheySay:
          "NAC cura síntomas post-COVID y fatiga crónica.",
        actualEvidence:
          "Algunos estudios pequeños sugieren beneficios sintomáticos, pero la evidencia aún es limitada y no concluyente. NAC no 'cura' el long COVID.",
      },
      {
        claim: "Desintoxica el cuerpo de metales pesados",
        whatTheySay:
          "NAC elimina mercurio y metales pesados del organismo.",
        actualEvidence:
          "Tiene propiedades quelantes leves, pero no es el tratamiento de primera línea para intoxicación por metales pesados. El uso para 'detox' no está validado científicamente.",
      },
    ],
    faqs: [
      {
        question: "¿Puedo comprar NAC sin receta?",
        answer:
          "Depende del país. NAC se vende sin prescripción médica en muchos países bajo nombres como Fluimucil, NAC y otros. Es ampliamente usado como mucolítico. Verifique la regulación local.",
      },
    ],
  },

  nmn: {
    description:
      "IMPORTANTE: NMN no es un péptido, es un nucleótido — precursor directo del NAD+ (nicotinamida adenina dinucleótido), una coenzima esencial para el metabolismo celular. Listado en esta base por estar frecuentemente asociado al mercado de longevidad. Los niveles de NAD+ caen con la edad, y NMN se investiga para revertir ese declive.",
    mechanism:
      "NMN se convierte en NAD+ en el organismo vía la enzima NMNAT. NAD+ es un cofactor esencial para enzimas involucradas en la producción de energía mitocondrial, reparación de ADN, activación de sirtuinas (proteínas asociadas a la longevidad) y regulación del metabolismo. La teoría es que aumentar NAD+ puede contrarregular el declive metabólico del envejecimiento.",
    benefits: [
      {
        name: "Aumento de los niveles de NAD+",
        description:
          "Estudios clínicos confirman que NMN oral aumenta significativamente los niveles sanguíneos de NAD+ en humanos.",
      },
      {
        name: "Sensibilidad a la insulina",
        description:
          "Un estudio clínico en mujeres posmenopáusicas prediabéticas mostró mejora de la sensibilidad a la insulina muscular después de 10 semanas.",
      },
      {
        name: "Rendimiento físico",
        description:
          "Estudios en humanos muestran una modesta mejoría en la capacidad aeróbica y la función muscular en adultos de mediana edad.",
      },
      {
        name: "Anti-aging",
        description:
          "Estudios en ratones muestran efectos anti-envejecimiento prometedores, pero la traducción a humanos aún no ha sido demostrada en ensayos clínicos prolongados.",
      },
    ],
    risks: [
      {
        name: "Estatus regulatorio en EE.UU.",
        frequency: "N/A",
        description:
          "En 2022, la FDA reclasificó NMN como medicamento experimental (no suplemento), prohibiendo su venta como suplemento alimentario en EE.UU. El estatus legal en otros países varía.",
      },
      {
        name: "Pureza variable",
        frequency: "Variable",
        description:
          "Análisis independientes mostraron que muchos productos comerciales de NMN tienen pureza significativamente menor a la declarada en la etiqueta.",
      },
    ],
    internetVsScience: [
      {
        claim: "Revierte el envejecimiento",
        whatTheySay:
          "NMN es la fuente de la juventud — lo tomas y tu cuerpo rejuvenece años.",
        actualEvidence:
          "Aumenta NAD+ comprobadamente, pero 'revertir el envejecimiento' es exagerado. Los estudios en humanos muestran beneficios modestos en algunos marcadores. Los efectos a largo plazo en la longevidad humana son desconocidos.",
      },
      {
        claim: "Es un péptido",
        whatTheySay:
          "Frecuentemente vendido junto con péptidos en el mercado de biohacking.",
        actualEvidence:
          "NMN es un nucleótido, no un péptido. Los péptidos son cadenas de aminoácidos; los nucleótidos son compuestos de una base nitrogenada, azúcar y fosfato.",
      },
    ],
    faqs: [
      {
        question: "¿NMN es legal?",
        answer:
          "El estatus regulatorio varía según el país. En EE.UU., NMN fue reclasificado como medicamento experimental. En muchos otros países se vende como suplemento alimentario. Verifique la regulación local y la procedencia y pureza del producto.",
      },
    ],
  },

  "nr-nicotinamide-riboside": {
    description:
      "IMPORTANTE: NR no es un péptido, es un nucleósido — otro precursor del NAD+, similar al NMN pero con perfil regulatorio y biodisponibilidad ligeramente diferentes. Comercializado como Niagen por ChromaDex, es el precursor de NAD+ con más estudios clínicos publicados.",
    mechanism:
      "NR se convierte en NMN y luego en NAD+ vía la vía de salvamento. A diferencia del NMN, NR atraviesa la membrana celular más fácilmente y tiene más datos de farmacocinética en humanos. Aumenta NAD+ en sangre y tejidos, activando sirtuinas y mejorando la función mitocondrial.",
    benefits: [
      {
        name: "Aumento de NAD+ comprobado",
        description:
          "Múltiples ensayos clínicos confirman que NR oral aumenta NAD+ en sangre y tejidos en humanos.",
      },
      {
        name: "Función cardiovascular",
        description:
          "Estudios clínicos muestran reducción de la presión arterial sistólica y mejora de la rigidez arterial en adultos de mediana edad.",
      },
      {
        name: "Salud metabólica",
        description:
          "Estudios sugieren beneficios en la sensibilidad a la insulina y marcadores de salud metabólica.",
      },
    ],
    risks: [
      {
        name: "Eventos adversos leves",
        frequency: "Infrecuente",
        description:
          "Náuseas, fatiga y dolor de cabeza reportados en algunos estudios clínicos. Generalmente leves.",
      },
    ],
    internetVsScience: [
      {
        claim: "Mejor que NMN",
        whatTheySay:
          "NR es superior a NMN porque tiene más estudios clínicos.",
        actualEvidence:
          "NR tiene más estudios publicados que NMN, pero eso no significa que sea necesariamente 'mejor'. Las comparaciones directas entre NR y NMN aún son limitadas. Ambos aumentan NAD+ en humanos.",
      },
    ],
    faqs: [],
  },

  orforglipron: {
    description:
      "Orforglipron (Foundayo) es el primer agonista oral de GLP-1 en formato de molécula pequeña aprobado por la FDA. A diferencia de los péptidos inyectables como semaglutida y tirzepatida, el orforglipron es un comprimido que se toma una vez al día, sin restricciones alimentarias ni de ingesta de agua. Desarrollado por Eli Lilly, representa un cambio de paradigma en el tratamiento de la obesidad y la diabetes tipo 2, eliminando la necesidad de inyecciones subcutáneas.",
    mechanism:
      "El orforglipron es una molécula pequeña no peptídica que activa el receptor de GLP-1 de forma similar a los agonistas peptídicos inyectables. Al unirse al receptor GLP-1 en el páncreas, estimula la secreción de insulina dependiente de glucosa y suprime la liberación de glucagón. En el sistema nervioso central, actúa en los centros de saciedad del hipotálamo, reduciendo el apetito y la ingesta calórica. Por ser una molécula pequeña y no un péptido, resiste la degradación en el tracto gastrointestinal, permitiendo una absorción oral eficaz sin necesidad de ayuno ni restricciones hídricas — una ventaja significativa sobre el Rybelsus (semaglutida oral), que requiere ayuno de 30 minutos.",
    benefits: [
      {
        name: "Pérdida de peso significativa",
        description:
          "En los estudios ACHIEVE, los participantes sin diabetes perdieron en promedio 14-15% del peso corporal en 36-72 semanas. Resultados comparables a agonistas GLP-1 inyectables.",
      },
      {
        name: "Control glucémico robusto",
        description:
          "En pacientes con diabetes tipo 2, redujo HbA1c hasta 2,1% en 26 semanas. Eficacia comparable a la semaglutida inyectable en el control de la glucemia.",
      },
      {
        name: "Conveniencia de la administración oral",
        description:
          "Comprimido oral una vez al día, sin necesidad de ayuno, restricciones de agua ni posición erguida después de la ingesta. Elimina la barrera de las inyecciones, factor limitante para muchos pacientes.",
      },
      {
        name: "Potencial beneficio cardiovascular",
        description:
          "Estudios de desenlaces cardiovasculares en curso. La pérdida de peso y la mejora metabólica sugieren beneficios cardiovasculares, pero los datos definitivos aún se están recopilando.",
      },
    ],
    risks: [
      {
        name: "Náuseas",
        frequency: "30-40% de los pacientes",
        description:
          "Efecto secundario más común, especialmente durante la titulación de dosis. Generalmente leve a moderado y transitorio, disminuye después de las primeras semanas de tratamiento.",
      },
      {
        name: "Diarrea",
        frequency: "15-20% de los pacientes",
        description:
          "Segundo efecto gastrointestinal más frecuente. Generalmente autolimitado y controlable con ajustes alimentarios.",
      },
      {
        name: "Estreñimiento",
        frequency: "10-15% de los pacientes",
        description:
          "Efecto secundario gastrointestinal común a agonistas GLP-1. La hidratación adecuada y las fibras dietéticas ayudan en el manejo.",
      },
      {
        name: "Eventos biliares",
        frequency: "Raro (<2%)",
        description:
          "Colelitiasis (cálculos biliares) reportada en un pequeño porcentaje de pacientes, asociada a la pérdida de peso rápida. Se recomienda monitoreo en pacientes con historial de enfermedad biliar.",
      },
    ],
    internetVsScience: [
      {
        claim: "Orforglipron es tan eficaz como Ozempic inyectable",
        whatTheySay:
          "Un simple comprimido logra los mismos resultados que una inyección semanal de semaglutida.",
        actualEvidence:
          "En los estudios ACHIEVE, la pérdida de peso con orforglipron (~14-15%) fue ligeramente inferior a la de semaglutida 2,4 mg inyectable (~16%). Para el control glucémico, los resultados son comparables. La conveniencia oral puede compensar la diferencia modesta de eficacia para muchos pacientes.",
      },
      {
        claim: "No tiene efectos secundarios por ser comprimido",
        whatTheySay:
          "Por ser oral y no inyectable, el orforglipron tiene menos efectos secundarios que Ozempic y Mounjaro.",
        actualEvidence:
          "Los efectos secundarios gastrointestinales (náuseas, diarrea, vómitos) son similares a los de los agonistas GLP-1 inyectables. La vía de administración es diferente, pero el mecanismo de acción es el mismo, resultando en un perfil de efectos adversos similar.",
      },
      {
        claim: "Va a reemplazar todos los inyectables",
        whatTheySay:
          "Con la aprobación del orforglipron, nadie más va a necesitar Ozempic o Mounjaro inyectable.",
        actualEvidence:
          "Orforglipron es una excelente opción para quienes prefieren la vía oral, pero los inyectables de nueva generación (tirzepatida, retatrutida) demuestran pérdida de peso superior (20-24%). Los pacientes que necesitan la máxima eficacia aún pueden preferir inyectables. Además, la adherencia oral diaria puede ser menor que la inyección semanal para algunos perfiles de pacientes.",
      },
      {
        claim: "Es seguro comprar genéricos importados en línea",
        whatTheySay:
          "Ya existen versiones genéricas del orforglipron disponibles en farmacias online internacionales.",
        actualEvidence:
          "Orforglipron (Foundayo) fue aprobado por la FDA en mayo de 2026. Los productos vendidos en línea sin prescripción y sin regulación local no tienen garantía de autenticidad, pureza ni dosificación. Siempre consulte a un médico y adquiera solo en canales regulados.",
      },
    ],
    faqs: [
      {
        question: "¿El orforglipron es un péptido?",
        answer:
          "No. A diferencia de semaglutida, tirzepatida y otros agonistas GLP-1, el orforglipron es una molécula pequeña sintética (no peptídica). Esto permite que se absorba por vía oral sin ser destruido por el sistema digestivo, dispensando inyecciones.",
      },
      {
        question: "¿Necesito tomarlo en ayunas como el Rybelsus?",
        answer:
          "No. Una de las grandes ventajas del orforglipron es que puede tomarse en cualquier momento, sin restricciones de ayuno, ingesta de agua ni posición corporal. El Rybelsus (semaglutida oral) exige ayuno de 30 minutos y un vaso de agua limitado, lo que dificulta la adherencia.",
      },
      {
        question: "¿Cuándo estará disponible Foundayo en Latinoamérica?",
        answer:
          "Orforglipron (Foundayo) fue aprobado por la FDA en EE.UU. en mayo de 2026. Eli Lilly aún no ha presentado la solicitud de registro en todos los países latinoamericanos. Con base en precedentes, el proceso regulatorio puede tomar de 12 a 24 meses después de la presentación. Previsión optimista: 2028.",
      },
      {
        question: "¿Es mejor que Ozempic y Mounjaro?",
        answer:
          "Depende del criterio. En eficacia pura de pérdida de peso, los inyectables de última generación (tirzepatida ~21%, retatrutida ~24%) superan al orforglipron (~14-15%). Sin embargo, para pacientes que no aceptan inyecciones o prefieren la practicidad de un comprimido diario, el orforglipron es una opción transformadora. Consulte con su médico el perfil más adecuado.",
      },
      {
        question: "¿Cuáles son los efectos secundarios más comunes?",
        answer:
          "Los principales efectos adversos son gastrointestinales: náuseas (30-40%), diarrea (15-20%) y estreñimiento (10-15%). Estos efectos son más intensos al inicio del tratamiento y durante la titulación de dosis, tendiendo a disminuir con el tiempo. La titulación gradual es fundamental para minimizar las molestias.",
      },
    ],
  },

  "pt-141": {
    description:
      "Péptido agonista del receptor de melanocortina MC4R, aprobado por la FDA para el tratamiento del Trastorno del Deseo Sexual Hipoactivo (HSDD) en mujeres premenopáusicas. Único medicamento aprobado que actúa en el sistema nervioso central para aumentar el deseo sexual.",
    mechanism:
      "PT-141 (bremelanotida) activa el receptor de melanocortina MC4R en el sistema nervioso central, específicamente en áreas del hipotálamo asociadas a la respuesta sexual. A diferencia de medicamentos como sildenafilo (Viagra), que actúa en el flujo sanguíneo, PT-141 actúa directamente en los circuitos cerebrales del deseo sexual.",
    benefits: [
      {
        name: "Tratamiento de HSDD en mujeres",
        description:
          "Los estudios RECONNECT (fase 3) demostraron un aumento significativo en el deseo sexual y reducción del distrés en mujeres con HSDD. Aprobado por la FDA en 2019.",
      },
      {
        name: "Disfunción eréctil en hombres",
        description:
          "Estudios de fase 2 mostraron eficacia en disfunción eréctil masculina, pero el desarrollo fue discontinuado en favor del mercado femenino.",
      },
    ],
    risks: [
      {
        name: "Náuseas",
        frequency: "40% de los pacientes",
        description:
          "Efecto secundario más común. Puede ser significativo y es motivo de discontinuación en algunos pacientes.",
      },
      {
        name: "Aumento de la presión arterial",
        frequency: "Transitorio",
        description:
          "Eleva la presión arterial transitoriamente. Contraindicado en hipertensión no controlada y enfermedad cardiovascular.",
      },
      {
        name: "Hiperpigmentación",
        frequency: "Infrecuente",
        description:
          "Puede causar oscurecimiento de la piel en áreas expuestas, debido a la activación de receptores de melanocortina en la piel.",
      },
    ],
    internetVsScience: [
      {
        claim: "Viagra femenino",
        whatTheySay:
          "PT-141 es el Viagra para mujeres — lo tomas y se resuelve.",
        actualEvidence:
          "Aprobado por la FDA para HSDD femenino, pero el mecanismo es completamente diferente al del Viagra. Actúa en el cerebro (deseo) y no en el flujo sanguíneo (erección). La eficacia es modesta — NNT de ~8 (se necesita tratar 8 mujeres para que 1 tenga beneficio clínicamente significativo). Efectos secundarios significativos.",
      },
    ],
    faqs: [
      {
        question: "¿PT-141 está aprobado en Latinoamérica?",
        answer:
          "El Vyleesi (bremelanotida) no está registrado en la mayoría de las agencias reguladoras latinoamericanas. En EE.UU., está aprobado por la FDA desde 2019 para HSDD en mujeres premenopáusicas. Se administra vía inyección subcutánea autoaplicable.",
      },
    ],
  },

  rapamicina: {
    description:
      "IMPORTANTE: La rapamicina no es un péptido, es un macrólido (compuesto natural producido por la bacteria Streptomyces hygroscopicus, descubierta en suelo de la Isla de Pascua — Rapa Nui). Originalmente desarrollada como inmunosupresor para trasplantes, es hoy la sustancia más prometedora en investigación de longevidad — única droga consistentemente comprobada en prolongar la vida en mamíferos.",
    mechanism:
      "La rapamicina inhibe la proteína mTOR (mechanistic Target Of Rapamycin), un regulador central del crecimiento celular, metabolismo y autofagia. La inhibición parcial de mTOR activa la autofagia (reciclaje celular), mimetiza los efectos del ayuno y la restricción calórica, y tiene efectos anti-envejecimiento en múltiples tejidos.",
    benefits: [
      {
        name: "Aumento de longevidad en mamíferos",
        description:
          "Único compuesto consistentemente comprobado en aumentar el tiempo de vida en ratones, ratas y otros modelos animales. Aumento de 9-26% en el tiempo de vida en ratones.",
      },
      {
        name: "Inmunosupresión (uso aprobado)",
        description:
          "Aprobada para prevención de rechazo en trasplantes de órganos. Único uso oficialmente aprobado.",
      },
      {
        name: "Función inmune en adultos mayores",
        description:
          "El estudio PEARL y otros mostraron que dosis bajas intermitentes mejoran la respuesta inmune a vacunas en adultos mayores sin causar inmunosupresión significativa.",
      },
      {
        name: "Longevidad humana",
        description:
          "A pesar de la evidencia en animales, el efecto sobre la longevidad humana aún no ha sido demostrado en ensayos clínicos. Estudios en curso.",
      },
    ],
    risks: [
      {
        name: "Inmunosupresión",
        frequency: "Dosis-dependiente",
        description:
          "En dosis continuas (trasplantes), suprime el sistema inmune, aumentando el riesgo de infecciones y cáncer. Las dosis bajas intermitentes para longevidad tienen menor riesgo, pero no desconocido.",
      },
      {
        name: "Trastornos metabólicos",
        frequency: "Común",
        description:
          "Puede causar resistencia a la insulina, dislipidemia e intolerancia a la glucosa, paradójicamente aumentando el riesgo de diabetes.",
      },
      {
        name: "Aftas y mucositis",
        frequency: "30%",
        description:
          "Las úlceras orales son un efecto secundario común, incluso en dosis bajas.",
      },
      {
        name: "Uso off-label",
        frequency: "N/A",
        description:
          "El uso para longevidad es off-label (fuera de la indicación aprobada). Requiere prescripción médica y seguimiento. No se vende sin receta.",
      },
    ],
    internetVsScience: [
      {
        claim: "Píldora de la longevidad",
        whatTheySay:
          "La rapamicina es la píldora que prolonga la vida — aprobada por médicos de longevidad.",
        actualEvidence:
          "Es el compuesto más prometedor en investigación de longevidad animal, con evidencia sólida en ratones. Pero la evidencia en humanos aún es limitada y hay riesgos reales. No es una 'píldora de la juventud' libre de consecuencias.",
      },
    ],
    faqs: [
      {
        question: "¿Cómo conseguir rapamicina para longevidad?",
        answer:
          "La rapamicina (Rapamune, sirolimus) es un medicamento controlado, aprobado para inmunosupresión en trasplantes. El uso para longevidad es off-label y requiere prescripción médica. Solo algunos médicos especializados en longevidad la prescriben.",
      },
    ],
  },

  resveratrol: {
    description:
      "IMPORTANTE: El resveratrol no es un péptido, es un polifenol natural encontrado en uvas rojas, vino tinto, cacahuetes y algunas frutas. Ganó fama en los años 2000 cuando estudios en ratones sugirieron que activaba sirtuinas (proteínas asociadas a la longevidad). Es uno de los compuestos más estudiados en investigación de envejecimiento.",
    mechanism:
      "El resveratrol activa SIRT1, una de las sirtuinas asociadas a la longevidad. Mimetiza algunos efectos de la restricción calórica. Tiene propiedades antioxidantes, antiinflamatorias y mejora la función mitocondrial. Atraviesa la barrera hematoencefálica y alcanza múltiples tejidos.",
    benefits: [
      {
        name: "Salud cardiovascular",
        description:
          "Estudios clínicos muestran mejora modesta en función endotelial, presión arterial y marcadores inflamatorios.",
      },
      {
        name: "Sensibilidad a la insulina",
        description:
          "Los metaanálisis sugieren mejora modesta en el control glucémico en pacientes con diabetes tipo 2.",
      },
      {
        name: "Antiinflamatorio",
        description:
          "Reduce marcadores inflamatorios sistémicos en varios estudios clínicos.",
      },
      {
        name: "Longevidad humana",
        description:
          "Estudios en ratones sugirieron aumento de longevidad, pero el efecto no fue replicado en otros estudios animales. Sin evidencia de longevidad aumentada en humanos.",
      },
    ],
    risks: [
      {
        name: "Biodisponibilidad muy baja",
        frequency: "Universal",
        description:
          "El resveratrol es rápidamente metabolizado y tiene biodisponibilidad oral muy baja, planteando cuestionamientos sobre su eficacia en dosis comerciales.",
      },
      {
        name: "Interacciones medicamentosas",
        frequency: "Variable",
        description:
          "Puede interactuar con anticoagulantes y medicamentos metabolizados por el citocromo P450.",
      },
    ],
    internetVsScience: [
      {
        claim: "Beber vino tinto te da los beneficios del resveratrol",
        whatTheySay:
          "El vino tinto es saludable por el resveratrol.",
        actualEvidence:
          "La cantidad de resveratrol en el vino tinto es tan pequeña que necesitarías beber cientos de botellas por día para alcanzar las dosis estudiadas. Los posibles beneficios cardiovasculares del vino tinto provienen de otros compuestos (y el alcohol tiene riesgos).",
      },
      {
        claim: "Activador de sirtuinas que revierte el envejecimiento",
        whatTheySay:
          "El resveratrol activa sirtuinas y revierte el envejecimiento (popularizado por David Sinclair).",
        actualEvidence:
          "Activa SIRT1 in vitro. En humanos, los beneficios son modestos y el efecto sobre longevidad nunca ha sido demostrado. Los estudios en ratones fueron inconsistentes.",
      },
    ],
    faqs: [],
  },

  retatrutida: {
    description:
      "Agonista triple de los receptores GIP, GLP-1 y glucagón desarrollado por Eli Lilly. Es el primero de su clase en actuar sobre los tres receptores simultáneamente, resultando en una pérdida de peso superior a cualquier otro medicamento en estudios clínicos hasta la fecha — hasta 24% del peso corporal en 48 semanas.",
    mechanism:
      "La retatrutida activa tres receptores hormonales simultáneamente: GLP-1 (suprime el apetito y estimula la insulina), GIP (potencia el efecto del GLP-1 y mejora el metabolismo lipídico) y glucagón (aumenta el gasto energético y promueve la lipólisis hepática). Esta acción triple crea un efecto sinérgico: el GLP-1 reduce la ingesta calórica, el glucagón acelera la quema de grasa y el GIP amplifica ambos efectos. El resultado es una pérdida de peso significativamente mayor que los agonistas simples (semaglutida) o duales (tirzepatida).",
    benefits: [
      {
        name: "Pérdida de peso récord",
        description:
          "En el estudio TRIUMPH-2, los participantes perdieron hasta 24,2% del peso corporal en 48 semanas con la dosis de 12 mg — la mayor pérdida de peso jamás registrada en ensayos clínicos para obesidad.",
      },
      {
        name: "Reducción de grasa hepática (MASLD/NASH)",
        description:
          "Redujo la grasa hepática hasta 86% en pacientes con esteatosis hepática. El 93% de los pacientes alcanzó resolución completa de la esteatosis en la dosis más alta.",
      },
      {
        name: "Mejora de la apnea obstructiva del sueño",
        description:
          "Estudios fase 3 en curso (TRIUMPH-3) investigan eficacia en apnea del sueño asociada a obesidad. Resultados preliminares positivos por la reducción significativa de peso.",
      },
      {
        name: "Control glucémico en diabetes tipo 2",
        description:
          "Redujo HbA1c hasta 2,2% en 36 semanas en el estudio TRIUMPH-1, con 78% de los pacientes alcanzando HbA1c < 5,7% (rango no diabético).",
      },
      {
        name: "Mejora del perfil lipídico",
        description:
          "Reducción significativa de triglicéridos (-30 a -50%), LDL y VLDL. Aumento modesto de HDL. Beneficio cardiovascular en investigación.",
      },
    ],
    risks: [
      {
        name: "Náuseas",
        frequency: "43-50% de los pacientes",
        description:
          "Efecto secundario más frecuente, principalmente durante la titulación. Generalmente transitorio y disminuye después de las primeras semanas en cada dosis.",
      },
      {
        name: "Diarrea",
        frequency: "25-35% de los pacientes",
        description:
          "Segundo efecto gastrointestinal más común. Generalmente leve a moderado, se resuelve espontáneamente.",
      },
      {
        name: "Vómitos",
        frequency: "15-20% de los pacientes",
        description:
          "Más común en las fases de titulación. Reducido con titulación lenta y comidas más pequeñas.",
      },
      {
        name: "Aumento de la frecuencia cardíaca",
        frequency: "~10% de los pacientes",
        description:
          "Aumento promedio de 2-4 lpm observado en los estudios. Efecto del componente glucagón. La significancia clínica aún se está evaluando en estudios de desenlaces cardiovasculares.",
      },
      {
        name: "Pancreatitis",
        frequency: "Raro (<1%)",
        description:
          "Riesgo de clase de los agonistas GLP-1. Casos raros reportados. Suspender inmediatamente si hay dolor abdominal severo persistente.",
      },
      {
        name: "Pérdida de masa muscular",
        frequency: "Común con pérdida de peso rápida",
        description:
          "La pérdida de peso acentuada puede incluir masa magra. Se recomienda ejercicio de resistencia e ingesta proteica adecuada para mitigar.",
      },
    ],
    internetVsScience: [
      {
        claim: "Retatrutida hace perder 25% del peso",
        whatTheySay:
          "Es el adelgazante más potente jamás creado, casi tan eficaz como la cirugía bariátrica.",
        actualEvidence:
          "La pérdida máxima promedio fue de 24,2% en 48 semanas (dosis 12 mg). Es de hecho la mayor pérdida de peso en ensayos clínicos, pero los resultados individuales varían (5-35%). La cirugía bariátrica resulta en ~25-30% de pérdida, por lo que la comparación es plausible.",
      },
      {
        claim: "Es mejor que Ozempic y Mounjaro",
        whatTheySay:
          "Retatrutida es claramente superior a semaglutida y tirzepatida porque actúa en 3 receptores.",
        actualEvidence:
          "En estudios no comparativos (head-to-head), la pérdida de peso con retatrutida 12 mg (~24%) superó los resultados históricos de semaglutida 2,4 mg (~16%) y tirzepatida 15 mg (~21%). Sin embargo, no hay estudio comparativo directo (head-to-head). La comparación entre estudios diferentes tiene limitaciones metodológicas.",
      },
      {
        claim: "Ya está disponible para comprar",
        whatTheySay:
          "Se puede comprar retatrutida en farmacias magistrales o proveedores de investigación.",
        actualEvidence:
          "Retatrutida aún está en fase 3 de ensayos clínicos. NO ha sido aprobada por la FDA, EMA ni otras agencias. Cualquier venta es ilegal y no regulada. Los productos vendidos como 'retatrutide research chemical' no tienen garantía de pureza ni dosificación.",
      },
      {
        claim: "Cura diabetes y esteatosis hepática",
        whatTheySay:
          "Retatrutida revierte completamente la diabetes tipo 2 y elimina la grasa del hígado.",
        actualEvidence:
          "Los datos son impresionantes: 78% de los pacientes con DM2 alcanzaron HbA1c no diabética, y 93% tuvieron resolución de la esteatosis hepática. Pero 'cura' es impreciso — los efectos dependen del uso continuo. No hay datos a largo plazo sobre durabilidad después de la discontinuación.",
      },
    ],
    faqs: [
      {
        question: "¿Cuándo será aprobada la retatrutida?",
        answer:
          "Eli Lilly está conduciendo estudios fase 3 (programa TRIUMPH) con resultados esperados entre 2025-2026. La presentación a la FDA probablemente ocurrirá en 2026, con aprobación posible en 2027. En Latinoamérica, la aprobación por las agencias reguladoras generalmente toma 12-18 meses adicionales después de la FDA.",
      },
      {
        question:
          "¿Cuál es la diferencia entre retatrutida, semaglutida y tirzepatida?",
        answer:
          "Semaglutida (Ozempic) actúa en 1 receptor (GLP-1). Tirzepatida (Mounjaro) actúa en 2 receptores (GIP + GLP-1). Retatrutida actúa en 3 receptores (GIP + GLP-1 + glucagón). Cada receptor adicional potencia el efecto: ~16% de pérdida de peso con semaglutida, ~21% con tirzepatida, ~24% con retatrutida.",
      },
      {
        question: "¿Puedo comprar retatrutida ahora?",
        answer:
          "No. Retatrutida está en fase experimental y NO ha sido aprobada por ninguna agencia reguladora (FDA, EMA). Cualquier producto vendido como retatrutida no está regulado, no tiene garantía de pureza y es potencialmente peligroso. Espere la conclusión de los ensayos clínicos y la aprobación regulatoria.",
      },
      {
        question:
          "¿Los efectos secundarios son peores que los del Ozempic?",
        answer:
          "Los efectos gastrointestinales (náuseas, diarrea, vómitos) parecen similares o ligeramente más frecuentes que semaglutida en los estudios fase 2. El componente glucagón puede causar un aumento leve de la frecuencia cardíaca (~2-4 lpm). La titulación gradual es esencial para la tolerabilidad. Los datos de seguridad a largo plazo aún se están recopilando en los estudios fase 3.",
      },
      {
        question: "¿Retatrutida sirve para diabetes tipo 2?",
        answer:
          "Sí, los resultados son muy prometedores. En el estudio TRIUMPH-1, 78% de los pacientes alcanzaron HbA1c < 5,7% (rango no diabético) con la dosis más alta. Eli Lilly está desarrollando retatrutida tanto para obesidad como para diabetes tipo 2.",
      },
    ],
  },

  "ss-31": {
    description:
      "Péptido mitocondrial que penetra directamente en la membrana interna de la mitocondria, estabilizando la cardiolipina y restaurando la producción de energía celular. Uno de los péptidos más investigados para enfermedades mitocondriales y envejecimiento celular.",
    mechanism:
      "SS-31 es un tetrapéptido (D-Arg-Dmt-Lys-Phe-NH2) que se concentra selectivamente en la membrana interna mitocondrial, uniéndose a la cardiolipina. Esta interacción estabiliza la cadena de transporte de electrones, reduce la producción de especies reactivas de oxígeno (ROS) y restaura la bioenergética celular. A diferencia de los antioxidantes convencionales, actúa directamente en la fuente del estrés oxidativo.",
    benefits: [
      {
        name: "Protección mitocondrial",
        description:
          "Múltiples estudios clínicos demuestran mejora en la función mitocondrial. Reduce el estrés oxidativo directamente en la fuente (mitocondria).",
      },
      {
        name: "Cardioprotección",
        description:
          "Estudios de fase 2 en insuficiencia cardíaca (EMBRACE) mostraron mejora en la función ventricular. Fase 3 (PROGRESS-HF) no alcanzó el endpoint primario pero mostró señales positivas.",
      },
      {
        name: "Anti-aging celular",
        description:
          "Estudios en modelos animales demuestran reversión de la disfunción mitocondrial asociada al envejecimiento. Mejora la función renal, cardíaca y muscular en animales envejecidos.",
      },
    ],
    risks: [
      {
        name: "Reacción en el sitio de inyección",
        frequency: "Común",
        description:
          "Dolor, enrojecimiento o hinchazón en el sitio de la inyección subcutánea. Generalmente leve.",
      },
      {
        name: "Eficacia clínica incierta",
        frequency: "N/A",
        description:
          "El estudio de fase 3 PROGRESS-HF para insuficiencia cardíaca no alcanzó el endpoint primario, planteando cuestionamientos sobre la eficacia clínica traslacional.",
      },
    ],
    internetVsScience: [
      {
        claim: "Revierte el envejecimiento celular",
        whatTheySay:
          "Promocionado como el péptido anti-aging más potente que existe, capaz de revertir décadas de daño mitocondrial.",
        actualEvidence:
          "Demuestra protección mitocondrial real en estudios, pero 'revertir el envejecimiento' es exagerado. Mejora la función mitocondrial en modelos animales envejecidos, pero los resultados clínicos en humanos son mixtos.",
      },
    ],
    faqs: [
      {
        question: "¿SS-31 está aprobado para alguna condición?",
        answer:
          "No. El elamipretide (SS-31) está en desarrollo clínico por Stealth BioTherapeutics. Recibió designación de droga huérfana para Síndrome de Barth y miopatía mitocondrial primaria, pero aún no tiene aprobación regulatoria en ningún país.",
      },
    ],
  },

  selank: {
    description:
      "Péptido ansiolítico y nootrópico desarrollado en Rusia por el Instituto de Genética Molecular de la Academia Rusa de Ciencias. Aprobado en Rusia como medicamento para ansiedad y neurastenia. Análogo sintético de la tuftsina, un péptido inmunomodulador natural.",
    mechanism:
      "Selank es un heptapéptido análogo de la tuftsina con adición de una secuencia estabilizadora. Modula el sistema GABAérgico, serotoninérgico y dopaminérgico. Influye en la expresión de BDNF (factor neurotrófico derivado del cerebro) y la encefalinasa. Tiene efecto ansiolítico sin sedación ni dependencia, a diferencia de las benzodiazepinas.",
    benefits: [
      {
        name: "Efecto ansiolítico",
        description:
          "Aprobado en Rusia para tratamiento de ansiedad. Estudios clínicos rusos demostraron eficacia comparable a benzodiazepinas sin efectos sedantes.",
      },
      {
        name: "Mejora cognitiva",
        description:
          "Estudios en animales y algunos clínicos sugieren mejora en memoria y concentración. Aumenta la expresión de BDNF.",
      },
      {
        name: "Inmunomodulación",
        description:
          "Como análogo de la tuftsina, tiene propiedades inmunomoduladoras documentadas en estudios preclínicos.",
      },
    ],
    risks: [
      {
        name: "Estudios mayoritariamente rusos",
        frequency: "N/A",
        description:
          "La mayoría de los estudios clínicos se condujo en Rusia, con limitaciones metodológicas y publicación en revistas rusas. Faltan estudios replicados internacionalmente.",
      },
    ],
    internetVsScience: [
      {
        claim: "Reemplaza ansiolíticos sin efectos secundarios",
        whatTheySay:
          "Promocionado como alternativa natural a las benzodiazepinas sin riesgo de dependencia.",
        actualEvidence:
          "Aprobado en Rusia como ansiolítico sin sedación, pero los estudios fueron conducidos con estándares diferentes a los occidentales. La alegación de cero efectos secundarios es exagerada. No está aprobado por la FDA ni la EMA.",
      },
    ],
    faqs: [
      {
        question: "¿Selank está aprobado en algún país?",
        answer:
          "Sí, Selank está aprobado en Rusia como medicamento para ansiedad generalizada y neurastenia, comercializado como spray nasal. No está aprobado en EE.UU., Europa ni Latinoamérica.",
      },
    ],
  },

  semaglutida: {
    description:
      "Agonista del receptor GLP-1 usado en el tratamiento de diabetes tipo 2 y obesidad. Es el principio activo de Ozempic (inyectable para diabetes) y Wegovy (inyectable para obesidad). Uno de los medicamentos más prescritos y estudiados de la última década.",
    mechanism:
      "La semaglutida mimetiza la hormona GLP-1 (péptido similar al glucagón-1), que es liberada naturalmente por el intestino después de las comidas. Se une a los receptores GLP-1 en el páncreas, estimulando la liberación de insulina y suprimiendo el glucagón cuando la glucosa está elevada. En el cerebro, actúa en los centros de saciedad del hipotálamo, reduciendo el apetito. También retrasa el vaciamiento gástrico, prolongando la sensación de saciedad.",
    benefits: [
      {
        name: "Pérdida de peso significativa",
        description:
          "Los estudios STEP demostraron pérdida promedio de 15-17% del peso corporal en 68 semanas con semaglutida 2,4 mg.",
      },
      {
        name: "Control glucémico en diabetes tipo 2",
        description:
          "Reducción promedio de 1,5-1,8% en HbA1c en los estudios SUSTAIN, superior a otros antidiabéticos.",
      },
      {
        name: "Reducción de eventos cardiovasculares",
        description:
          "El estudio SELECT mostró reducción de 20% en eventos cardiovasculares mayores (MACE) en pacientes con obesidad sin diabetes.",
      },
      {
        name: "Neuroprotección / Alzheimer",
        description:
          "Estudios preclínicos y fase 3 (EVOKE) investigan potencial neuroprotector en Alzheimer. Resultados preliminares prometedores pero no concluyentes.",
      },
    ],
    risks: [
      {
        name: "Náuseas",
        frequency: "40-44% de los pacientes",
        description:
          "Efecto secundario más común. Generalmente transitorio, disminuye con el tiempo. Más intenso en las primeras semanas y durante el aumento de dosis.",
      },
      {
        name: "Diarrea",
        frequency: "30% de los pacientes",
        description:
          "Segundo efecto gastrointestinal más común. Generalmente leve a moderado.",
      },
      {
        name: "Pancreatitis",
        frequency: "Raro (<1%)",
        description:
          "Riesgo pequeño pero grave de inflamación del páncreas. Requiere atención médica inmediata si ocurre dolor abdominal severo.",
      },
      {
        name: "Pérdida de masa muscular",
        frequency: "Común",
        description:
          "Parte del peso perdido puede ser masa magra (hasta 40% en algunos estudios). Se recomienda ejercicio de resistencia durante el tratamiento.",
      },
    ],
    internetVsScience: [
      {
        claim: "Adelgaza 20 kg sin esfuerzo",
        whatTheySay:
          "Influencers la promueven como solución mágica para adelgazar sin dieta ni ejercicio.",
        actualEvidence:
          "Los estudios muestran pérdida promedio de 15-17% del peso corporal (ej: ~15 kg para alguien de 100 kg), pero con dieta y ejercicio combinados. Sin cambio de estilo de vida, el efecto es menor.",
      },
      {
        claim: "Causa cáncer de tiroides",
        whatTheySay:
          "Los avisos en el prospecto y publicaciones en redes sociales generan miedo sobre cáncer de tiroides.",
        actualEvidence:
          "Se observaron tumores de tiroides en roedores, pero no en humanos en los estudios clínicos. El riesgo en humanos no ha sido confirmado, pero se contraindica en pacientes con historial de carcinoma medular de tiroides.",
      },
      {
        claim: "Efecto rebote — recuperas todo el peso",
        whatTheySay:
          "Al dejar el medicamento, recuperas todo el peso perdido.",
        actualEvidence:
          "El estudio STEP 4 mostró que dos tercios del peso perdido se recuperaron después de 1 año sin el medicamento. El mantenimiento a largo plazo probablemente requiere uso continuo o cambio significativo de estilo de vida.",
      },
    ],
    faqs: [
      {
        question: "¿La semaglutida está aprobada?",
        answer:
          "Sí. Semaglutida está aprobada por la FDA, EMA y múltiples agencias reguladoras. Ozempic (semaglutida 0,25 mg, 0,5 mg y 1 mg) para diabetes tipo 2 y Wegovy (semaglutida 2,4 mg) para obesidad. La prescripción médica es obligatoria.",
      },
      {
        question: "¿Cuál es la diferencia entre Ozempic y Wegovy?",
        answer:
          "Ambos contienen semaglutida, pero en dosis diferentes. Ozempic (hasta 1 mg) está indicado para diabetes tipo 2. Wegovy (2,4 mg) está indicado específicamente para control de peso en pacientes con obesidad o sobrepeso con comorbilidades.",
      },
      {
        question: "¿Necesita receta médica?",
        answer:
          "Sí. La semaglutida, liraglutida, tirzepatida y otros agonistas GLP-1 requieren prescripción médica en la mayoría de los países.",
      },
    ],
  },

  semax: {
    description:
      "Péptido nootrópico sintético desarrollado en Rusia en la década de 1980, derivado del fragmento ACTH(4-10) con adición del tripéptido Pro-Gly-Pro (PGP) en el extremo C-terminal para aumentar la estabilidad. Está aprobado en Rusia y algunos países de la CEI para uso clínico en condiciones neurológicas, incluyendo ACV isquémico y disfunción cognitiva. Administrado por vía intranasal, Semax es uno de los pocos péptidos nootrópicos con datos clínicos sustanciales — aunque la mayoría proviene de estudios rusos no replicados en Occidente.",
    mechanism:
      "Semax actúa por múltiples mecanismos neuroprotectores. Modula el sistema melanocortinérgico a través de los receptores MC3 y MC4, aumentando la expresión de BDNF (factor neurotrófico derivado del cerebro) y NGF (factor de crecimiento nervioso) en el hipocampo y la corteza. El aumento de BDNF promueve plasticidad sináptica, neurogénesis y supervivencia neuronal. Adicionalmente, Semax inhibe enzimas involucradas en la degradación de encefalinas (DPPIV y otras), prolongando la acción de péptidos opioides endógenos que modulan humor y dolor. El fragmento PGP confiere actividad antiinflamatoria al inhibir la migración de neutrófilos. En el contexto de ACV, reduce el estrés oxidativo, inhibe la cascada inflamatoria y disminuye el área de penumbra isquémica.",
    benefits: [
      {
        name: "Mejora cognitiva",
        description:
          "Los ensayos clínicos rusos demostraron mejora en atención, memoria y velocidad de procesamiento en pacientes con disfunción cognitiva leve y en voluntarios sanos. Aprobado en Rusia como nootrópico desde los años 1990.",
      },
      {
        name: "Neuroprotección post-ACV",
        description:
          "Estudios clínicos en Rusia mostraron que Semax administrado por vía intranasal en las primeras horas después de un ACV isquémico redujo el déficit neurológico y mejoró la recuperación funcional. Está aprobado como tratamiento adyuvante de ACV en Rusia.",
      },
      {
        name: "Aumento de BDNF",
        description:
          "Múltiples estudios demostraron que Semax aumenta significativamente los niveles de BDNF y sus receptores TrkB en el cerebro, uno de los mecanismos centrales detrás de sus efectos nootrópicos y neuroprotectores.",
      },
      {
        name: "Reducción de ansiedad",
        description:
          "Estudios preclínicos y reportes clínicos sugieren efecto ansiolítico leve, posiblemente mediado por la modulación del sistema melanocortinérgico y opioide. Los datos clínicos robustos aún son limitados para esta indicación específica.",
      },
    ],
    risks: [
      {
        name: "Irritación nasal",
        frequency: "10-15% de los pacientes",
        description:
          "Por administrarse por vía intranasal, puede causar irritación local, resequedad o malestar nasal. Generalmente leve y transitorio.",
      },
      {
        name: "Cefalea",
        frequency: "5-10% de los pacientes",
        description:
          "Dolores de cabeza leves fueron reportados en algunos usuarios, especialmente al inicio del uso. Tienden a resolverse con la continuación del tratamiento.",
      },
      {
        name: "Riesgo teórico de caída del cabello",
        frequency: "Raro/Teórico",
        description:
          "Como análogo de ACTH, existe una preocupación teórica sobre efectos en el eje hipotálamo-hipófisis-suprarrenal que podrían afectar el ciclo capilar. En la práctica, los reportes son raros y no confirmados en estudios controlados.",
      },
    ],
    internetVsScience: [
      {
        claim: "Semax es el nootrópico más potente disponible",
        whatTheySay:
          "Semax aumenta drásticamente el CI, memoria y concentración, siendo superior a cualquier otro nootrópico del mercado.",
        actualEvidence:
          "Los ensayos clínicos rusos muestran mejoras modestas pero estadísticamente significativas en atención y memoria. No es un 'potenciador dramático de inteligencia'. Los efectos son más evidentes en personas con déficits cognitivos preexistentes. En individuos sanos, las mejoras son sutiles.",
      },
      {
        claim: "Semax no tiene efectos secundarios",
        whatTheySay:
          "Es completamente seguro y no tiene ningún efecto adverso, pudiendo usarse indefinidamente.",
        actualEvidence:
          "El perfil de seguridad es de hecho favorable en los estudios disponibles, con efectos secundarios generalmente leves (irritación nasal, cefalea). Sin embargo, la ausencia de estudios a largo plazo (> 1 año) y la falta de replicación de los datos rusos en estudios occidentales independientes significan que la seguridad a largo plazo no está plenamente establecida.",
      },
      {
        claim: "Semax cura TDAH y depresión",
        whatTheySay:
          "Puede reemplazar medicamentos para TDAH y antidepresivos por ser más natural y sin efectos secundarios.",
        actualEvidence:
          "No existen ensayos clínicos controlados que demuestren eficacia de Semax para TDAH o depresión como tratamiento primario. Algunos mecanismos (aumento de BDNF, modulación dopaminérgica) son relevantes para estas condiciones, pero eso no constituye evidencia clínica. No debe reemplazar tratamientos establecidos.",
      },
      {
        claim: "Está aprobado como medicamento, así que es seguro para cualquier persona",
        whatTheySay:
          "Como está aprobado en Rusia, ya fue completamente probado y es seguro para cualquiera.",
        actualEvidence:
          "La aprobación regulatoria en Rusia siguió estándares diferentes a los exigidos por la FDA, EMA u otras agencias. Muchos estudios rusos de Semax no han sido replicados internacionalmente y no están disponibles en inglés con metodología detallada. La aprobación en un país no garantiza seguridad universal — por eso no está aprobado en Occidente.",
      },
    ],
    faqs: [
      {
        question: "¿Cómo se administra Semax?",
        answer:
          "Semax se administra por vía intranasal (gotas o spray nasal). La formulación más común es la solución al 1% (0,1%). En el protocolo ruso aprobado, la dosis típica es de 200-600 mcg por día, dividida en 2-3 aplicaciones nasales. La vía intranasal permite que el péptido alcance el cerebro directamente a través de la mucosa olfatoria, evitando la degradación gastrointestinal.",
      },
      {
        question: "¿Semax está aprobado por la FDA o la EMA?",
        answer:
          "No. Semax está aprobado únicamente en Rusia y algunos países de la Comunidad de Estados Independientes (CEI). No posee aprobación de la FDA (EE.UU.), EMA (Europa) ni de agencias reguladoras latinoamericanas. Los estudios clínicos que sustentan su aprobación rusa no han sido replicados bajo estándares regulatorios occidentales.",
      },
      {
        question:
          "¿Cuánto tiempo tarda en sentirse los efectos de Semax?",
        answer:
          "Según reportes clínicos y de usuarios, los efectos agudos (mejora de concentración y atención) pueden percibirse dentro de 15-30 minutos después de la administración intranasal. Los efectos a largo plazo en neuroprotección y plasticidad sináptica requieren uso consistente por semanas. Importante: estos reportes provienen predominantemente de la literatura rusa y de comunidades de biohacking, no de estudios controlados occidentales.",
      },
      {
        question: "¿Puedo combinar Semax con otros nootrópicos?",
        answer:
          "No hay estudios controlados sobre interacciones de Semax con otros nootrópicos o medicamentos psicoactivos. Teóricamente, el aumento de BDNF y la modulación dopaminérgica pueden interactuar con antidepresivos (especialmente ISRS), estimulantes y otros nootrópicos. Consulte a un médico antes de combinar sustancias neuroactivas.",
      },
      {
        question:
          "¿Por qué Semax no está aprobado en Occidente si funciona en Rusia?",
        answer:
          "Los estándares regulatorios difieren significativamente. La FDA y la EMA exigen ensayos clínicos de fase 3 multicéntricos, aleatorizados y doble ciego con muestras grandes. Muchos estudios rusos de Semax tienen muestras pequeñas, no están publicados en revistas internacionales de alto impacto y no siguen todos los criterios ICH-GCP. Para obtener aprobación occidental, Semax necesitaría nuevos ensayos clínicos costosos, y ninguna empresa farmacéutica occidental ha financiado esos estudios hasta el momento.",
      },
    ],
  },

  sermorelin: {
    description:
      "Análogo de la hormona liberadora de GH (GHRH) correspondiente a los primeros 29 aminoácidos de la GHRH natural. Fue aprobado por la FDA de 1997 a 2008 para deficiencia de GH en niños. Ahora disponible a través de farmacias magistrales. Uno de los secretagogos de GH más estudiados.",
    mechanism:
      "Sermorelina se une a los receptores de GHRH en la hipófisis anterior, estimulando la síntesis y liberación pulsátil de hormona de crecimiento. Preserva el feedback negativo natural del eje GH-IGF-1, a diferencia de la GH exógena que suprime la producción endógena.",
    benefits: [
      {
        name: "Aumento de GH fisiológico",
        description:
          "Aprobado por la FDA (1997-2008) para deficiencia de GH. Estimula la liberación natural de GH manteniendo el patrón pulsátil fisiológico.",
      },
      {
        name: "Mejora de la composición corporal",
        description:
          "Estudios clínicos demuestran aumento de masa magra y reducción de grasa corporal con uso prolongado.",
      },
      {
        name: "Mejora de la calidad del sueño",
        description:
          "Reportes clínicos de mejora en el sueño profundo (slow-wave sleep), fase en la que la GH se libera naturalmente con mayor intensidad.",
      },
    ],
    risks: [
      {
        name: "Dolor en el sitio de inyección",
        frequency: "Común",
        description:
          "Efecto secundario más reportado. Generalmente leve.",
      },
      {
        name: "Rubor facial",
        frequency: "Infrecuente",
        description: "Enrojecimiento transitorio después de la inyección.",
      },
    ],
    internetVsScience: [
      {
        claim: "Mejor que HGH y más seguro",
        whatTheySay:
          "Sermorelina da todos los beneficios de la HGH sin los riesgos.",
        actualEvidence:
          "Estimula GH natural (más seguro que GH exógena que suprime producción endógena), pero los niveles de GH alcanzados son menores. Fue aprobada por la FDA, lo que le da más credibilidad que muchos péptidos. Fue descontinuada comercialmente por razones de mercado, no de seguridad.",
      },
    ],
    faqs: [
      {
        question: "¿Por qué Geref fue descontinuado?",
        answer:
          "El fabricante (Serono/EMD) descontinuó voluntariamente Geref en 2008 por razones comerciales (mercado pequeño), no por problemas de seguridad ni eficacia. El péptido sigue disponible a través de farmacias magistrales en EE.UU.",
      },
    ],
  },

  "tb-500": {
    description:
      "Versión sintética de la timosina beta-4, una proteína naturalmente presente en casi todas las células del cuerpo humano. Investigado por sus efectos en la cicatrización de tejidos, reducción de inflamación y regeneración celular. Popular entre atletas, pero con evidencia clínica limitada.",
    mechanism:
      "La timosina beta-4 es una proteína de 43 aminoácidos que regula la actina, componente esencial del citoesqueleto celular. Promueve la migración celular, formación de nuevos vasos sanguíneos y reduce la inflamación. También regula la expresión de genes involucrados en la reparación tisular.",
    benefits: [
      {
        name: "Cicatrización de heridas",
        description:
          "Estudios clínicos de fase 2 en úlceras cutáneas mostraron resultados prometedores. RegeneRx Biopharmaceuticals condujo ensayos para úlceras dérmicas.",
      },
      {
        name: "Regeneración cardíaca",
        description:
          "Estudios preclínicos demostraron que TB-4 puede activar células progenitoras cardíacas y promover regeneración después de infarto en modelos animales.",
      },
    ],
    risks: [
      {
        name: "Datos de seguridad limitados",
        frequency: "Desconocido",
        description:
          "Pocos estudios clínicos en humanos completados. El perfil de seguridad a largo plazo es desconocido.",
      },
    ],
    internetVsScience: [
      {
        claim: "Recupera lesiones deportivas en días",
        whatTheySay:
          "Los atletas reportan recuperación dramática de lesiones musculares y tendinosas.",
        actualEvidence:
          "La evidencia en animales apoya el efecto cicatrizante, pero no hay estudios clínicos que confirmen eficacia en lesiones deportivas en humanos. Los reportes anecdóticos no son evidencia científica.",
      },
    ],
    faqs: [
      {
        question:
          "¿Cuál es la diferencia entre TB-500 y Timosina Beta-4?",
        answer:
          "TB-500 es el nombre comercial para una versión sintética de un fragmento de la timosina beta-4. La molécula no es idéntica a la timosina beta-4 completa, aunque comparte la región activa responsable de los efectos biológicos.",
      },
    ],
  },

  tesamorelin: {
    description:
      "Análogo de la GHRH aprobado por la FDA para reducción de grasa visceral en pacientes VIH con lipodistrofia. Único secretagogo de GH con aprobación activa de la FDA actualmente. También investigado para esteatosis hepática (hígado graso) y deterioro cognitivo.",
    mechanism:
      "Tesamorelina es un análogo modificado de la GHRH con adición de un ácido trans-3-hexenoico en la posición N-terminal, aumentando su estabilidad y potencia. Estimula la liberación de GH por la hipófisis de forma fisiológica, reduciendo selectivamente la grasa visceral sin afectar la grasa subcutánea en la misma proporción.",
    benefits: [
      {
        name: "Reducción de grasa visceral",
        description:
          "Aprobado por la FDA (2010). Los estudios demostraron reducción de 15-18% en la grasa visceral (trunk fat) en pacientes VIH con lipodistrofia.",
      },
      {
        name: "Reducción de grasa hepática",
        description:
          "Estudios muestran reducción significativa de grasa en el hígado (NAFLD/NASH) en pacientes VIH y no VIH.",
      },
      {
        name: "Beneficios cognitivos",
        description:
          "Estudios en adultos con deterioro cognitivo leve muestran mejora en memoria y función ejecutiva.",
      },
    ],
    risks: [
      {
        name: "Artralgias",
        frequency: "13% de los pacientes",
        description:
          "Dolor articular es el efecto secundario más común. Generalmente leve a moderado.",
      },
      {
        name: "Edema periférico",
        frequency: "6% de los pacientes",
        description:
          "Hinchazón leve en las extremidades, relacionada con el aumento de GH/IGF-1.",
      },
    ],
    internetVsScience: [
      {
        claim: "Derrite la grasa abdominal",
        whatTheySay:
          "Tesamorelina es el mejor péptido para eliminar barriga — aprobado por la FDA para eso.",
        actualEvidence:
          "Aprobado por la FDA para reducción de grasa visceral en VIH-lipodistrofia (15-18% de reducción). Eficaz, pero aprobado para una población específica. El uso off-label para grasa abdominal en general es común pero no es indicación aprobada.",
      },
    ],
    faqs: [
      {
        question: "¿Tesamorelina puede usarse para adelgazar?",
        answer:
          "La aprobación de la FDA es específicamente para lipodistrofia asociada al VIH, no para adelgazamiento general. El uso off-label existe, pero no es indicación aprobada. Para obesidad, semaglutida y tirzepatida tienen mucha más evidencia.",
      },
    ],
  },

  "thymosin-alpha-1": {
    description:
      "Péptido inmunomodulador naturalmente producido por el timo. Aprobado como medicamento en más de 30 países (no en EE.UU.) para hepatitis B y C, inmunodeficiencias y como adyuvante de vacunas. Uno de los péptidos con más evidencia clínica fuera de los GLP-1.",
    mechanism:
      "La timosina alfa-1 modula el sistema inmunológico estimulando la maduración de células T, la actividad de células NK (natural killer) y la producción de citocinas. También estimula células dendríticas y macrófagos, mejorando tanto la inmunidad innata como la adaptativa.",
    benefits: [
      {
        name: "Tratamiento de hepatitis B crónica",
        description:
          "Aprobado en más de 30 países para hepatitis B. Los metaanálisis confirman eficacia en la supresión viral y seroconversión.",
      },
      {
        name: "Inmunomodulación",
        description:
          "Estimulación documentada de células T, NK y respuesta inmune adaptativa en múltiples estudios clínicos.",
      },
      {
        name: "Adyuvante de vacunas",
        description:
          "Estudios clínicos muestran potenciación de la respuesta inmune cuando se administra junto con vacunas, especialmente en inmunocomprometidos.",
      },
    ],
    risks: [
      {
        name: "Dolor en el sitio de inyección",
        frequency: "Común",
        description:
          "Efecto secundario más reportado. Generalmente leve y transitorio.",
      },
    ],
    internetVsScience: [
      {
        claim: "Previene todas las enfermedades inmunológicas",
        whatTheySay:
          "Promocionado como 'super boost' para el sistema inmunológico que previene todo.",
        actualEvidence:
          "Es un inmunomodulador comprobado, pero no previene todas las enfermedades. La eficacia principal es en hepatitis y como adyuvante. No es una 'cura' universal para problemas inmunológicos.",
      },
    ],
    faqs: [
      {
        question: "¿Por qué no está aprobado en EE.UU.?",
        answer:
          "Zadaxin (timosina alfa-1) tiene aprobaciones en algunos países, pero no está aprobado por la FDA y no se ha identificado registro en Anvisa. Una categoría de evaluación para preparación magistral en EE. UU. no equivale a aprobación ni autoriza su uso en Brasil.",
      },
    ],
  },

  tirzepatida: {
    description:
      "Agonista dual de los receptores GIP y GLP-1, representando una nueva clase de medicamentos para diabetes tipo 2 y obesidad. Demostró eficacia superior a la semaglutida en algunos estudios de pérdida de peso.",
    mechanism:
      "La tirzepatida es única por activar dos receptores de incretinas simultáneamente: GIP (polipéptido insulinotrópico dependiente de glucosa) y GLP-1. Esta acción dual potencia la secreción de insulina, suprime el glucagón, retrasa el vaciamiento gástrico y reduce el apetito por acción en los centros de saciedad del cerebro. La activación del receptor GIP añade beneficios metabólicos más allá de lo que el GLP-1 solo ofrece.",
    benefits: [
      {
        name: "Pérdida de peso superior",
        description:
          "El estudio SURMOUNT-1 demostró pérdida promedio de 22,5% del peso corporal con la dosis más alta (15 mg) en 72 semanas — la mayor registrada con medicamento hasta ese momento.",
      },
      {
        name: "Control glucémico potente",
        description:
          "En los estudios SURPASS, redujo HbA1c hasta 2,4%, superior a semaglutida en comparación directa (SURPASS-2).",
      },
      {
        name: "Mejora de la apnea del sueño",
        description:
          "El estudio SURMOUNT-OSA demostró reducción significativa en los eventos de apnea por hora en pacientes con obesidad y apnea obstructiva del sueño.",
      },
    ],
    risks: [
      {
        name: "Náuseas",
        frequency: "25-33% de los pacientes",
        description:
          "Efecto gastrointestinal más común. Generalmente transitorio y dosis-dependiente.",
      },
      {
        name: "Diarrea",
        frequency: "17-23% de los pacientes",
        description:
          "Segundo efecto gastrointestinal más común.",
      },
      {
        name: "Pancreatitis",
        frequency: "Raro",
        description:
          "Riesgo similar al de semaglutida. Requiere monitoreo.",
      },
    ],
    internetVsScience: [
      {
        claim: "Es mejor que Ozempic para adelgazar",
        whatTheySay:
          "Tirzepatida es el 'Ozempic turbinado', pierde más peso.",
        actualEvidence:
          "Comparaciones indirectas sugieren mayor pérdida de peso con tirzepatida (22,5% vs 15-17%), pero no hay estudio head-to-head publicado específicamente para obesidad. En diabetes, SURPASS-2 mostró superioridad.",
      },
    ],
    faqs: [
      {
        question: "¿Tirzepatida está disponible en Latinoamérica?",
        answer:
          "Mounjaro (tirzepatida) está en proceso de registro en varias agencias reguladoras latinoamericanas. La disponibilidad varía por país. Puede ser importado con receta médica en casos específicos.",
      },
    ],
  },

  "urolitina-a": {
    description:
      "IMPORTANTE: La urolitina A no es un péptido, es un metabolito producido por la microbiota intestinal a partir de elagitaninos encontrados en granada, frambuesa, fresa y nueces. Solo el 30-40% de las personas tienen bacterias intestinales que producen urolitina A naturalmente — el resto necesita suplementar. Único compuesto comprobado clínicamente en inducir mitofagia (reciclaje de mitocondrias) en humanos.",
    mechanism:
      "La urolitina A induce mitofagia — el proceso de reciclaje selectivo de mitocondrias dañadas. Las mitocondrias disfuncionales se acumulan con la edad, contribuyendo a la sarcopenia y el declive metabólico. Al remover esas mitocondrias 'viejas', la urolitina A mejora la calidad del pool mitocondrial y la función celular.",
    benefits: [
      {
        name: "Inducción de mitofagia en humanos",
        description:
          "Único compuesto demostrado clínicamente en inducir mitofagia en humanos. Un estudio confirmó aumento de marcadores de mitofagia en sangre después de 28 días.",
      },
      {
        name: "Función muscular",
        description:
          "Estudios clínicos demostraron mejora en fuerza muscular y resistencia en adultos de mediana edad y adultos mayores.",
      },
      {
        name: "Salud mitocondrial",
        description:
          "Mejora marcadores de función mitocondrial y biogénesis en estudios clínicos.",
      },
    ],
    risks: [
      {
        name: "Perfil de seguridad favorable",
        frequency: "Raro",
        description:
          "Los estudios clínicos muestran un perfil de seguridad excelente. Los eventos adversos son raros y leves (gastrointestinales).",
      },
      {
        name: "Costo elevado",
        frequency: "N/A",
        description:
          "Mitopure (única forma estudiada clínicamente) tiene un costo significativo, equivalente a US$ 60-90/mes.",
      },
    ],
    internetVsScience: [
      {
        claim: "Píldora de la longevidad muscular",
        whatTheySay:
          "La urolitina A te da músculos jóvenes sin entrenar.",
        actualEvidence:
          "Mejora la función mitocondrial y marcadores musculares, pero no reemplaza el ejercicio. Los beneficios son modestos (mejora ~12% en resistencia muscular). No es magia.",
      },
    ],
    faqs: [
      {
        question: "¿Puedo obtener urolitina A naturalmente?",
        answer:
          "Solo el 30-40% de las personas tienen la microbiota intestinal capaz de convertir elagitaninos (de granada, nueces, frambuesas) en urolitina A. Para el otro 60-70%, la suplementación directa es la única forma de obtenerla. Un test de orina puede determinar si usted es productor natural.",
      },
    ],
  },
};

export default translations;
