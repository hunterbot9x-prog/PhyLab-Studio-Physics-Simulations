export const EXPERIMENTS_DATA = [
  // --- CHƯƠNG TRÌNH SGK VIỆT NAM & QUỐC TẾ (LỚP 6 - 12) ---
  {
    id: "g6-archimedes",
    grade: 6,
    gradeLabel: "Grade 6",
    curriculum: "VN",
    category: "Cơ học",
    title: "Định luật Archimedes & Lực đẩy Chất lỏng",
    titleEn: "Archimedes' Law & Fluid Buoyant Force",
    subtitle: "Xác định lực đẩy Archimedes và khối lượng riêng của vật thể chìm trong chất lỏng",
    subtitleEn: "Determine Archimedes buoyant force and density of submerged objects",
    icon: "Droplets",
    description: "Mô phỏng lực kế đo trọng lượng vật trong không khí P1 và khi chìm trong chất lỏng P2. Tính lực đẩy Archimedes F_A = P1 - P2 và so sánh với d * V.",
    theory: {
      objective: "Xác định độ lớn lực đẩy Archimedes tác dụng lên vật nhúng trong chất lỏng và tính khối lượng riêng D của vật liệu.",
      objectiveEn: "Determine the magnitude of Archimedes buoyant force acting on a submerged object and compute the material density D.",
      purpose: "Giúp học sinh giải thích hiện tượng nổi/chìm của tàu thuyền, khinh khí cầu; ứng dụng trong thiết kế tàu ngầm, đo nồng độ dung dịch và kiểm tra kim loại nguyên chất.",
      purposeEn: "Helps students explain floating/sinking of ships, hot air balloons; applications in submarine engineering, liquid hydrometers, and material purity tests.",
      summary: "Một vật nhúng vào chất lỏng chịu tác dụng của một lực đẩy thẳng đứng hướng từ dưới lên có độ lớn bằng trọng lượng của phần chất lỏng bị vật chiếm chỗ.",
      summaryEn: "An object submerged in fluid experiences an upward buoyant force equal to the weight of the fluid displaced by the object.",
      formulas: [
        {
          label: "Lực đẩy Archimedes",
          labelEn: "Archimedes Buoyant Force",
          formula: "F_A = d_lỏng · V = ρ_lỏng · g · V",
          symbols: [
            { symbol: "F_A", name: "Lực đẩy Archimedes tác dụng lên vật", nameEn: "Archimedes buoyant force", unit: "N (Newton)", unitEn: "N (Newtons)" },
            { symbol: "d_lỏng", name: "Trọng lượng riêng của chất lỏng", nameEn: "Specific weight of fluid", unit: "N/m³", unitEn: "N/m³" },
            { symbol: "ρ_lỏng", name: "Khối lượng riêng của chất lỏng", nameEn: "Density of fluid", unit: "kg/m³", unitEn: "kg/m³" },
            { symbol: "V", name: "Thể tích phần chất lỏng bị vật chiếm chỗ", nameEn: "Displaced fluid volume", unit: "m³", unitEn: "m³" },
            { symbol: "g", name: "Gia tốc trọng trường", nameEn: "Gravitational acceleration", unit: "m/s² (g ≈ 9.81 m/s²)", unitEn: "m/s² (g ≈ 9.81 m/s²)" }
          ]
        },
        {
          label: "Đo lực đẩy bằng thực nghiệm lực kế",
          labelEn: "Experimental Buoyant Force Measurement",
          formula: "F_A = P_1 - P_2",
          symbols: [
            { symbol: "P_1", name: "Trọng lượng vật khi treo ngoài không khí", nameEn: "Object weight in air", unit: "N (Newton)", unitEn: "N (Newtons)" },
            { symbol: "P_2", name: "Trọng lượng vật khi nhúng chìm trong chất lỏng", nameEn: "Object weight submerged in fluid", unit: "N (Newton)", unitEn: "N (Newtons)" }
          ]
        },
        {
          label: "Khối lượng riêng của vật",
          labelEn: "Material Mass Density",
          formula: "D = m / V",
          symbols: [
            { symbol: "D", name: "Khối lượng riêng của vật liệu", nameEn: "Material mass density", unit: "kg/m³", unitEn: "kg/m³" },
            { symbol: "m", name: "Khối lượng của vật thể", nameEn: "Mass of the object", unit: "kg", unitEn: "kg" },
            { symbol: "V", name: "Thể tích của vật thể", nameEn: "Volume of the object", unit: "m³", unitEn: "m³" }
          ]
        }
      ],
      sgkRef: "SGK Khoa học Tự nhiên 6 (Bài Lực đẩy Archimedes & Khối lượng riêng)",
      sgkRefEn: "Grade 6 Science Curriculum (Archimedes Principle & Density)",
      guideSteps: [
        "Bước 1: Chọn vật liệu (Nhôm, Sắt, Đồng, Gỗ) và điều chỉnh thể tích V (cm³) của vật.",
        "Bước 2: Treo vật vào lực kế, đọc và ghi nhận giá trị trọng lượng P1 ngoài không khí.",
        "Bước 3: Điều chỉnh hạ lực kế để vật chìm hoàn toàn trong chất lỏng (Nước hoặc Dầu).",
        "Bước 4: Đọc giá trị lực kế P2 khi vật chìm và mực nước dâng lên ΔV trong bình chia độ.",
        "Bước 5: So sánh kết quả F_A = P1 - P2 với công thức lý thuyết F_A = d · V."
      ],
      guideStepsEn: [
        "Step 1: Select material type (Aluminum, Iron, Copper, Wood) and adjust object volume V (cm³).",
        "Step 2: Attach object to spring scale, read and record weight P1 in air.",
        "Step 3: Lower spring scale so the object is fully submerged in fluid (Water or Oil).",
        "Step 4: Read submerged weight P2 on spring scale and displaced water volume ΔV in graduated cylinder.",
        "Step 5: Compare experimental buoyant force F_A = P1 - P2 with theoretical formula F_A = d · V."
      ]
    },
    defaultParams: { material: "aluminum", volumeCm3: 100, liquid: "water", gravity: 9.8 },
    challenges: [
      {
        id: "c1",
        question: "Với khối nhôm thể tích 100 cm³ chìm trong nước (d = 10000 N/m³), lực đẩy Archimedes bằng bao nhiêu?",
        questionEn: "For an aluminum block of volume 100 cm³ submerged in water (d = 10000 N/m³), what is the Archimedes buoyant force?",
        options: ["0.5 N", "1.0 N", "2.7 N", "9.8 N"],
        optionsEn: ["0.5 N", "1.0 N", "2.7 N", "9.8 N"],
        correctIndex: 1,
        explanation: "F_A = d · V = 10000 N/m³ · 0.0001 m³ = 1.0 N",
        explanationEn: "F_A = d · V = 10000 N/m³ · 0.0001 m³ = 1.0 N"
      }
    ]
  },
  {
    id: "g7-reflection",
    grade: 7,
    gradeLabel: "Grade 7",
    curriculum: "VN",
    category: "Quang học",
    title: "Định luật Phản xạ Ánh sáng & Gương phẳng",
    titleEn: "Law of Reflection & Flat Mirrors",
    subtitle: "Khảo sát đường truyền của tia sáng chiếu tới gương phẳng và tính chất ảnh",
    subtitleEn: "Investigate light beam reflection off flat mirrors and virtual image properties",
    icon: "Sun",
    description: "Mô phỏng nguồn sáng Laser chiếu tia tới SI đến mặt gương tại điểm tới I. Quan sát tia phản xạ IR và đo góc tới i, góc phản xạ i'.",
    theory: {
      objective: "Khảo sát đường truyền tia sáng phản xạ qua gương phẳng, kiểm chứng góc phản xạ i' bằng góc tới i (i' = i) và tính chất ảnh ảo đối xứng qua gương.",
      objectiveEn: "Investigate light reflection off plane mirrors, verify reflection angle i' equals incident angle i (i' = i), and analyze virtual image symmetry.",
      purpose: "Ứng dụng trong đời sống chế tạo gương soi sinh hoạt, kính ngầm periscope cho tàu ngầm, đèn pha ô tô, và các phép đo khoảng cách bằng laser.",
      purposeEn: "Applications include household mirrors, submarine periscopes, automotive headlights, and precision laser distance sensors.",
      summary: "Tia phản xạ nằm trong mặt phẳng chứa tia tới và pháp tuyến tại điểm tới. Góc phản xạ luôn bằng góc tới (i' = i). Ảnh qua gương phẳng là ảnh ảo, bằng vật và d' = d.",
      summaryEn: "The reflected ray lies in the plane formed by the incident ray and the normal at the point of incidence. Reflection angle equals incident angle (i' = i). The virtual image is equal in size to the object at d' = d.",
      formulas: [
        {
          label: "Định luật phản xạ ánh sáng",
          labelEn: "Law of Light Reflection",
          formula: "i' = i",
          symbols: [
            { symbol: "i", name: "Góc tới (góc hợp bởi tia tới và pháp tuyến)", nameEn: "Angle of incidence", unit: "độ (°)", unitEn: "degrees (°)" },
            { symbol: "i'", name: "Góc phản xạ (góc hợp bởi tia phản xạ và pháp tuyến)", nameEn: "Angle of reflection", unit: "độ (°)", unitEn: "degrees (°)" }
          ]
        },
        {
          label: "Khoảng cách ảnh qua gương phẳng",
          labelEn: "Plane Mirror Image Distance",
          formula: "d' = d",
          symbols: [
            { symbol: "d", name: "Khoảng cách từ vật thật đến mặt gương", nameEn: "Distance from object to mirror", unit: "m (mét)", unitEn: "meters (m)" },
            { symbol: "d'", name: "Khoảng cách từ ảnh ảo đến mặt gương", nameEn: "Distance from image to mirror", unit: "m (mét)", unitEn: "meters (m)" }
          ]
        }
      ],
      sgkRef: "SGK KHTN 7 (Bài Định luật phản xạ ánh sáng)",
      sgkRefEn: "Grade 7 Science Curriculum (Law of Light Reflection)",
      guideSteps: [
        "Bước 1: Bật nguồn phát tia Laser chiếu đến mặt gương phẳng tại điểm tới I.",
        "Bước 2: Đặt thước đo góc (Protractor) sao cho vạch 0° trùng với pháp tuyến NN'.",
        "Bước 3: Điều chỉnh góc tới i từ 0° đến 80° bằng thanh trượt.",
        "Bước 4: Quan sát góc phản xạ i' tương ứng và vị trí ảnh ảo S' đối xứng qua gương."
      ],
      guideStepsEn: [
        "Step 1: Turn on Laser beam directed at plane mirror at point of incidence I.",
        "Step 2: Position protractor so 0° line aligns with normal line NN'.",
        "Step 3: Adjust incident angle i from 0° to 80° using slider.",
        "Step 4: Observe reflected angle i' and symmetrical virtual image S' behind mirror."
      ]
    },
    defaultParams: { incidentAngle: 45, showNormals: true, showVirtualImage: true, laserColor: "#00f2fe" },
    challenges: [
      {
        id: "c1",
        question: "Nếu góc hợp bởi tia tới SI và mặt gương là 30°, thì góc phản xạ i' bằng bao nhiêu?",
        questionEn: "If the angle between incident ray SI and the mirror surface is 30°, what is the angle of reflection i'?",
        options: ["30°", "60°", "90°", "120°"],
        optionsEn: ["30°", "60°", "90°", "120°"],
        correctIndex: 1,
        explanation: "Góc tới i = 90° - 30° = 60°. Theo định luật phản xạ i' = i = 60°.",
        explanationEn: "Incident angle i = 90° - 30° = 60°. By law of reflection i' = i = 60°."
      }
    ]
  },
  {
    id: "g7-spherical-mirror",
    grade: 7,
    gradeLabel: "Grade 7",
    curriculum: "VN",
    category: "Quang học",
    title: "Khảo sát Gương Cầu Lồi & Gương Cầu Lõm",
    titleEn: "Spherical Mirrors (Convex & Concave Mirrors)",
    subtitle: "Khảo sát vị trí, độ phóng đại và tính chất ảnh tạo bởi gương cầu lồi và gương cầu lõm",
    subtitleEn: "Investigate image position, magnification, and nature formed by spherical mirrors",
    icon: "Sun",
    description: "Mô phỏng chùm sáng phản xạ qua gương cầu lồi (ảnh ảo nhỏ hơn vật, vùng nhìn thấy rộng) và gương cầu lõm (ảnh ảo phóng to khi vật ở gần).",
    theory: {
      objective: "Khảo sát công thức gương cầu 1/f = 1/d + 1/d' và tính chất ảnh tạo bởi gương cầu lồi (chỉ cho ảnh ảo nhỏ hơn vật) và gương cầu lõm (cho ảnh thật ngược chiều hoặc ảnh ảo phóng to).",
      objectiveEn: "Investigate spherical mirror equation 1/f = 1/d + 1/d' and image formation for convex and concave mirrors.",
      purpose: "Ứng dụng làm kính chiếu hậu xe máy/ô tô, gương quan sát cua gấp khúc (gương lồi); gương nha sĩ, gương soi mặt phóng to, chao đèn pha ô tô (gương lõm).",
      purposeEn: "Applications in rear-view car mirrors, blind turn road safety (convex); dentist mirrors, magnifying makeup mirrors, headlamp reflectors (concave).",
      summary: "Gương cầu lõm có tiêu cự f > 0, hội tụ chùm sáng song song tại tiêu điểm F. Gương cầu lồi có tiêu cự f < 0, phân kỳ chùm sáng phản xạ có đường kéo dài đi qua tiêu điểm ảo F.",
      summaryEn: "Concave mirrors (f > 0) converge parallel light rays to real focal point F. Convex mirrors (f < 0) diverge reflected rays whose extensions pass through virtual focal point F.",
      formulas: [
        {
          label: "Công thức Gương cầu",
          labelEn: "Spherical Mirror Equation",
          formula: "1/f = 1/d + 1/d'",
          symbols: [
            { symbol: "f", name: "Tiêu cự của gương cầu (f = R / 2)", nameEn: "Mirror focal length (f = R / 2)", unit: "cm", unitEn: "cm" },
            { symbol: "d", name: "Khoảng cách từ vật thật AB đến cực O", nameEn: "Object distance to pole O", unit: "cm", unitEn: "cm" },
            { symbol: "d'", name: "Khoảng cách từ ảnh A'B' đến cực O", nameEn: "Image distance to pole O", unit: "cm", unitEn: "cm" }
          ]
        },
        {
          label: "Độ phóng đại ảnh",
          labelEn: "Image Magnification",
          formula: "k = -d' / d",
          symbols: [
            { symbol: "k", name: "Độ phóng đại của ảnh (k > 0: ảnh cùng chiều, k < 0: ảnh ngược chiều)", nameEn: "Magnification ratio", unit: "hệ số (x)", unitEn: "factor (x)" }
          ]
        }
      ],
      sgkRef: "SGK KHTN 7 (Bài Ảnh tạo bởi gương cầu lồi và gương cầu lõm)",
      sgkRefEn: "Grade 7 Science & IGCSE Physics (Spherical Mirrors)",
      guideSteps: [
        "Bước 1: Chọn loại gương cầu (Gương cầu Lõm f > 0 hoặc Gương cầu Lồi f < 0).",
        "Bước 2: Điều chỉnh tiêu cự |f| và khoảng cách vật d bằng các thanh trượt.",
        "Bước 3: Quan sát đường truyền tia sáng, tiêu điểm F, tâm C và vị trí ảnh A'B'.",
        "Bước 4: Nhấn 'Ghi Bảng Số Liệu Gương Cầu' để lưu kết quả."
      ],
      guideStepsEn: [
        "Step 1: Select mirror type (Concave Mirror f > 0 or Convex Mirror f < 0).",
        "Step 2: Adjust focal length |f| and object distance d using sliders.",
        "Step 3: Observe ray tracing, focal point F, center C, and image position A'B'.",
        "Step 4: Click 'Record Spherical Mirror Data' to save measurements."
      ]
    },
    defaultParams: { mirrorType: "concave", absFocalCm: 20, objectDistCm: 35, objectHeightCm: 5 },
    challenges: [
      {
        id: "c1",
        question: "Vì sao gương chiếu hậu xe máy lại dùng gương cầu lồi thay vì gương phẳng?",
        questionEn: "Why do motorcycle rear-view mirrors use convex mirrors instead of flat mirrors?",
        options: [
          "Cho ảnh to hơn gương phẳng",
          "Có vùng nhìn thấy (thị trường) rộng hơn gương phẳng",
          "Cho ảnh ngược chiều rõ nét hơn",
          "Tạo ra ảnh thật trước gương"
        ],
        optionsEn: [
          "Creates larger image than flat mirror",
          "Provides a wider field of view than flat mirror",
          "Creates inverted clear image",
          "Creates real image in front of mirror"
        ],
        correctIndex: 1,
        explanation: "Gương cầu lồi cho ảnh ảo cùng chiều nhỏ hơn vật, giúp nới rộng vùng nhìn thấy (thị trường) phía sau xe.",
        explanationEn: "Convex mirrors produce virtual diminished upright images, providing a significantly wider field of view."
      }
    ]
  },
  {
    id: "g8-inclined-plane",
    grade: 8,
    gradeLabel: "Grade 8",
    curriculum: "VN",
    category: "Cơ học",
    title: "Khảo sát Mặt phẳng Nghiêng & Lò xo Dao động",
    titleEn: "Inclined Plane Mechanics & Spring Oscillator",
    subtitle: "Khảo sát lực trượt, lực kéo, hệ số ma sát và lò xo dao động trên mặt phẳng nghiêng",
    subtitleEn: "Investigate sliding force, pulling effort, friction, and spring harmonic motion on incline",
    icon: "Mountain",
    description: "Khảo sát 3 chế độ: Vật trượt xuống dưới tác dụng của gia tốc a = g(sinθ - μcosθ), Kéo vật lên với lực F = P∥ + Fms, và Con lắc lò xo dao động trên mặt phẳng nghiêng.",
    theory: {
      objective: "Phân tích các thành phần lực tác dụng lên vật trên mặt phẳng nghiêng (P∥, P⊥, N, Fms) và đo chu kỳ dao động điều hòa của con lắc lò xo.",
      objectiveEn: "Analyze force components acting on inclined plane (P∥, P⊥, N, Fms) and measure simple harmonic oscillation period of mass-spring system.",
      purpose: "Ứng dụng trong đường dốc vận chuyển hàng hóa, cầu dẫn lên xe tải, thiết bị giảm xóc công nghiệp và hệ thống cầu đường dốc núi.",
      purposeEn: "Applications in loading ramps, wheelchair access ramps, industrial spring shock absorbers, and mountain highway grade engineering.",
      summary: "Thành phần lực kéo vật xuống: P∥ = m·g·sin(θ). Lực ma sát: Fms = μ·m·g·cos(θ). Gia tốc trượt: a = g·(sinθ - μ·cosθ). Con lắc lò xo có độ giãn tại vị trí cân bằng: Δl0 = (m·g·sinθ) / k, chu kỳ dao động T = 2π√(m/k).",
      summaryEn: "Parallel gravity component P∥ = m·g·sin(θ). Friction force Fms = μ·m·g·cos(θ). Sliding acceleration a = g·(sinθ - μ·cosθ). Spring equilibrium stretch Δl0 = (m·g·sinθ) / k, period T = 2π√(m/k).",
      formulas: [
        {
          label: "Thành phần Trọng lực song song",
          labelEn: "Parallel Weight Component",
          formula: "P_parallel = m · g · sin(θ)",
          symbols: [
            { symbol: "P∥", name: "Thành phần lực kéo vật trượt xuống", nameEn: "Parallel gravity component", unit: "N (Newton)", unitEn: "N (Newtons)" },
            { symbol: "θ", name: "Góc nghiêng của mặt phẳng", nameEn: "Incline angle", unit: "độ (°)", unitEn: "degrees (°)" }
          ]
        },
        {
          label: "Lực Kéo vật lên mặt phẳng nghiêng",
          labelEn: "Pulling Force Upward",
          formula: "F_pull = m · g · sin(θ) + μ · m · g · cos(θ)",
          symbols: [
            { symbol: "F_pull", name: "Lực kéo cần thiết", nameEn: "Required pulling force", unit: "N (Newton)", unitEn: "N (Newtons)" },
            { symbol: "μ", name: "Hệ số ma sát giữa vật và mặt nghiêng", nameEn: "Friction coefficient", unit: "không đơn vị", unitEn: "unitless" }
          ]
        },
        {
          label: "Chu kỳ Dao động Lò xo trên mặt nghiêng",
          labelEn: "Spring Oscillator Period",
          formula: "T = 2π · √(m / k)",
          symbols: [
            { symbol: "T", name: "Chu kỳ dao động điều hòa", nameEn: "Oscillation period", unit: "s (giây)", unitEn: "seconds (s)" },
            { symbol: "Δl0", name: "Độ giãn tại vị trí cân bằng (Δl0 = P∥ / k)", nameEn: "Equilibrium stretch", unit: "cm", unitEn: "cm" }
          ]
        }
      ],
      sgkRef: "SGK KHTN 8 (Bài Mặt phẳng nghiêng) & Vật lý 10/11 (Động lực học & Dao động)",
      sgkRefEn: "Grade 8 Science & Grade 10/11 Physics (Dynamics & Harmonic Motion)",
      guideSteps: [
        "Bước 1: Chọn chế độ (Vật trượt xuống, Kéo vật lên, hoặc Dao động lò xo).",
        "Bước 2: Thay đổi góc nghiêng θ, khối lượng m và hệ số ma sát μ bằng các thanh trượt.",
        "Bước 3: Nhấn 'Bắt Đầu Chuyển Động' để quan sát chuyển động và lực kế.",
        "Bước 4: Nhấn 'Ghi Bảng Số Liệu Mặt Phẳng Nghiêng' để lưu kết quả."
      ],
      guideStepsEn: [
        "Step 1: Select mode (Sliding Down, Pulling Up, or Spring Oscillator).",
        "Step 2: Adjust incline angle θ, mass m, and friction coefficient μ using sliders.",
        "Step 3: Click 'Start Motion' to observe animation and force vectors.",
        "Step 4: Click 'Record Inclined Plane Data' to log results."
      ]
    },
    defaultParams: { mode: "slide_down", angleDeg: 30, massKg: 5, frictionCoeff: 0.15, springK: 100 },
    challenges: [
      {
        id: "c1",
        question: "Một vật nặng m = 4 kg trượt trên mặt phẳng nghiêng góc 30° không ma sát (g = 9.8 m/s²). Thành phần lực P∥ kéo vật trượt xuống bằng bao nhiêu?",
        questionEn: "A mass m = 4 kg slides on a frictionless 30° inclined plane (g = 9.8 m/s²). What is the parallel force component P∥?",
        options: [
          "P∥ = 39.2 N",
          "P∥ = 19.6 N",
          "P∥ = 33.9 N",
          "P∥ = 9.8 N"
        ],
        optionsEn: [
          "P∥ = 39.2 N",
          "P∥ = 19.6 N",
          "P∥ = 33.9 N",
          "P∥ = 9.8 N"
        ],
        correctIndex: 1,
        explanation: "P∥ = m * g * sin(30°) = 4 * 9.8 * 0.5 = 19.6 N.",
        explanationEn: "P∥ = m * g * sin(30°) = 4 * 9.8 * 0.5 = 19.6 N."
      }
    ]
  },
  {
    id: "g8-pulley",
    grade: 8,
    gradeLabel: "Grade 8",
    curriculum: "VN",
    category: "Cơ học",
    title: "Khảo sát Ròng rọc Cố định & Ròng rọc Động",
    titleEn: "Fixed & Movable Pulleys (Mechanical Advantage)",
    subtitle: "Khảo sát lực kéo, đường đi của dây và công cơ học khi sử dụng ròng rọc cố định và ròng rọc động",
    subtitleEn: "Investigate pulling force, rope distance, and mechanical work for fixed & movable pulleys",
    icon: "Scale",
    description: "Khảo sát sự thay đổi lực kéo F và đường đi s khi sử dụng Ròng rọc cố định (chỉ đổi hướng lực) và Ròng rọc động (giảm 1/2 lực kéo).",
    theory: {
      objective: "Kiểm chứng định luật bảo toàn công cơ học: Không một máy cơ đơn giản nào cho ta lợi về công. Được lợi bao nhiêu lần về lực thì thiệt bấy nhiêu lần về đường đi.",
      objectiveEn: "Verify the Golden Rule of Mechanics: No simple machine saves mechanical work. A gain in force corresponds to an equal loss in distance.",
      purpose: "Ứng dụng trong cần cẩu xây dựng, tời kéo giếng nước, thang máy, pa-lăng nhà xưởng và thiết bị nâng hạ hàng hóa.",
      purposeEn: "Applications in construction cranes, water well winches, elevators, industrial block & tackle hoists, and heavy cargo lifting.",
      summary: "Ròng rọc cố định giúp đổi hướng lực kéo (F = P = m·g, s = h). Ròng rọc động cho lợi 2 lần về lực (F = P / 2 = m·g / 2), nhưng thiệt 2 lần về đường đi (s = 2·h). Công thực hiện W = F·s = P·h không đổi.",
      summaryEn: "Fixed pulleys change force direction (F = P, s = h). Movable pulleys halve the required pulling force (F = P / 2), but double the required rope distance (s = 2·h). Work W = F·s = P·h remains constant.",
      formulas: [
        {
          label: "Lực kéo Ròng rọc cố định",
          labelEn: "Fixed Pulley Force",
          formula: "F = P = m · g",
          symbols: [
            { symbol: "F", name: "Lực kéo vật lên", nameEn: "Pulling force", unit: "N (Newton)", unitEn: "N (Newtons)" },
            { symbol: "P", name: "Trọng lượng vật nâng (P = m · g)", nameEn: "Weight of object", unit: "N (Newton)", unitEn: "N (Newtons)" }
          ]
        },
        {
          label: "Lực kéo Ròng rọc động",
          labelEn: "Movable Pulley Force",
          formula: "F = P / 2 = (m · g) / 2",
          symbols: [
            { symbol: "F", name: "Lực kéo giảm đi 1/2", nameEn: "Halved pulling force", unit: "N (Newton)", unitEn: "N (Newtons)" },
            { symbol: "s", name: "Quãng đường dây kéo (s = 2 · h)", nameEn: "Rope pulling distance", unit: "m (mét)", unitEn: "meters (m)" }
          ]
        },
        {
          label: "Công cơ học nâng vật",
          labelEn: "Mechanical Work",
          formula: "W = F · s = P · h",
          symbols: [
            { symbol: "W", name: "Công cơ học thực hiện", nameEn: "Mechanical work done", unit: "J (Joule)", unitEn: "J (Joules)" }
          ]
        }
      ],
      sgkRef: "SGK KHTN 8 (Bài Ròng rọc & Máy cơ đơn giản)",
      sgkRefEn: "Grade 8 Science & IGCSE Physics (Pulleys & Mechanical Advantage)",
      guideSteps: [
        "Bước 1: Chọn loại ròng rọc (Ròng rọc Cố định, Ròng rọc Động hoặc Hệ Palăng).",
        "Bước 2: Điều chỉnh khối lượng vật m (kg) và độ cao nâng h (m) bằng thanh trượt.",
        "Bước 3: Nhấn 'Bắt Đầu Kéo Nâng' để chuyển động mô phỏng và quan sát số chỉ lực kế F (N).",
        "Bước 4: Nhấn 'Ghi Bảng Số Liệu Ròng Rọc' để lưu kết quả."
      ],
      guideStepsEn: [
        "Step 1: Select pulley type (Fixed Pulley, Movable Pulley, or Block & Tackle).",
        "Step 2: Adjust object mass m (kg) and lifting height h (m) using sliders.",
        "Step 3: Click 'Start Lifting Motion' to run animation and observe dynamometer F (N).",
        "Step 4: Click 'Record Pulley Data' to save measurements."
      ]
    },
    defaultParams: { pulleyType: "fixed", massKg: 10, liftHeightM: 2.0 },
    challenges: [
      {
        id: "c1",
        question: "Dùng một ròng rọc động để nâng một vật nặng 200 N lên cao 2 m thì lực kéo F và quãng đường kéo dây s bằng bao nhiêu?",
        questionEn: "Using a movable pulley to lift a 200 N load by 2 m, what are the pulling force F and rope distance s?",
        options: [
          "F = 200 N, s = 2 m",
          "F = 100 N, s = 4 m",
          "F = 100 N, s = 2 m",
          "F = 400 N, s = 1 m"
        ],
        optionsEn: [
          "F = 200 N, s = 2 m",
          "F = 100 N, s = 4 m",
          "F = 100 N, s = 2 m",
          "F = 400 N, s = 1 m"
        ],
        correctIndex: 1,
        explanation: "Ròng rọc động cho lợi 2 lần về lực (F = 200 / 2 = 100 N), nhưng thiệt 2 lần về đường đi (s = 2 * 2 = 4 m).",
        explanationEn: "A movable pulley halves the force (F = 200 / 2 = 100 N) but doubles the rope distance (s = 2 * 2 = 4 m)."
      }
    ]
  },
  {
    id: "g8-lever",
    grade: 8,
    gradeLabel: "Grade 8",
    curriculum: "VN",
    category: "Cơ học",
    title: "Định luật Cân bằng Đòn bẩy & Qúa trình Lực",
    titleEn: "Levers & Torque Equilibrium Law",
    subtitle: "Khảo sát điều kiện cân bằng của đòn bẩy và moment lực",
    subtitleEn: "Investigate lever equilibrium conditions and moment of force",
    icon: "Scale",
    description: "Treo các quả cân ở hai bên điểm tựa O của đòn bẩy. Quan sát sự cân bằng lực khi F1 * d1 = F2 * d2.",
    theory: {
      objective: "Xác định điều kiện cân bằng của đòn bẩy khi có các lực tác dụng đặt tại các khoảng cách khác nhau so với điểm tựa O.",
      objectiveEn: "Determine lever equilibrium conditions when forces act at different effort arm distances from fulcrum O.",
      purpose: "Tối ưu hóa sức lao động con người, ứng dụng chế tạo cái kìm, bập bênh, cân đĩa, cần cẩu xây dựng, và đòn bẩy bẩy đá.",
      purposeEn: "Optimizes human effort; applications in pliers, seesaws, mechanical scales, construction cranes, and crowbars.",
      summary: "Đòn bẩy cân bằng khi tổng moment lực làm vật quay cùng chiều kim đồng hồ bằng tổng moment lực làm vật quay ngược chiều kim đồng hồ: F1 · d1 = F2 · d2.",
      summaryEn: "A lever is balanced when clockwise torque equals counter-clockwise torque: F1 · d1 = F2 · d2.",
      formulas: [
        {
          label: "Điều kiện cân bằng đòn bẩy",
          labelEn: "Lever Equilibrium Condition",
          formula: "F_1 · d_1 = F_2 · d_2",
          symbols: [
            { symbol: "F_1", name: "Lực tác dụng thứ nhất (trọng lượng quả cân 1)", nameEn: "First applied force", unit: "N (Newton)", unitEn: "N (Newtons)" },
            { symbol: "d_1", name: "Khoảng cách từ lực F_1 đến điểm tựa O", nameEn: "Distance from F_1 to fulcrum O", unit: "m (mét)", unitEn: "meters (m)" },
            { symbol: "F_2", name: "Lực tác dụng thứ hai (trọng lượng quả cân 2)", nameEn: "Second applied force", unit: "N (Newton)", unitEn: "N (Newtons)" },
            { symbol: "d_2", name: "Khoảng cách từ lực F_2 đến điểm tựa O", nameEn: "Distance from F_2 to fulcrum O", unit: "m (mét)", unitEn: "meters (m)" }
          ]
        },
        {
          label: "Trọng lượng quả cân treo",
          labelEn: "Hanging Mass Weight",
          formula: "P = m · g",
          symbols: [
            { symbol: "P", name: "Trọng lượng tác dụng lực lên thanh đòn", nameEn: "Weight force acting on lever", unit: "N (Newton)", unitEn: "N (Newtons)" },
            { symbol: "m", name: "Khối lượng quả cân treo", nameEn: "Hanging mass", unit: "kg", unitEn: "kg" },
            { symbol: "g", name: "Gia tốc trọng trường", nameEn: "Gravitational acceleration", unit: "m/s² (g ≈ 9.81 m/s²)", unitEn: "m/s² (g ≈ 9.81 m/s²)" }
          ]
        }
      ],
      sgkRef: "SGK KHTN 8 (Bài Đòn bẩy & Máy cơ đơn giản)",
      sgkRefEn: "Grade 8 Science Curriculum (Levers & Simple Machines)",
      guideSteps: [
        "Bước 1: Đặt thanh đòn bẩy cân bằng trên điểm tựa O.",
        "Bước 2: Treo quả cân khối lượng m1 ở vị trí d1 phía bên trái điểm tựa.",
        "Bước 3: Treo quả cân m2 phía bên phải và di chuyển đến vị trí d2 để thanh nằm ngang.",
        "Bước 4: Kiểm tra và đối chiếu tích moment lực F1 · d1 = F2 · d2."
      ],
      guideStepsEn: [
        "Step 1: Balance lever beam horizontally on fulcrum O.",
        "Step 2: Hang mass m1 at distance d1 to the left of fulcrum.",
        "Step 3: Hang mass m2 on the right and adjust to distance d2 until balanced horizontally.",
        "Step 4: Verify moment product equality F1 · d1 = F2 · d2."
      ]
    },
    defaultParams: { leftMass: 200, leftDistance: 15, rightMass: 300, rightDistance: 10, showForces: true },
    challenges: [
      {
        id: "c1",
        question: "Treo vật m1 = 400g cách tâm 10cm. Cần treo m2 = 200g ở khoảng cách bao nhiêu để đòn bẩy cân bằng?",
        questionEn: "Hanging mass m1 = 400g at 10cm from fulcrum. What distance d2 must mass m2 = 200g be placed to balance?",
        options: ["10 cm", "15 cm", "20 cm", "25 cm"],
        optionsEn: ["10 cm", "15 cm", "20 cm", "25 cm"],
        correctIndex: 2,
        explanation: "F1 · d1 = F2 · d2 => 400 · 10 = 200 · d2 => d2 = 20 cm.",
        explanationEn: "F1 · d1 = F2 · d2 => 400 · 10 = 200 · d2 => d2 = 20 cm."
      }
    ]
  },
  {
    id: "g9-circuit",
    grade: 9,
    gradeLabel: "Grade 9",
    curriculum: "VN",
    category: "Điện - Từ",
    title: "Định luật Ohm cho Đoạn mạch Nối tiếp & Song song",
    titleEn: "Ohm's Law for Series & Parallel Circuits",
    subtitle: "Lắp ráp mạch điện nối tiếp/song song, đo U, I và khảo sát định luật Ohm",
    subtitleEn: "Assemble series/parallel circuits, measure U, I and verify Ohm's law",
    icon: "Zap",
    description: "Phòng ráp mạch ảo kéo thả: Nguồn điện (Pin/Nguồn điều chỉnh), Điện trở R, Ampe kế, Vôn kế, Bóng đèn, Công tắc. Tự động tính toán dòng điện và điện áp theo định luật Ohm.",
    theory: {
      objective: "Khảo sát sự phụ thuộc của cường độ dòng điện I vào hiệu điện thế U và điện trở R trong đoạn mạch nối tiếp và song song.",
      objectiveEn: "Investigate current I relationship with voltage U and resistance R in series and parallel circuits.",
      purpose: "Rèn luyện kỹ năng lắp mạch điện thực tế, thiết kế mạng điện gia đình, tính chọn dây dẫn, cầu chì và công suất tiêu thụ.",
      purposeEn: "Builds practical circuit design skills, household wiring, wire sizing, fuse protection, and power rating calculation.",
      summary: "Cường độ dòng điện chạy qua dây dẫn tỉ lệ thuận với hiệu điện thế giữa hai đầu dây và tỉ lệ nghịch với điện trở của dây: I = U / R.",
      summaryEn: "Current flowing through a conductor is directly proportional to voltage across it and inversely proportional to resistance: I = U / R.",
      formulas: [
        {
          label: "Định luật Ohm cho đoạn mạch",
          labelEn: "Ohm's Law Equation",
          formula: "I = U / R",
          symbols: [
            { symbol: "I", name: "Cường độ dòng điện qua mạch", nameEn: "Electric current", unit: "A (Amperes)", unitEn: "A (Amperes)" },
            { symbol: "U", name: "Hiệu điện thế hai đầu đoạn mạch", nameEn: "Terminal voltage", unit: "V (Volts)", unitEn: "V (Volts)" },
            { symbol: "R", name: "Điện trở tương đương của đoạn mạch", nameEn: "Equivalent resistance", unit: "Ω (Ohms)", unitEn: "Ω (Ohms)" }
          ]
        },
        {
          label: "Mạch ghép Nối tiếp",
          labelEn: "Series Combination Circuit",
          formula: "R_tđ = R_1 + R_2,   U = U_1 + U_2,   I = I_1 = I_2",
          symbols: [
            { symbol: "R_tđ", name: "Điện trở tương đương mạch nối tiếp", nameEn: "Series equivalent resistance", unit: "Ω", unitEn: "Ω" },
            { symbol: "U_1, U_2", name: "Hiệu điện thế trên từng điện trở", nameEn: "Voltage drop per resistor", unit: "V", unitEn: "V" },
            { symbol: "I", name: "Dòng điện chung qua các linh kiện", nameEn: "Shared series current", unit: "A", unitEn: "A" }
          ]
        },
        {
          label: "Mạch ghép Song song",
          labelEn: "Parallel Combination Circuit",
          formula: "1 / R_tđ = 1 / R_1 + 1 / R_2,   U = U_1 = U_2,   I = I_1 + I_2",
          symbols: [
            { symbol: "R_tđ", name: "Điện trở tương đương mạch song song", nameEn: "Parallel equivalent resistance", unit: "Ω", unitEn: "Ω" },
            { symbol: "U", name: "Hiệu điện thế chung giữa 2 đầu nút", nameEn: "Shared junction voltage", unit: "V", unitEn: "V" },
            { symbol: "I", name: "Tổng dòng điện rẽ nhánh", nameEn: "Total branch current", unit: "A", unitEn: "A" }
          ]
        }
      ],
      sgkRef: "SGK Vật lý 9 (Bài Định luật Ôm cho đoạn mạch)",
      sgkRefEn: "Grade 9 Physics Curriculum (Ohm's Law Circuits)",
      guideSteps: [
        "Bước 1: Điều chỉnh hiệu điện thế nguồn U (V).",
        "Bước 2: Đổi thông số các điện trở R1, R2 (Ω).",
        "Bước 3: Lựa chọn dạng mạch ghép Nối tiếp hoặc Song song.",
        "Bước 4: Đóng công tắc K, đọc chỉ số trên Ampe kế I và Vôn kế U.",
        "Bước 5: Khảo sát đường đặc tuyến I(U) dạng đường thẳng đi qua gốc tọa độ."
      ],
      guideStepsEn: [
        "Step 1: Adjust power supply voltage U (V).",
        "Step 2: Change resistor values R1, R2 (Ω).",
        "Step 3: Select Series or Parallel circuit topology.",
        "Step 4: Close switch K, read Ammeter current I and Voltmeter voltage U.",
        "Step 5: Observe linear I(U) characteristic curve passing through origin."
      ]
    },
    defaultParams: { voltage: 6, r1: 10, r2: 20, circuitType: "series", switchOpen: false },
    challenges: [
      {
        id: "c1",
        question: "Đặt hiệu điện thế U = 12V vào hai đầu điện trở R = 24 Ω. Cường độ dòng điện I qua mạch là bao nhiêu?",
        questionEn: "Applying voltage U = 12V across resistor R = 24 Ω, what is current I?",
        options: ["0.2 A", "0.5 A", "2 A", "288 A"],
        optionsEn: ["0.2 A", "0.5 A", "2 A", "288 A"],
        correctIndex: 1,
        explanation: "I = U / R = 12 / 24 = 0.5 A.",
        explanationEn: "I = U / R = 12 / 24 = 0.5 A."
      }
    ]
  },
  {
    id: "g10-projectile",
    grade: 10,
    gradeLabel: "Grade 10",
    curriculum: "VN",
    category: "Cơ học",
    title: "Định luật Chuyển động Ném xiên & Ném ngang",
    titleEn: "Projectile Motion & Parabolic Trajectory",
    subtitle: "Khảo sát quỹ đạo Parabol, tầm xa R, tầm cao Hmax của vật bị ném",
    subtitleEn: "Investigate parabolic trajectory, horizontal range L, max height Hmax and flight time",
    icon: "Target",
    description: "Mô phỏng pháo bắn vật thể với vận tốc đầu v0 và góc ném α. Theo dõi quỹ đạo thời gian thực, vận tốc vx, vy, năng lượng biến thiên.",
    theory: {
      objective: "Xác định dạng quỹ đạo Parabol, thời gian chuyển động t, tầm cao cực đại Hmax và tầm xa L theo góc ném α và vận tốc ban đầu v0.",
      objectiveEn: "Determine parabolic trajectory equation, flight time t, max height Hmax and max horizontal range L versus angle α and initial velocity v0.",
      purpose: "Ứng dụng trong tính toán đường đạn pháo, kỹ thuật nhảy xa thể thao, bắn súng và quỹ đạo vệ tinh.",
      purposeEn: "Applications in ballistics, athletics (long jump, basketball), and satellite launch trajectories.",
      summary: "Chuyển động ném xiên được phân tích thành 2 chuyển động thành phần vuông góc: Thẳng đều theo phương ngang Ox (v_x = v_0 · cos α) và biến đổi đều theo phương đứng Oy (v_y = v_0 · sin α - g·t).",
      summaryEn: "Projectile motion separates into horizontal uniform motion Ox (v_x = v_0 · cos α) and vertical accelerated motion Oy (v_y = v_0 · sin α - g·t).",
      formulas: [
        {
          label: "Tầm cao cực đại H_max",
          labelEn: "Maximum Height H_max",
          formula: "H_max = (v_0² · sin² α) / (2·g)",
          symbols: [
            { symbol: "H_max", name: "Tầm cao cực đại vật đạt tới", nameEn: "Peak altitude", unit: "m (mét)", unitEn: "meters (m)" },
            { symbol: "v_0", name: "Vận tốc ban đầu khi bắn", nameEn: "Initial launch velocity", unit: "m/s", unitEn: "m/s" },
            { symbol: "α", name: "Góc bắn hợp với phương ngang", nameEn: "Launch angle above horizontal", unit: "độ (°)", unitEn: "degrees (°)" },
            { symbol: "g", name: "Gia tốc trọng trường", nameEn: "Gravitational acceleration", unit: "m/s²", unitEn: "m/s²" }
          ]
        },
        {
          label: "Tầm xa cực đại L",
          labelEn: "Maximum Horizontal Range L",
          formula: "L = (v_0² · sin 2α) / g",
          symbols: [
            { symbol: "L", name: "Tầm xa tính đến điểm chạm đất", nameEn: "Horizontal range at ground impact", unit: "m (mét)", unitEn: "meters (m)" },
            { symbol: "v_0", name: "Vận tốc ban đầu", nameEn: "Initial launch velocity", unit: "m/s", unitEn: "m/s" },
            { symbol: "α", name: "Góc ném (đạt cực đại khi α = 45°)", nameEn: "Launch angle (max at α = 45°)", unit: "độ (°)", unitEn: "degrees (°)" }
          ]
        }
      ],
      sgkRef: "SGK Vật lý 10 (Bài Chuyển động ném xiên & ném ngang)",
      sgkRefEn: "Grade 10 Physics Curriculum (Projectile Motion)",
      guideSteps: [
        "Bước 1: Chọn vận tốc ban đầu v0 (m/s) và góc ném α (°).",
        "Bước 2: Tùy chọn bật/tắt lực cản không khí.",
        "Bước 3: Bấm nút 'Bắn' để kích hoạt mô phỏng đường bay Parabol.",
        "Bước 4: Theo dõi thời gian thực các thông số v_x, v_y, Hmax và tầm xa L."
      ],
      guideStepsEn: [
        "Step 1: Select launch velocity v0 (m/s) and angle α (°).",
        "Step 2: Toggle air drag resistance on/off.",
        "Step 3: Click 'Fire' button to launch parabolic flight trajectory.",
        "Step 4: Monitor real-time v_x, v_y, Hmax and horizontal range L."
      ]
    },
    defaultParams: { v0: 25, angle: 45, height: 0, gravity: 9.8, airResistance: false },
    challenges: [
      {
        id: "c1",
        question: "Bỏ qua sức cản không khí, với cùng vận tốc ban đầu v0, góc ném α nào cho tầm xa L đạt giá trị lớn nhất?",
        questionEn: "Neglecting air resistance, for a given launch speed v0, which angle α yields maximum horizontal range L?",
        options: ["30°", "45°", "60°", "90°"],
        optionsEn: ["30°", "45°", "60°", "90°"],
        correctIndex: 1,
        explanation: "L = (v0² · sin 2α) / g. sin 2α đạt cực đại = 1 khi 2α = 90° => α = 45°.",
        explanationEn: "L = (v0² · sin 2α) / g. sin 2α reaches max = 1 when 2α = 90° => α = 45°."
      }
    ]
  },
  {
    id: "g10-vertical-spring",
    grade: 10,
    gradeLabel: "Grade 10",
    curriculum: "VN",
    category: "Cơ học",
    title: "Khảo sát Lò xo Treo Thẳng Đứng & Dao động",
    titleEn: "Vertical Spring Stretch & Harmonic Oscillation",
    subtitle: "Khảo sát độ giãn lò xo treo thẳng đứng (Định luật Hooke), chu kỳ dao động và sự chuyển hóa cơ năng",
    subtitleEn: "Investigate vertical spring stretch (Hooke's Law), oscillation period, and mechanical energy",
    icon: "Activity",
    description: "Khảo sát 3 chế độ: Độ giãn lò xo Δl0 = (m·g)/k theo Định luật Hooke, Dao động điều hòa lò xo thẳng đứng với chu kỳ T = 2π√(m/k), và Bảo toàn cơ năng.",
    theory: {
      objective: "Xác định độ cứng k của lò xo treo thẳng đứng, đo chu kỳ dao động điều hòa T và kiểm chứng sự chuyển hóa qua lại giữa thế năng đàn hồi, thế năng trọng trường và động năng.",
      objectiveEn: "Determine spring constant k of vertical spring, measure harmonic oscillation period T, and verify conversion between elastic potential, gravitational potential, and kinetic energy.",
      purpose: "Ứng dụng trong lực kế lò xo treo, đồng hồ đo tải trọng, hệ thống giảm xóc ô tô/xe máy, và cân treo công nghiệp.",
      purposeEn: "Applications in spring scales, load cells, motorcycle/car suspension systems, and industrial hanging scales.",
      summary: "Độ giãn tại vị trí cân bằng: Δl0 = (m·g) / k. Lực đàn hồi kéo lên: F_đh = k·(Δl0 + x). Chu kỳ dao động điều hòa: T = 2π·√(m/k) = 2π·√(Δl0/g). Tần số: f = 1/T.",
      summaryEn: "Equilibrium stretch Δl0 = (m·g) / k. Upward elastic force F_đh = k·(Δl0 + x). Harmonic oscillation period T = 2π·√(m/k) = 2π·√(Δl0/g). Frequency f = 1/T.",
      formulas: [
        {
          label: "Định luật Hooke cho Lò xo treo",
          labelEn: "Hooke's Law for Vertical Spring",
          formula: "F_đh = P  <=>  k · Δl0 = m · g",
          symbols: [
            { symbol: "Δl0", name: "Độ giãn của lò xo tại vị trí cân bằng", nameEn: "Equilibrium stretch", unit: "m (mét)", unitEn: "m (meters)" },
            { symbol: "k", name: "Độ cứng (hệ số đàn hồi) của lò xo", nameEn: "Spring constant / stiffness", unit: "N/m", unitEn: "N/m" },
            { symbol: "m", name: "Khối lượng quả cân treo", nameEn: "Hanging mass", unit: "kg", unitEn: "kg" }
          ]
        },
        {
          label: "Chu kỳ Dao động Lò xo thẳng đứng",
          labelEn: "Vertical Spring Oscillation Period",
          formula: "T = 2π · √(m / k) = 2π · √(Δl0 / g)",
          symbols: [
            { symbol: "T", name: "Chu kỳ dao động điều hòa", nameEn: "Harmonic period", unit: "s (giây)", unitEn: "seconds (s)" },
            { symbol: "f", name: "Tần số dao động (f = 1 / T)", nameEn: "Frequency (f = 1 / T)", unit: "Hz (Hertz)", unitEn: "Hz" }
          ]
        }
      ],
      sgkRef: "SGK Vật lý 10 (Bài Định luật Hooke) & Vật lý 11 (Bài Con lắc lò xo)",
      sgkRefEn: "Grade 10/11 Physics Curriculum (Hooke's Law & Mass-Spring Oscillators)",
      guideSteps: [
        "Bước 1: Chọn chế độ (Độ giãn Lò xo, Dao động điều hòa, hoặc Bảo toàn Cơ năng).",
        "Bước 2: Thay đổi khối lượng quả cân m (kg) và độ cứng k (N/m) bằng thanh trượt.",
        "Bước 3: Quan sát thước đo cm bên trái để đọc độ giãn Δl0 và vị trí cân bằng VTCB.",
        "Bước 4: Nhấn 'Ghi Bảng Số Liệu Lò Xo Treo' để lưu kết quả đo."
      ],
      guideStepsEn: [
        "Step 1: Select mode (Hooke's Stretch, Harmonic Oscillation, or Mechanical Energy).",
        "Step 2: Adjust mass m (kg) and spring stiffness k (N/m) using sliders.",
        "Step 3: Observe left metric scale to read stretch Δl0 and equilibrium position.",
        "Step 4: Click 'Record Vertical Spring Data' to log results."
      ]
    },
    defaultParams: { mode: "hooke_stretch", massKg: 2.0, springK: 80, naturalLenCm: 20, amplitudeCm: 6 },
    challenges: [
      {
        id: "c1",
        question: "Treo quả cân m = 0.4 kg vào lò xo treo thẳng đứng có k = 100 N/m (g = 10 m/s²). Độ giãn Δl0 tại vị trí cân bằng bằng bao nhiêu?",
        questionEn: "Hanging mass m = 0.4 kg on vertical spring with k = 100 N/m (g = 10 m/s²). What is equilibrium stretch Δl0?",
        options: ["2 cm", "4 cm", "8 cm", "10 cm"],
        optionsEn: ["2 cm", "4 cm", "8 cm", "10 cm"],
        correctIndex: 1,
        explanation: "Δl0 = (m * g) / k = (0.4 * 10) / 100 = 0.04 m = 4 cm.",
        explanationEn: "Δl0 = (m * g) / k = (0.4 * 10) / 100 = 0.04 m = 4 cm."
      }
    ]
  },
  {
    id: "g10-free-fall",
    grade: 10,
    gradeLabel: "Grade 10",
    curriculum: "VN",
    category: "Cơ học",
    title: "Khảo sát Chuyển động Rơi Tự Do",
    titleEn: "Free Fall Motion & Gravity Acceleration",
    subtitle: "Khảo sát rơi tự do trong chân không (Thí nghiệm Galileo), cổng quang điện đo g và ảnh nhấp nháy Strobe",
    subtitleEn: "Investigate free fall motion in vacuum (Galileo experiment), photogate timers, and stroboscopic trajectory",
    icon: "ArrowDown",
    description: "Khảo sát 3 chế độ: Rơi tự do Galileo (Chân không vs Khí quyển), Cổng quang điện xác định gia tốc trọng trường g, và Ảnh nhấp nháy vị trí s = 1/2·g·t².",
    theory: {
      objective: "Kiểm chứng tính chất chuyển động rơi tự do là chuyển động thẳng nhanh dần đều với gia tốc g, chứng minh mọi vật rơi cùng tốc độ trong chân không.",
      objectiveEn: "Verify that free fall is uniformly accelerated linear motion with acceleration g, proving all objects fall at the exact same speed in a vacuum.",
      purpose: "Ứng dụng trong đo gia tốc trọng trường địa phương g, định vị vệ tinh GPS, nhảy dù tự do, và thiết kế tháp rơi môi trường không trọng lực.",
      purposeEn: "Applications in local gravity g measurement, GPS satellites, skydiving physics, and zero-gravity drop towers.",
      summary: "Vận tốc tức thời: v(t) = g · t. Quãng đường rơi: s(t) = 1/2 · g · t². Thời gian rơi từ độ cao h: t = √(2h / g). Vận tốc chạm đất: v = √(2gh).",
      summaryEn: "Instantaneous velocity: v(t) = g · t. Fall distance: s(t) = 1/2 · g · t². Fall time: t = √(2h / g). Impact speed: v = √(2gh).",
      formulas: [
        {
          label: "Công thức Chuyển động Rơi Tự Do",
          labelEn: "Free Fall Equations",
          formula: "v = g · t,   s = 1 / 2 · g · t²,   v² = 2 · g · s",
          symbols: [
            { symbol: "s", name: "Quãng đường rơi tự do", nameEn: "Fallen distance", unit: "m (mét)", unitEn: "m (meters)" },
            { symbol: "g", name: "Gia tốc trọng trường", nameEn: "Gravitational acceleration", unit: "m/s²", unitEn: "m/s²" },
            { symbol: "t", name: "Thời gian rơi", nameEn: "Fall duration", unit: "s (giây)", unitEn: "seconds (s)" },
            { symbol: "v", name: "Vận tốc tức thời", nameEn: "Instantaneous velocity", unit: "m/s", unitEn: "m/s" }
          ]
        }
      ],
      sgkRef: "SGK Vật lý 10 (Bài Chuyển động rơi tự do)",
      sgkRefEn: "Grade 10 Physics Curriculum (Free Fall Motion)",
      guideSteps: [
        "Bước 1: Chọn chế độ (Thí nghiệm Galileo, Cổng quang điện, hoặc Ảnh nhấp nháy).",
        "Bước 2: Thay đổi độ cao h (m) và chọn hành tinh / gia tốc trọng trường g (m/s²).",
        "Bước 3: Bật/Tắt ống chân không để so sánh tốc độ rơi của quả cầu sắt và lông chim.",
        "Bước 4: Nhấn 'Thả Rơi Vật' và xem bảng dữ liệu thời gian rơi t và vận tốc chạm đất v."
      ],
      guideStepsEn: [
        "Step 1: Select mode (Galileo Drop, Photogate Timers, or Stroboscopic Trajectory).",
        "Step 2: Adjust drop height h (m) and planet / gravity g (m/s²).",
        "Step 3: Toggle vacuum chamber on/off to compare iron ball vs feather drop.",
        "Step 4: Click 'Release Drop' to log fall time t and impact speed v."
      ]
    },
    defaultParams: { mode: "vacuum_vs_air", heightM: 45, gravityMs2: 9.81, isVacuum: true },
    challenges: [
      {
        id: "c1",
        question: "Một vật rơi tự do từ độ cao h = 45m ở nơi có g = 10 m/s². Thời gian t để vật chạm đất là bao nhiêu?",
        questionEn: "An object falls freely from height h = 45m where g = 10 m/s². What is fall time t to reach the ground?",
        options: ["2 s", "3 s", "4.5 s", "9 s"],
        optionsEn: ["2 s", "3 s", "4.5 s", "9 s"],
        correctIndex: 1,
        explanation: "t = √(2h / g) = √(2 * 45 / 10) = √9 = 3 s.",
        explanationEn: "t = √(2h / g) = √(2 * 45 / 10) = √9 = 3 s."
      }
    ]
  },
  {
    id: "g10-newton2",
    grade: 10,
    gradeLabel: "Grade 10",
    curriculum: "VN",
    category: "Cơ học",
    title: "Định luật II Newton & Gia tốc F = m·a",
    titleEn: "Newton's Second Law & Acceleration F = m·a",
    subtitle: "Khảo sát gia tốc a theo lực kéo F, khối lượng m và hệ số ma sát μ",
    subtitleEn: "Investigate acceleration a versus net applied force F, mass m and friction μ",
    icon: "Target",
    description: "Mô phỏng lực kéo tác dụng lên khối gỗ, quan sát gia tốc a, vận tốc v và quãng đường s biến thiên thời gian thực.",
    theory: {
      objective: "Kiểm chứng định luật II Newton: Gia tốc a tỉ lệ thuận với hợp lực F_net và tỉ lệ nghịch với khối lượng m của vật.",
      objectiveEn: "Verify Newton's second law: Acceleration a is directly proportional to net force F_net and inversely proportional to mass m.",
      purpose: "Hiểu rõ cơ chế gia tốc xe hơi, tính khoảng cách phanh an toàn giao thông, và tính lực kéo động cơ tên lửa/máy bay.",
      purposeEn: "Explains vehicle acceleration mechanics, safe braking distance, and aircraft/rocket engine thrust design.",
      summary: "Gia tốc của một vật cùng hướng với lực tác dụng. Độ lớn của gia tốc tỉ lệ thuận với độ lớn của lực và tỉ lệ nghịch với khối lượng của vật: a = F_net / m.",
      summaryEn: "An object's acceleration is in the direction of net force. Its magnitude is proportional to net force and inversely proportional to mass: a = F_net / m.",
      formulas: [
        {
          label: "Định luật II Newton",
          labelEn: "Newton's Second Law Equation",
          formula: "a = F_net / m = (F_kéo - F_ms) / m",
          symbols: [
            { symbol: "a", name: "Gia tốc chuyển động của vật", nameEn: "Object acceleration", unit: "m/s²", unitEn: "m/s²" },
            { symbol: "F_net", name: "Hợp lực tác dụng lên vật", nameEn: "Net resulting force", unit: "N (Newton)", unitEn: "N (Newtons)" },
            { symbol: "F_kéo", name: "Lực kéo tác dụng lên vật", nameEn: "Applied pull force", unit: "N (Newton)", unitEn: "N (Newtons)" },
            { symbol: "F_ms", name: "Lực ma sát trượt của mặt đường", nameEn: "Friction drag force", unit: "N (Newton)", unitEn: "N (Newtons)" },
            { symbol: "m", name: "Khối lượng của vật", nameEn: "Mass of the object", unit: "kg", unitEn: "kg" }
          ]
        },
        {
          label: "Lực ma sát trượt",
          labelEn: "Sliding Kinetic Friction",
          formula: "F_ms = μ · m · g",
          symbols: [
            { symbol: "F_ms", name: "Độ lớn lực ma sát trượt", nameEn: "Kinetic friction force", unit: "N (Newton)", unitEn: "N (Newtons)" },
            { symbol: "μ", name: "Hệ số ma sát trượt mặt tiếp xúc", nameEn: "Friction coefficient", unit: "không có đơn vị", unitEn: "dimensionless" },
            { symbol: "m", name: "Khối lượng của vật", nameEn: "Mass of the object", unit: "kg", unitEn: "kg" },
            { symbol: "g", name: "Gia tốc trọng trường", nameEn: "Gravitational acceleration", unit: "m/s² (g ≈ 9.81 m/s²)", unitEn: "m/s² (g ≈ 9.81 m/s²)" }
          ]
        }
      ],
      sgkRef: "SGK Vật lý 10 (Bài Các định luật Newton về chuyển động)",
      sgkRefEn: "Grade 10 Physics Curriculum (Newton's Laws of Motion)",
      guideSteps: [
        "Bước 1: Chỉnh lực kéo F (N) và khối lượng m (kg) của vật thể.",
        "Bước 2: Điều chỉnh hệ số ma sát μ trên mặt đường.",
        "Bước 3: Nhấn 'Chạy chuyển động' để quan sát gia tốc a, vận tốc v và quãng đường s."
      ],
      guideStepsEn: [
        "Step 1: Set pull force F (N) and object mass m (kg).",
        "Step 2: Adjust friction coefficient μ on surface track.",
        "Step 3: Click 'Start Motion' to observe acceleration a, velocity v and displacement s."
      ]
    },
    defaultParams: { force: 50, mass: 10, mu: 0.1 },
    challenges: [
      {
        id: "c1",
        question: "Lực kéo F = 50N tác dụng lên vật m = 10kg trên mặt phẳng không ma sát (μ = 0). Gia tốc a là bao nhiêu?",
        questionEn: "A force F = 50N acts on mass m = 10kg on a frictionless track (μ = 0). What is acceleration a?",
        options: ["2 m/s²", "5 m/s²", "10 m/s²", "500 m/s²"],
        optionsEn: ["2 m/s²", "5 m/s²", "10 m/s²", "500 m/s²"],
        correctIndex: 1,
        explanation: "a = F / m = 50 / 10 = 5 m/s².",
        explanationEn: "a = F / m = 50 / 10 = 5 m/s²."
      }
    ]
  },
  {
    id: "g10-momentum",
    grade: 10,
    gradeLabel: "Grade 10",
    curriculum: "VN",
    category: "Cơ học",
    title: "Định luật Bảo toàn Động lượng & Va chạm",
    titleEn: "Conservation of Momentum & Collision Law",
    subtitle: "Khảo sát va chạm đàn hồi/mềm giữa 2 xe và định luật bảo toàn động lượng",
    subtitleEn: "Investigate elastic/inelastic collisions between carts and momentum conservation",
    icon: "Scale",
    description: "Mô phỏng va chạm 2 xe m1 và m2. Kiểm chứng tổng động lượng P_tổng = m1·v1 + m2·v2 không đổi trước và sau va chạm.",
    theory: {
      objective: "Xác định sự bảo toàn tổng động lượng trong hệ kín trước và sau va chạm đàn hồi hoặc va chạm mềm.",
      objectiveEn: "Verify total linear momentum conservation in an isolated system before and after elastic/inelastic collisions.",
      purpose: "Giải thích lực giật lùi khi bắn súng, nguyên lý chuyển động tên lửa đẩy và phân tích an toàn va chạm giao thông.",
      purposeEn: "Explains gun recoil, rocket propulsion principles, and automotive crash safety physics.",
      summary: "Trong một hệ kín không có ngoại lực tác dụng, tổng động lượng của hệ trước va chạm luôn bằng tổng động lượng của hệ sau va chạm: p_trước = p_sau.",
      summaryEn: "In a closed isolated system with no external net forces, total momentum before collision equals total momentum after: p_initial = p_final.",
      formulas: [
        {
          label: "Định luật Bảo toàn Động lượng",
          labelEn: "Conservation of Linear Momentum",
          formula: "m_1 · v_1 + m_2 · v_2 = m_1 · v'_1 + m_2 · v'_2",
          symbols: [
            { symbol: "m_1, m_2", name: "Khối lượng hai vật va chạm", nameEn: "Masses of colliding objects", unit: "kg", unitEn: "kg" },
            { symbol: "v_1, v_2", name: "Vận tốc hai vật trước va chạm", nameEn: "Pre-collision velocities", unit: "m/s", unitEn: "m/s" },
            { symbol: "v'_1, v'_2", name: "Vận tốc hai vật sau va chạm", nameEn: "Post-collision velocities", unit: "m/s", unitEn: "m/s" }
          ]
        },
        {
          label: "Va chạm hoàn toàn mềm (e = 0)",
          labelEn: "Completely Inelastic Collision (e = 0)",
          formula: "V = (m_1 · v_1 + m_2 · v_2) / (m_1 + m_2)",
          symbols: [
            { symbol: "V", name: "Vận tốc chung của hai vật sau khi dính liền", nameEn: "Combined final velocity", unit: "m/s", unitEn: "m/s" }
          ]
        }
      ],
      sgkRef: "SGK Vật lý 10 (Bài Động lượng & Định luật bảo toàn động lượng)",
      sgkRefEn: "Grade 10 Physics Curriculum (Conservation of Momentum)",
      guideSteps: [
        "Bước 1: Chọn khối lượng m1, m2 và vận tốc ban đầu v1, v2.",
        "Bước 2: Chọn hệ số đàn hồi e (e = 1 va chạm đàn hồi, e = 0 va chạm mềm).",
        "Bước 3: Nhấn 'Bắt đầu va chạm' và ghi nhận vận tốc v1', v2' sau va chạm."
      ],
      guideStepsEn: [
        "Step 1: Set masses m1, m2 and initial velocities v1, v2.",
        "Step 2: Choose elasticity coefficient e (e = 1 elastic, e = 0 inelastic).",
        "Step 3: Click 'Start Collision' and record post-collision velocities v1', v2'."
      ]
    },
    defaultParams: { m1: 2, v1: 5, m2: 3, v2: -2, elasticity: 1.0 },
    challenges: [
      {
        id: "c1",
        question: "Xe m1 = 2kg (v1 = 5m/s) va chạm hoàn toàn mềm (e = 0) dính vào xe m2 = 3kg (v2 = 0). Vận tốc chung V sau va chạm là bao nhiêu?",
        questionEn: "Cart m1 = 2kg (v1 = 5m/s) collides inelastically (e = 0) and sticks to cart m2 = 3kg (v2 = 0). What is combined speed V?",
        options: ["1.0 m/s", "2.0 m/s", "2.5 m/s", "5.0 m/s"],
        optionsEn: ["1.0 m/s", "2.0 m/s", "2.5 m/s", "5.0 m/s"],
        correctIndex: 1,
        explanation: "V = (m1 · v1) / (m1 + m2) = (2 · 5) / (2 + 3) = 10 / 5 = 2.0 m/s.",
        explanationEn: "V = (m1 · v1) / (m1 + m2) = (2 · 5) / (2 + 3) = 10 / 5 = 2.0 m/s."
      }
    ]
  },
  {
    id: "g11-lens",
    grade: 11,
    gradeLabel: "Grade 11",
    curriculum: "VN",
    category: "Quang học",
    title: "Định luật Thấu kính Mỏng & Dựng ảnh Vật sáng",
    titleEn: "Thin Lens Equation & Geometric Optics",
    subtitle: "Xác định vị trí d', tính chất ảnh ảo/thật và độ phóng đại k qua thấu kính",
    subtitleEn: "Determine image distance d', real/virtual properties, and magnification k",
    icon: "Focus",
    description: "Mô phỏng trục chính, tiêu điểm F, F' và thấu kính. Kéo thả ngọn nến (vật sáng) để tạo ảnh. Vẽ 3 tia sáng chính.",
    theory: {
      objective: "Xác định khoảng cách ảnh d', độ phóng đại k và tính chất ảnh (thật/ảo) của vật sáng qua thấu kính mỏng.",
      objectiveEn: "Determine image distance d', magnification k, and real/virtual image nature through thin converging/diverging lenses.",
      purpose: "Thiết kế hệ quang học kính hiển vi, kính thiên văn, máy ảnh, kính điều trị tật khúc xạ mắt.",
      purposeEn: "Optical design for microscopes, astronomical telescopes, cameras, and corrective eyeglasses.",
      summary: "Công thức thấu kính mỏng mối liên hệ giữa tiêu cự f, khoảng cách vật d và khoảng cách ảnh d': 1/f = 1/d + 1/d'.",
      summaryEn: "Thin lens formula relates focal length f, object distance d, and image distance d': 1/f = 1/d + 1/d'.",
      formulas: [
        {
          label: "Công thức thấu kính mỏng",
          labelEn: "Thin Lens Equation",
          formula: "1 / f = 1 / d + 1 / d'",
          symbols: [
            { symbol: "f", name: "Tiêu cự thấu kính (f > 0: hội tụ, f < 0: phân kỳ)", nameEn: "Focal length (+ for convex, - for concave)", unit: "cm hoặc m", unitEn: "cm or m" },
            { symbol: "d", name: "Khoảng cách từ vật đến thấu kính", nameEn: "Object distance from lens", unit: "cm hoặc m", unitEn: "cm or m" },
            { symbol: "d'", name: "Khoảng cách từ ảnh đến thấu kính (d' > 0: thật, d' < 0: ảo)", nameEn: "Image distance (+ real, - virtual)", unit: "cm hoặc m", unitEn: "cm or m" }
          ]
        },
        {
          label: "Độ phóng đại ảnh k",
          labelEn: "Linear Magnification k",
          formula: "k = - d' / d = A'B' / AB",
          symbols: [
            { symbol: "k", name: "Độ phóng đại ảnh (k > 0: cùng chiều, k < 0: ngược chiều)", nameEn: "Magnification (+ upright, - inverted)", unit: "không có đơn vị", unitEn: "dimensionless" },
            { symbol: "AB", name: "Chiều cao vật sáng", nameEn: "Object height", unit: "cm", unitEn: "cm" },
            { symbol: "A'B'", name: "Chiều cao ảnh", nameEn: "Image height", unit: "cm", unitEn: "cm" }
          ]
        }
      ],
      sgkRef: "SGK Vật lý 11 (Bài Thấu kính mỏng)",
      sgkRefEn: "Grade 11 Physics Curriculum (Thin Lenses)",
      guideSteps: [
        "Bước 1: Chọn thấu kính Hội tụ (f > 0) hoặc Phân kỳ (f < 0).",
        "Bước 2: Chỉnh tiêu cự f và khoảng cách vật d.",
        "Bước 3: Quan sát đường truyền 3 tia sáng đặc biệt.",
        "Bước 4: Đọc khoảng cách ảnh d' và tính độ phóng đại k."
      ],
      guideStepsEn: [
        "Step 1: Select Converging (f > 0) or Diverging (f < 0) lens.",
        "Step 2: Adjust focal length f and object distance d.",
        "Step 3: Trace the 3 principal ray paths through optical center O.",
        "Step 4: Measure image distance d' and compute magnification k."
      ]
    },
    defaultParams: { lensType: "converging", focalLength: 20, objectDistance: 35, objectHeight: 10, showRays: true },
    challenges: [
      {
        id: "c1",
        question: "Vật sáng đặt trước thấu kính hội tụ tiêu cự f = 20cm một khoảng d = 30cm. Khoảng cách d' từ ảnh đến thấu kính là bao nhiêu?",
        questionEn: "An object is placed at d = 30cm before a convex lens of focal length f = 20cm. What is image distance d'?",
        options: ["12 cm", "30 cm", "60 cm", "-60 cm"],
        optionsEn: ["12 cm", "30 cm", "60 cm", "-60 cm"],
        correctIndex: 2,
        explanation: "1/f = 1/d + 1/d' => 1/20 = 1/30 + 1/d' => 1/d' = 1/60 => d' = 60 cm.",
        explanationEn: "1/f = 1/d + 1/d' => 1/20 = 1/30 + 1/d' => 1/d' = 1/60 => d' = 60 cm."
      }
    ]
  },
  {
    id: "g11-faraday",
    grade: 11,
    gradeLabel: "Grade 11",
    curriculum: "VN",
    category: "Điện - Từ",
    title: "Định luật Cảm ứng Điện từ Faraday & Từ thông",
    titleEn: "Faraday's Law of Electromagnetic Induction",
    subtitle: "Khảo sát suất điện động cảm ứng E = -N·dΦ/dt khi di chuyển nam châm qua cuộn dây",
    subtitleEn: "Investigate induced EMF E = -N·dΦ/dt when moving magnet through coil",
    icon: "Zap",
    description: "Mô phỏng di chuyển thanh nam châm N-S xuyên qua cuộn dây copper N vòng, quan sát kim điện kế nảy lệch và bóng đèn phát sáng.",
    theory: {
      objective: "Xác định hiện tượng xuất hiện suất điện động cảm ứng khi từ thông biến thiên qua cuộn dây.",
      objectiveEn: "Verify induced electromotive force generation when magnetic flux varies through a wire coil.",
      purpose: "Hiểu nguyên lý các máy phát điện thủy điện, nhiệt điện, máy biến áp và bếp từ gia đình.",
      purposeEn: "Understands generators in hydroelectric/thermal plants, transformers, and induction cooktops.",
      summary: "Suất điện động cảm ứng xuất hiện trong mạch kín tỉ lệ với tốc độ biến thiên từ thông gửi qua mạch: E = -N · (ΔΦ / Δt).",
      summaryEn: "Induced electromotive force in a closed loop is proportional to the rate of change of magnetic flux: E = -N · (ΔΦ / Δt).",
      formulas: [
        {
          label: "Định luật Faraday",
          labelEn: "Faraday's Law of Induction",
          formula: "E = -N · (ΔΦ / Δt)",
          symbols: [
            { symbol: "E", name: "Suất điện động cảm ứng", nameEn: "Induced electromotive force", unit: "V (Volt)", unitEn: "V (Volts)" },
            { symbol: "N", name: "Số vòng dây của cuộn dây", nameEn: "Number of coil turns", unit: "vòng", unitEn: "turns" },
            { symbol: "ΔΦ", name: "Độ biến thiên từ thông qua 1 vòng dây", nameEn: "Magnetic flux change per turn", unit: "Wb (Weber)", unitEn: "Wb (Webers)" },
            { symbol: "Δt", name: "Thời gian biến thiên từ thông", nameEn: "Time interval", unit: "s (giây)", unitEn: "seconds (s)" }
          ]
        },
        {
          label: "Từ thông qua vòng dây",
          labelEn: "Magnetic Flux Equation",
          formula: "Φ = B · S · cos α",
          symbols: [
            { symbol: "Φ", name: "Từ thông gửi qua vòng dây", nameEn: "Magnetic flux", unit: "Wb (Weber)", unitEn: "Wb (Webers)" },
            { symbol: "B", name: "Cảm ứng từ của từ trường", nameEn: "Magnetic field B", unit: "T (Tesla)", unitEn: "T (Teslas)" },
            { symbol: "S", name: "Diện tích khung dây", nameEn: "Coil area", unit: "m²", unitEn: "m²" },
            { symbol: "α", name: "Góc giữa B và pháp tuyến mặt phẳng S", nameEn: "Angle between B and normal vector", unit: "độ (°)", unitEn: "degrees (°)" }
          ]
        }
      ],
      sgkRef: "SGK Vật lý 11 (Bài Hiện tượng cảm ứng điện từ)",
      sgkRefEn: "Grade 11 Physics Curriculum (Electromagnetic Induction)",
      guideSteps: [
        "Bước 1: Chọn số vòng dây cuộn N (từ 2 đến 10 vòng).",
        "Bước 2: Thay đổi tốc độ di chuyển thanh nam châm.",
        "Bước 3: Đọc độ lệch kim điện kế và quan sát bóng đèn sáng."
      ],
      guideStepsEn: [
        "Step 1: Set number of coil turns N (2 to 10 turns).",
        "Step 2: Vary speed of bar magnet insertion through coil.",
        "Step 3: Observe Galvanometer needle deflection and light bulb brightness."
      ]
    },
    defaultParams: { numTurns: 4, magnetSpeed: 5 },
    challenges: [
      {
        id: "c1",
        question: "Khi giữ thanh nam châm đứng yên hoàn toàn bên trong cuộn dây, suất điện động cảm ứng E bằng bao nhiêu?",
        questionEn: "When holding the magnet completely stationary inside the coil, what is induced EMF E?",
        options: ["Cực đại", "Bằng 0", "Âm", "Tỉ lệ với N"],
        optionsEn: ["Maximum", "Zero", "Negative", "Proportional to N"],
        correctIndex: 1,
        explanation: "Nam châm đứng yên => Từ thông không biến thiên (ΔΦ/Δt = 0) => E = 0.",
        explanationEn: "Magnet stationary => No magnetic flux change (ΔΦ/Δt = 0) => E = 0."
      }
    ]
  },
  {
    id: "g11-capacitor",
    grade: 11,
    gradeLabel: "Grade 11",
    curriculum: "VN",
    category: "Điện - Từ",
    title: "Định luật Điện môi & Điện dung Tụ điện",
    titleEn: "Parallel Plate Capacitor & Dielectrics Law",
    subtitle: "Khảo sát điện dung C = ε·ε0·A/d, điện tích Q = C·U và năng lượng W",
    subtitleEn: "Investigate capacitance C = ε·ε0·A/d, charge Q = C·U and energy W",
    icon: "Zap",
    description: "Mô phỏng thay đổi diện tích bản A, khoảng cách d, hiệu điện thế U và lớp chất điện môi ε giữa 2 bản tụ phẳng.",
    theory: {
      objective: "Xác định sự phụ thuộc của điện dung C vào diện tích A, khoảng cách d và chất điện môi ε giữa 2 bản tụ phẳng.",
      objectiveEn: "Determine parallel plate capacitance C dependence on area A, separation d and dielectric constant ε.",
      purpose: "Chế tạo màn hình cảm ứng điện dung, mạch lọc nguồn pin, máy kích tim y tế và mạch thu sóng wifi.",
      purposeEn: "Applications in capacitive touchscreens, power supply filter capacitors, medical defibrillators, and RF tuners.",
      summary: "Điện dung tụ phẳng tỉ lệ thuận với diện tích bản A, hằng số điện môi ε và tỉ lệ nghịch với khoảng cách d: C = (ε · ε₀ · A) / d.",
      summaryEn: "Capacitance is directly proportional to plate area A, dielectric constant ε and inversely proportional to gap d: C = (ε · ε₀ · A) / d.",
      formulas: [
        {
          label: "Điện dung tụ điện phẳng",
          labelEn: "Parallel Plate Capacitance",
          formula: "C = (ε · ε₀ · A) / d",
          symbols: [
            { symbol: "C", name: "Điện dung của tụ điện", nameEn: "Capacitance", unit: "F (Farad) hoặc pF", unitEn: "F (Farads) or pF" },
            { symbol: "ε", name: "Hằng số điện môi của lớp cách điện", nameEn: "Dielectric constant", unit: "không có đơn vị", unitEn: "dimensionless" },
            { symbol: "ε₀", name: "Hằng số điện chân không", nameEn: "Vacuum permittivity constant", unit: "8.854 × 10⁻¹² F/m", unitEn: "8.854 × 10⁻¹² F/m" },
            { symbol: "A", name: "Diện tích bản tụ phẳng", nameEn: "Plate area", unit: "m²", unitEn: "m²" },
            { symbol: "d", name: "Khoảng cách giữa hai bản tụ", nameEn: "Plate gap separation", unit: "m", unitEn: "m" }
          ]
        },
        {
          label: "Năng lượng tích trữ trong tụ",
          labelEn: "Stored Electric Field Energy",
          formula: "W = (1/2) · C · U² = (1/2) · Q · U",
          symbols: [
            { symbol: "W", name: "Năng lượng điện trường trong tụ", nameEn: "Stored electric energy", unit: "J (Joule) hoặc µJ", unitEn: "J (Joules) or µJ" },
            { symbol: "Q", name: "Điện tích của tụ điện (Q = C · U)", nameEn: "Stored charge", unit: "C (Coulomb) hoặc nC", unitEn: "C (Coulombs) or nC" },
            { symbol: "U", name: "Hiệu điện thế giữa 2 bản tụ", nameEn: "Charging voltage", unit: "V (Volt)", unitEn: "V (Volts)" }
          ]
        }
      ],
      sgkRef: "SGK Vật lý 11 (Bài Tụ điện & Điện dung)",
      sgkRefEn: "Grade 11 Physics Curriculum (Capacitors & Capacitance)",
      guideSteps: [
        "Bước 1: Nhập hiệu điện thế U (V).",
        "Bước 2: Đổi diện tích bản A (mm²) và khoảng cách d (mm).",
        "Bước 3: Chọn chất điện môi ε giữa 2 bản.",
        "Bước 4: Ghi nhận C (pF), điện tích Q (nC) và năng lượng W (µJ)."
      ],
      guideStepsEn: [
        "Step 1: Set charging voltage U (V).",
        "Step 2: Adjust plate area A (mm²) and separation d (mm).",
        "Step 3: Select dielectric material ε.",
        "Step 4: Record capacitance C (pF), charge Q (nC) and energy W (µJ)."
      ]
    },
    defaultParams: { voltage: 6, plateAreaMm2: 200, separationMm: 6, dielectricEps: 1.0 },
    challenges: [
      {
        id: "c1",
        question: "Giảm khoảng cách d giữa hai bản tụ phẳng đi một nửa (d' = d/2), thì điện dung C thay đổi như thế nào?",
        questionEn: "If plate separation d is halved (d' = d/2), how does capacitance C change?",
        options: ["Giảm 2 lần", "Tăng 2 lần", "Tăng 4 lần", "Không đổi"],
        optionsEn: ["Halved", "Doubled", "Quadrupled", "Unchanged"],
        correctIndex: 1,
        explanation: "C = (ε · ε0 · A) / d. d giảm 2 => C tăng 2 lần.",
        explanationEn: "C = (ε · ε0 · A) / d. Halving d doubles C."
      }
    ]
  },
  {
    id: "g12-rlc",
    grade: 12,
    gradeLabel: "Grade 12",
    curriculum: "VN",
    category: "Điện - Từ",
    title: "Định luật Cộng hưởng Điện & Mạch RLC Xoay chiều",
    titleEn: "AC Series RLC Circuit & Electrical Resonance",
    subtitle: "Khảo sát dao động dòng điện, điện áp trên Oscilloscope và hiện tượng cộng hưởng",
    subtitleEn: "Analyze sine wave voltage/current on Oscilloscope CRT screen and resonance",
    icon: "Activity",
    description: "Mô phỏng nguồn điện xoay chiều u = U0cos(2πft). Điều chỉnh R, L, C, tần số f. Quan sát độ lệch pha, tổng trở Z, hiện tượng cộng hưởng ZL = ZC và sóng điện áp u, i trên màn hình Oscilloscope.",
    theory: {
      objective: "Khảo sát tổng trở Z của mạch RLC và điều kiện cộng hưởng điện Z_L = Z_C để I đạt cực đại.",
      objectiveEn: "Investigate RLC impedance Z and electrical resonance condition Z_L = Z_C for maximum current I.",
      purpose: "Ứng dụng trong chọn sóng đài radio/TV, mạch lọc âm tần và nâng cao hệ số công suất cos φ mạng điện.",
      purposeEn: "Applications in radio/TV tuning circuits, audio bandpass filters, and power factor correction.",
      summary: "Mạch RLC mắc nối tiếp có tổng trở Z = √[R² + (Z_L - Z_C)²]. Khi Z_L = Z_C, cộng hưởng điện xảy ra và I đạt giá trị cực đại I = U / R.",
      summaryEn: "Series RLC impedance Z = √[R² + (Z_L - Z_C)²]. At resonance Z_L = Z_C, current reaches maximum I = U / R.",
      formulas: [
        {
          label: "Cảm kháng và Dung kháng",
          labelEn: "Inductive & Capacitive Reactance",
          formula: "Z_L = 2π · f · L,   Z_C = 1 / (2π · f · C)",
          symbols: [
            { symbol: "Z_L", name: "Cảm kháng của cuộn cảm L", nameEn: "Inductive reactance", unit: "Ω (Ohm)", unitEn: "Ω (Ohms)" },
            { symbol: "Z_C", name: "Dung kháng của tụ điện C", nameEn: "Capacitive reactance", unit: "Ω (Ohm)", unitEn: "Ω (Ohms)" },
            { symbol: "f", name: "Tần số dòng điện xoay chiều", nameEn: "AC source frequency", unit: "Hz", unitEn: "Hz" },
            { symbol: "L", name: "Độ tự cảm cuộn dây", nameEn: "Inductance", unit: "H (Henry)", unitEn: "H (Henries)" },
            { symbol: "C", name: "Điện dung tụ điện", nameEn: "Capacitance", unit: "F (Farad)", unitEn: "F (Farads)" }
          ]
        },
        {
          label: "Tổng trở mạch RLC",
          labelEn: "Total RLC Impedance",
          formula: "Z = √[R² + (Z_L - Z_C)²]",
          symbols: [
            { symbol: "Z", name: "Tổng trở của đoạn mạch", nameEn: "Total AC impedance", unit: "Ω (Ohm)", unitEn: "Ω (Ohms)" },
            { symbol: "R", name: "Điện trở thuần", nameEn: "Pure resistance", unit: "Ω (Ohm)", unitEn: "Ω (Ohms)" }
          ]
        },
        {
          label: "Tần số Cộng hưởng điện",
          labelEn: "Resonating Frequency f0",
          formula: "f_0 = 1 / (2π · √(L · C))",
          symbols: [
            { symbol: "f_0", name: "Tần số cộng hưởng (I cực đại)", nameEn: "Resonance frequency (I max)", unit: "Hz", unitEn: "Hz" }
          ]
        }
      ],
      sgkRef: "SGK Vật lý 12 (Bài Mạch RLC nối tiếp & Cộng hưởng điện)",
      sgkRefEn: "Grade 12 Physics Curriculum (AC Series RLC Circuits)",
      guideSteps: [
        "Bước 1: Nhập hiệu điện thế U (V) và tần số f (Hz).",
        "Bước 2: Thay đổi R (Ω), L (mH), C (µF).",
        "Bước 3: Quan sát sóng u(t), i(t) trên Oscilloscope.",
        "Bước 4: Chỉnh f về f0 để tạo cộng hưởng điện (I cực đại)."
      ],
      guideStepsEn: [
        "Step 1: Set RMS voltage U (V) and frequency f (Hz).",
        "Step 2: Modify R (Ω), L (mH), C (µF).",
        "Step 3: View u(t) and i(t) sine waves on Oscilloscope display.",
        "Step 4: Tune f to f0 to achieve electrical resonance (maximum current I)."
      ]
    },
    defaultParams: { voltageRms: 220, frequency: 50, r: 50, inductancemH: 318, capacitanceuF: 31.8, timeScale: 1 },
    challenges: [
      {
        id: "c1",
        question: "Khi trong mạch RLC nối tiếp xảy ra hiện tượng cộng hưởng điện (ZL = ZC), tổng trở Z của mạch bằng bao nhiêu?",
        questionEn: "At electrical resonance (ZL = ZC) in a series RLC circuit, what is total impedance Z equal to?",
        options: ["Z = 0", "Z = R", "Z = ZL + ZC", "Z = sqrt(ZL * ZC)"],
        optionsEn: ["Z = 0", "Z = R", "Z = ZL + ZC", "Z = sqrt(ZL * ZC)"],
        correctIndex: 1,
        explanation: "Z = √[R²] = R.",
        explanationEn: "Z = √[R²] = R."
      }
    ]
  },
  {
    id: "g12-lc-oscillator",
    grade: 12,
    gradeLabel: "Grade 12",
    curriculum: "VN",
    category: "Điện - Từ",
    title: "Mạch Dao Động Điện Từ LC & Sóng Điện Từ",
    titleEn: "Electromagnetic LC Oscillator & EM Waves",
    subtitle: "Khảo sát dao động điện tích q(t), dòng điện i(t) và chuyển hóa năng lượng điện - từ",
    subtitleEn: "Investigate charge q(t), current i(t) and electric-magnetic energy exchange",
    icon: "Radio",
    description: "Mô phỏng nạp điện cho tụ C từ nguồn DC và đóng khóa sang cuộn cảm L. Khảo sát dao động điện từ điều hòa q(t), i(t) trên dao động ký CRO, chu kỳ Thomson T = 2π√(LC) và bước sóng λ = c·T.",
    theory: {
      objective: "Kiểm chứng sự biến thiên tuần hoàn của điện tích q(t), điện áp u(t) và dòng điện i(t) trong mạch dao động LC; khảo sát sự bảo toàn năng lượng điện từ.",
      objectiveEn: "Verify periodic oscillation of charge q(t), voltage u(t) and current i(t) in an LC tank circuit; investigate total electromagnetic energy conservation.",
      purpose: "Ứng dụng cốt lõi trong thu - phát sóng vô tuyến Radio, truyền hình TV, viễn thông 5G/Wifi, radar định vị và thẻ từ RFID.",
      purposeEn: "Foundational application in radio/TV transmitters and receivers, 5G/Wi-Fi wireless communications, radar, and contactless RFID cards.",
      summary: "Mạch LC gồm cuộn cảm thuần L mắc nối tiếp với tụ điện C tạo thành mạch dao động điện từ tự do. Điện tích và dòng điện biến thiên điều hòa lệch pha nhau π/2.",
      summaryEn: "An ideal LC circuit consists of an inductor L connected in closed loop with a capacitor C, generating undamped sinusoidal electromagnetic oscillations with a π/2 phase difference between current and charge.",
      formulas: [
        {
          label: "Chu kỳ & Tần số dao động riêng Thomson",
          labelEn: "Thomson Natural Period & Frequency",
          formula: "T = 2π · √(L · C),   f = 1 / (2π · √(L · C))",
          symbols: [
            { symbol: "T", name: "Chu kỳ dao động riêng", nameEn: "Oscillation period", unit: "s hoặc µs", unitEn: "s or µs" },
            { symbol: "f", name: "Tần số dao động riêng", nameEn: "Natural frequency", unit: "Hz hoặc kHz", unitEn: "Hz or kHz" },
            { symbol: "L", name: "Độ tự cảm cuộn dây", nameEn: "Inductance", unit: "H (Henry) hoặc mH", unitEn: "H or mH" },
            { symbol: "C", name: "Điện dung của tụ điện", nameEn: "Capacitance", unit: "F (Farad) hoặc µF", unitEn: "F or µF" }
          ]
        },
        {
          label: "Bước sóng điện từ trong chân không",
          labelEn: "Electromagnetic Wavelength in Vacuum",
          formula: "λ = c · T = 2π · c · √(L · C)",
          symbols: [
            { symbol: "λ", name: "Bước sóng điện từ thu/phát", nameEn: "EM wavelength", unit: "m hoặc km", unitEn: "meters or km" },
            { symbol: "c", name: "Tốc độ ánh sáng trong chân không", nameEn: "Speed of light", unit: "3 × 10⁸ m/s", unitEn: "3 × 10⁸ m/s" }
          ]
        },
        {
          label: "Bảo toàn Năng lượng Điện từ",
          labelEn: "Conservation of Electromagnetic Energy",
          formula: "W = W_C + W_L = (1/2) · (q² / C) + (1/2) · L · i² = const",
          symbols: [
            { symbol: "W", name: "Năng lượng điện từ toàn phần", nameEn: "Total EM energy", unit: "J (Joule) hoặc mJ", unitEn: "J or mJ" },
            { symbol: "W_C", name: "Năng lượng điện trường trong tụ", nameEn: "Electric field energy", unit: "J (Joule) hoặc mJ", unitEn: "J or mJ" },
            { symbol: "W_L", name: "Năng lượng từ trường trong cuộn cảm", nameEn: "Magnetic field energy", unit: "J (Joule) hoặc mJ", unitEn: "J or mJ" }
          ]
        }
      ],
      sgkRef: "SGK Vật lý 12 (Chuyên đề Mạch Dao Động Điện Từ LC & Sóng Điện Từ)",
      sgkRefEn: "Grade 12 Physics & Cambridge A Level Physics (Topic: Electromagnetic Oscillations & Waves)",
      guideSteps: [
        "Bước 1: Bật khóa chuyển K sang vị trí '1. Nạp Điện (E)' để tích điện đầy cho tụ điện C.",
        "Bước 2: Chuyển khóa K sang vị trí '2. Phóng LC' để đóng kín mạch LC và kích hoạt dao động điện từ.",
        "Bước 3: Điều chỉnh L (mH), C (µF), U0 (V) và quan sát dạng sóng u(t), i(t) trên màn hình dao động ký Oscilloscope.",
        "Bước 4: Tăng điện trở tiêu hao R để quan sát hiện tượng dao động tắt dần."
      ],
      guideStepsEn: [
        "Step 1: Switch dual key K to position '1. DC Charge' to charge capacitor C from DC power supply.",
        "Step 2: Flip key K to position '2. LC Oscillate' to close the LC loop and initiate electromagnetic oscillations.",
        "Step 3: Adjust L (mH), C (µF), U0 (V) and observe the u(t) and i(t) waveforms on the CRT Oscilloscope.",
        "Step 4: Increase damping resistance R to observe damped electromagnetic decay."
      ]
    },
    defaultParams: { switchState: "oscillate", inductancemH: 5.0, capacitanceuF: 2.0, initialVoltage: 12.0, resistanceOhm: 0.0 },
    challenges: [
      {
        id: "c1",
        question: "Trong mạch dao động LC lý tưởng, khi điện tích trên bản tụ điện đạt giá trị cực đại q = Q0 thì cường độ dòng điện i trong mạch bằng bao nhiêu?",
        questionEn: "In an ideal LC circuit, when capacitor charge reaches maximum q = Q0, what is the current i in the circuit?",
        options: ["i = I0", "i = 0", "i = I0 / 2", "i = I0 / √2"],
        optionsEn: ["i = I0", "i = 0", "i = I0 / 2", "i = I0 / √2"],
        correctIndex: 1,
        explanation: "Khi q = Q0, toàn bộ năng lượng tập trung ở điện trường tụ điện (W_C = W_max) nên năng lượng từ trường W_L = 0 => Dòng điện i = 0.",
        explanationEn: "When q = Q0, all energy is stored in the electric field of capacitor (W_C = W_max), so magnetic energy W_L = 0, which means current i = 0."
      }
    ]
  },
  {
    id: "g12-standingwave",
    grade: 12,
    gradeLabel: "Grade 12",
    curriculum: "VN",
    category: "Cơ học",
    title: "Định luật Sóng dừng trên Dây L = k·λ/2",
    titleEn: "Standing Waves on a String L = k·λ/2",
    subtitle: "Khảo sát điều kiện sóng dừng L = k·λ/2, tần số cộng hưởng và bụng/nút sóng",
    subtitleEn: "Investigate standing wave condition L = k·λ/2, harmonic modes and nodes/antinodes",
    icon: "Activity",
    description: "Mô phỏng sóng dừng 2 đầu cố định với k bụng sóng, tốc độ sóng v = sqrt(T/μ) và bước sóng λ = 2L/k.",
    theory: {
      objective: "Kiểm chứng điều kiện hình thành sóng dừng trên dây 2 đầu cố định L = k · λ / 2 và xác định tốc độ truyền sóng v.",
      objectiveEn: "Verify fixed-end standing wave condition L = k · λ / 2 and determine wave speed v.",
      purpose: "Chế tạo các nhạc cụ dây (Guitar, Violin, Đàn bầu) và kiểm định dao động cầu treo dây văng.",
      purposeEn: "Instrument design for string instruments (Guitar, Violin) and suspension bridge structural vibration testing.",
      summary: "Sóng dừng xảy ra do sự giao thoa sóng tới và sóng phản xạ. Trên dây tạo thành các Nút sóng (đứng yên) và Bụng sóng (biên độ cực đại).",
      summaryEn: "Standing waves form by interference between incident and reflected waves, producing stationary nodes and max-amplitude antinodes.",
      formulas: [
        {
          label: "Điều kiện sóng dừng 2 đầu cố định",
          labelEn: "Fixed-End Standing Wave Condition",
          formula: "L = k · (λ / 2)    (k = 1, 2, 3...)",
          symbols: [
            { symbol: "L", name: "Chiều dài sợi dây", nameEn: "String length", unit: "m (mét)", unitEn: "meters (m)" },
            { symbol: "k", name: "Bậc họa âm (số bụng sóng)", nameEn: "Harmonic mode k (number of antinodes)", unit: "bụng (nguyên)", unitEn: "integer loop mode" },
            { symbol: "λ", name: "Bước sóng của sóng dừng", nameEn: "Wavelength", unit: "m (mét)", unitEn: "meters (m)" }
          ]
        },
        {
          label: "Tốc độ truyền sóng trên dây",
          labelEn: "Transverse Wave Speed",
          formula: "v = √(T / μ) => λ = v / f",
          symbols: [
            { symbol: "v", name: "Tốc độ lan truyền sóng", nameEn: "Wave velocity", unit: "m/s", unitEn: "m/s" },
            { symbol: "T", name: "Lực căng hai đầu dây", nameEn: "String tension force", unit: "N (Newton)", unitEn: "N (Newtons)" },
            { symbol: "μ", name: "Mật độ khối lượng dây", nameEn: "Linear mass density", unit: "kg/m", unitEn: "kg/m" },
            { symbol: "f", name: "Tần số sóng", nameEn: "Vibration frequency", unit: "Hz", unitEn: "Hz" }
          ]
        }
      ],
      sgkRef: "SGK Vật lý 12 (Bài Sóng dừng)",
      sgkRefEn: "Grade 12 Physics Curriculum (Standing Waves)",
      guideSteps: [
        "Bước 1: Chọn bậc họa âm k (số bụng sóng).",
        "Bước 2: Chỉnh lực căng dây T (N) và chiều dài L (m).",
        "Bước 3: Nhấn 'Chạy sóng dừng' và theo dõi Nút sóng (đỏ) và Bụng sóng."
      ],
      guideStepsEn: [
        "Step 1: Select harmonic loop mode k.",
        "Step 2: Set string tension T (N) and length L (m).",
        "Step 3: Click 'Start Wave' to observe stationary red nodes and vibrating antinodes."
      ]
    },
    defaultParams: { harmonicsK: 3, frequencyHz: 60, stringLenM: 1.2, tensionN: 50 },
    challenges: [
      {
        id: "c1",
        question: "Sợi dây dài L = 1.2m có sóng dừng 2 đầu cố định với k = 3 bụng sóng. Bước sóng λ là bao nhiêu?",
        questionEn: "A string of length L = 1.2m has standing wave mode k = 3 antinodes. What is wavelength λ?",
        options: ["0.4 m", "0.8 m", "1.2 m", "2.4 m"],
        optionsEn: ["0.4 m", "0.8 m", "1.2 m", "2.4 m"],
        correctIndex: 1,
        explanation: "L = k · λ / 2 => 1.2 = 3 · λ / 2 => λ = 2.4 / 3 = 0.8 m.",
        explanationEn: "L = k · λ / 2 => 1.2 = 3 · λ / 2 => λ = 2.4 / 3 = 0.8 m."
      }
    ]
  },

  // --- CAMBRIDGE IGCSE PHYSICS PRACTICALS (0625) ---
  {
    id: "igcse-hooke",
    grade: "IGCSE",
    gradeLabel: "IGCSE",
    curriculum: "IGCSE",
    category: "Cơ học",
    title: "IGCSE: Định luật Hooke & Lò xo",
    titleEn: "IGCSE: Hooke's Law & Springs",
    subtitle: "Khảo sát sự phụ thuộc lực F vào độ giãn x và tính độ cứng lò xo k",
    subtitleEn: "Investigate force F extension x relation and spring constant k",
    icon: "Scale",
    description: "Thí nghiệm treo quả cân lên lò xo, đo độ giãn x = L - L0. Kiểm chứng F = k * x và tính thế năng đàn hồi E_p = 1/2 k x².",
    theory: {
      objective: "Xác định độ cứng k của lò xo và kiểm chứng giới hạn đàn hồi theo định luật Hooke F = k · x.",
      objectiveEn: "Determine spring constant k and verify elastic limit per Hooke's Law F = k · x.",
      purpose: "Thiết kế bộ giảm xóc xe cộ, lực kế lò xo, nệm lò xo và hệ thống treo công nghiệp.",
      purposeEn: "Automotive suspension springs, spring dynamometers, mattresses, and industrial spring systems.",
      summary: "Trong giới hạn đàn hồi, độ giãn của lò xo tỉ lệ thuận với lực kéo tác dụng lên lò xo.",
      summaryEn: "Within elastic limit, spring extension x is directly proportional to applied stretching force F.",
      formulas: [
        {
          label: "Định luật Hooke",
          labelEn: "Hooke's Law",
          formula: "F = k · x",
          symbols: [
            { symbol: "F", name: "Lực đàn hồi (bằng trọng lượng P = m·g)", nameEn: "Restoring force (weight P = m·g)", unit: "N (Newton)", unitEn: "N (Newtons)" },
            { symbol: "k", name: "Độ cứng của lò xo", nameEn: "Spring constant stiffness", unit: "N/m", unitEn: "N/m" },
            { symbol: "x", name: "Độ giãn của lò xo (x = L - L₀)", nameEn: "Spring extension (x = L - L₀)", unit: "m hoặc cm", unitEn: "m or cm" }
          ]
        },
        {
          label: "Thế năng đàn hồi lò xo",
          labelEn: "Elastic Potential Energy",
          formula: "E_p = (1/2) · k · x²",
          symbols: [
            { symbol: "E_p", name: "Thế năng đàn hồi tích lũy", nameEn: "Stored elastic potential energy", unit: "J (Joule)", unitEn: "J (Joules)" }
          ]
        }
      ],
      sgkRef: "Cambridge IGCSE Physics 0625 Practical (Forces & Springs)",
      sgkRefEn: "Cambridge IGCSE Physics 0625 Practical Paper (Forces & Springs)",
      guideSteps: [
        "Bước 1: Đo chiều dài tự nhiên L0 của lò xo.",
        "Bước 2: Treo quả cân khối lượng m (g) và đo L.",
        "Bước 3: Tính độ giãn x = L - L0.",
        "Bước 4: Vẽ đồ thị F(x) để tính độ dốc k."
      ],
      guideStepsEn: [
        "Step 1: Measure unstretched spring length L0.",
        "Step 2: Hang mass m (g) and measure stretched length L.",
        "Step 3: Calculate extension x = L - L0.",
        "Step 4: Plot F(x) graph and calculate gradient k."
      ]
    },
    defaultParams: { springConstant: 50, massGrams: 200 },
    challenges: [
      {
        id: "c1",
        question: "Treo quả cân m = 400g (F ≈ 4.0N) vào lò xo có k = 50 N/m. Độ giãn x của lò xo là bao nhiêu?",
        questionEn: "Hanging mass m = 400g (F ≈ 4.0N) on spring with k = 50 N/m. What is extension x?",
        options: ["4.0 cm", "8.0 cm", "12.5 cm", "20.0 cm"],
        optionsEn: ["4.0 cm", "8.0 cm", "12.5 cm", "20.0 cm"],
        correctIndex: 1,
        explanation: "x = F / k = 4.0 N / 50 N/m = 0.08 m = 8.0 cm.",
        explanationEn: "x = F / k = 4.0 N / 50 N/m = 0.08 m = 8.0 cm."
      }
    ]
  },
  {
    id: "igcse-sound",
    grade: "IGCSE",
    gradeLabel: "IGCSE",
    curriculum: "IGCSE",
    category: "Cơ học",
    title: "IGCSE: Đo Vận tốc Âm thanh trong Không khí",
    titleEn: "IGCSE: Speed of Sound in Air",
    subtitle: "Xác định vận tốc v = f · λ qua cột không khí cộng hưởng âm thoa",
    subtitleEn: "Determine speed v = f · λ via tuning fork resonant air column",
    icon: "Activity",
    description: "Thực hành gõ âm thoa tần số f, thay đổi chiều dài cột không khí L1 trong ống nghiệm chứa nước để tìm hiện tượng cộng hưởng âm thanh cực đại.",
    theory: {
      objective: "Xác định vận tốc truyền âm v trong không khí bằng ống cộng hưởng dừng.",
      objectiveEn: "Determine speed of sound v in air using resonant air column.",
      purpose: "Ứng dụng sonar dò đáy biển, thiết bị siêu âm y khoa và đo khoảng cách xa.",
      purposeEn: "Sonar ocean depth mapping, medical ultrasound imaging, and ultrasonic distance meters.",
      summary: "Vận tốc âm thanh v = f · λ. Cột khí 1 đầu kín đạt cộng hưởng khi L1 ≈ λ / 4.",
      summaryEn: "Speed of sound v = f · λ. Resonance occurs in 1-end-closed column at L1 ≈ λ / 4.",
      formulas: [
        {
          label: "Vận tốc âm thanh trong không khí",
          labelEn: "Speed of Sound in Air",
          formula: "v = f · λ = 331.3 + 0.606 · T",
          symbols: [
            { symbol: "v", name: "Vận tốc truyền âm thanh", nameEn: "Speed of sound", unit: "m/s", unitEn: "m/s" },
            { symbol: "f", name: "Tần số phát âm thoa", nameEn: "Tuning fork frequency", unit: "Hz", unitEn: "Hz" },
            { symbol: "λ", name: "Bước sóng âm thanh", nameEn: "Sound wavelength", unit: "m", unitEn: "m" },
            { symbol: "T", name: "Nhiệt độ không khí", nameEn: "Air temperature", unit: "°C", unitEn: "°C" }
          ]
        }
      ],
      sgkRef: "Cambridge IGCSE Physics 0625 (Sound Waves)",
      sgkRefEn: "Cambridge IGCSE Physics 0625 (Topic 3: Sound Waves)",
      guideSteps: [
        "Bước 1: Gõ âm thoa tần số f (256Hz, 440Hz, 512Hz).",
        "Bước 2: Thay đổi cột khí L để tìm vị trí cộng hưởng to nhất.",
        "Bước 3: Đọc L1 và tính v = 4 · f · L1."
      ],
      guideStepsEn: [
        "Step 1: Strike tuning fork of frequency f (256Hz, 440Hz, 512Hz).",
        "Step 2: Adjust air column length L to locate maximum resonance loudness.",
        "Step 3: Read L1 and compute speed v = 4 · f · L1."
      ]
    },
    defaultParams: { frequencyHz: 512, tubeLengthCm: 16.5, airTempC: 20 },
    challenges: [
      {
        id: "c1",
        question: "Âm thoa f = 512Hz phát ra sóng âm với vận tốc v = 340 m/s. Bước sóng λ là bao nhiêu?",
        questionEn: "Tuning fork f = 512Hz produces sound with speed v = 340 m/s. What is wavelength λ?",
        options: ["0.66 m", "1.50 m", "2.00 m", "0.33 m"],
        optionsEn: ["0.66 m", "1.50 m", "2.00 m", "0.33 m"],
        correctIndex: 0,
        explanation: "λ = v / f = 340 / 512 ≈ 0.664 m.",
        explanationEn: "λ = v / f = 340 / 512 ≈ 0.664 m."
      }
    ]
  },
  {
    id: "igcse-snell",
    grade: "IGCSE",
    gradeLabel: "IGCSE",
    curriculum: "IGCSE",
    category: "Quang học",
    title: "IGCSE: Định luật Snell Khúc xạ Ánh sáng",
    titleEn: "IGCSE: Snell's Law of Refraction",
    subtitle: "Đo góc tới i và góc khúc xạ r qua bản bán nguyệt/khối chữ nhật thủy tinh",
    subtitleEn: "Measure incident angle i and refraction angle r through glass block",
    icon: "Sun",
    description: "Chiếu luồng sáng Ray box tới mặt khối thủy tinh. Quan sát góc khúc xạ r và kiểm chứng n = sin(i) / sin(r).",
    theory: {
      objective: "Đo chiết suất n của khối thủy tinh qua định luật Snell n = sin i / sin r.",
      objectiveEn: "Determine glass refractive index n using Snell's Law n = sin i / sin r.",
      purpose: "Chế tạo cáp quang viễn thông internet tốc độ cao và kính thấu kính.",
      purposeEn: "Fiber optic high-speed internet data cables and optical lens manufacturing.",
      summary: "Tỉ số giữa sin góc tới i và sin góc khúc xạ r bằng chiết suất n của thủy tinh.",
      summaryEn: "Ratio of sine of incident angle i to sine of refracted angle r equals refractive index n.",
      formulas: [
        {
          label: "Định luật Snell khúc xạ",
          labelEn: "Snell's Law Equation",
          formula: "n = sin i / sin r",
          symbols: [
            { symbol: "n", name: "Chiết suất thủy tinh", nameEn: "Glass refractive index", unit: "không có đơn vị", unitEn: "dimensionless" },
            { symbol: "i", name: "Góc tới trong không khí", nameEn: "Incident angle in air", unit: "độ (°)", unitEn: "degrees (°)" },
            { symbol: "r", name: "Góc khúc xạ trong thủy tinh", nameEn: "Refracted angle in glass", unit: "độ (°)", unitEn: "degrees (°)" }
          ]
        }
      ],
      sgkRef: "Cambridge IGCSE Physics 0625 (Light Refraction)",
      sgkRefEn: "Cambridge IGCSE Physics 0625 (Topic 3.2: Light Refraction)",
      guideSteps: [
        "Bước 1: Chiếu tia sáng tới mặt khối thủy tinh góc i.",
        "Bước 2: Đo góc khúc xạ r trong khối thủy tinh.",
        "Bước 3: Tính tỉ số n = sin i / sin r."
      ],
      guideStepsEn: [
        "Step 1: Direct light ray onto glass block surface at angle i.",
        "Step 2: Measure refracted angle r inside glass block.",
        "Step 3: Compute refractive index ratio n = sin i / sin r."
      ]
    },
    defaultParams: { incidentDeg: 45, glassN: 1.52 },
    challenges: [
      {
        id: "c1",
        question: "Tia sáng từ không khí tới khối thủy tinh (n = 1.50) với góc tới i = 30°. sin(r) bằng bao nhiêu?",
        questionEn: "A light ray passes from air into glass (n = 1.50) at incident angle i = 30°. What is sin(r)?",
        options: ["0.333", "0.500", "0.750", "0.250"],
        optionsEn: ["0.333", "0.500", "0.750", "0.250"],
        correctIndex: 0,
        explanation: "sin r = sin i / n = sin 30° / 1.50 = 0.5 / 1.50 = 0.333.",
        explanationEn: "sin r = sin i / n = sin 30° / 1.50 = 0.5 / 1.50 = 0.333."
      }
    ]
  },

  // --- CAMBRIDGE A LEVEL PHYSICS PRACTICALS (9702) ---
  {
    id: "alevel-pendulumg",
    grade: "A Level",
    gradeLabel: "A Level",
    curriculum: "ALEVEL",
    category: "Cơ học",
    title: "A Level: Đo Gia tốc Trọng trường g bằng Con lắc Đơn",
    titleEn: "A Level: Simple Pendulum Gravity g Measurement",
    subtitle: "Đo chu kỳ dao động T theo chiều dài dây L và xác định g từ đồ thị T²(L)",
    subtitleEn: "Measure period T vs length L and determine g from linear T²(L) graph",
    icon: "Activity",
    description: "Khảo sát con lắc đơn dao động góc nhỏ. Đo chu kỳ T10 cho 10 dao động, vẽ đồ thị T² theo L để tính hệ số góc 4π²/g.",
    theory: {
      objective: "Xác định gia tốc trọng trường g từ đồ thị tuyến tính T² theo chiều dài L.",
      objectiveEn: "Determine gravitational acceleration g using linear T² vs length L graph slope.",
      purpose: "Đo đạc địa chất khoáng sản và làm đồng hồ quả lắc chính xác.",
      purposeEn: "Geological mineral surveys and precision pendulum clockwork calibration.",
      summary: "Con lắc đơn dao động điều hòa chu kỳ T = 2π · √(L/g). Đồ thị T²(L) có slope = 4π² / g.",
      summaryEn: "Simple pendulum period T = 2π · √(L/g). Linear graph T²(L) slope equals 4π² / g.",
      formulas: [
        {
          label: "Chu kỳ con lắc đơn",
          labelEn: "Simple Pendulum Period",
          formula: "T = 2π · √(L / g)",
          symbols: [
            { symbol: "T", name: "Chu kỳ dao động toàn phần", nameEn: "Oscillation period", unit: "s (giây)", unitEn: "seconds (s)" },
            { symbol: "L", name: "Chiều dài dây treo", nameEn: "Pendulum string length", unit: "m", unitEn: "m" },
            { symbol: "g", name: "Gia tốc trọng trường", nameEn: "Gravitational acceleration", unit: "m/s²", unitEn: "m/s²" }
          ]
        },
        {
          label: "Đồ thị T² theo L",
          labelEn: "Linear T² vs L Graph Equation",
          formula: "T² = (4π² / g) · L",
          symbols: [
            { symbol: "T²", name: "Bình phương chu kỳ", nameEn: "Squared period", unit: "s²", unitEn: "s²" },
            { symbol: "slope", name: "Hệ số góc đường thẳng (slope = 4π²/g)", nameEn: "Graph slope (slope = 4π²/g)", unit: "s²/m", unitEn: "s²/m" }
          ]
        }
      ],
      sgkRef: "Cambridge A Level Physics 9702 (Oscillations)",
      sgkRefEn: "Cambridge A Level Physics 9702 (Chapter 17: Oscillations)",
      guideSteps: [
        "Bước 1: Chỉnh L từ 0.2m đến 1.4m.",
        "Bước 2: Cho con lắc dao động góc nhỏ < 10°.",
        "Bước 3: Đo thời gian 10 dao động T10 và tính T.",
        "Bước 4: Vẽ T²(L) và tính g = 4π² / slope."
      ],
      guideStepsEn: [
        "Step 1: Vary length L from 0.2m to 1.4m.",
        "Step 2: Release pendulum at small angle < 10°.",
        "Step 3: Measure time for 10 oscillations T10 and calculate period T.",
        "Step 4: Plot T² vs L and compute g = 4π² / slope."
      ]
    },
    defaultParams: { lengthM: 0.8, gravity: 9.81 },
    challenges: [
      {
        id: "c1",
        question: "Con lắc đơn có L = 1.0m ở nơi có g = 9.81 m/s². Chu kỳ T xấp xỉ bằng bao nhiêu?",
        questionEn: "A simple pendulum of L = 1.0m at g = 9.81 m/s². What is approximate period T?",
        options: ["1.00 s", "2.01 s", "3.14 s", "4.04 s"],
        optionsEn: ["1.00 s", "2.01 s", "3.14 s", "4.04 s"],
        correctIndex: 1,
        explanation: "T = 2π · √(1.0 / 9.81) = 2 · 3.1416 · 0.3193 ≈ 2.01 giây.",
        explanationEn: "T = 2π · √(1.0 / 9.81) = 2 · 3.1416 · 0.3193 ≈ 2.01 s."
      }
    ]
  },
  {
    id: "alevel-internalr",
    grade: "A Level",
    gradeLabel: "A Level",
    curriculum: "ALEVEL",
    category: "Điện - Từ",
    title: "A Level: Suất Điện Động E & Điện trở trong r của Pin",
    titleEn: "A Level: Battery EMF E & Internal Resistance r",
    subtitle: "Khảo sát điện áp đầu cực V theo dòng I và định luật chuyển công suất cực đại",
    subtitleEn: "Investigate terminal voltage V vs current I and max power transfer",
    icon: "Zap",
    description: "Đo điện áp đầu cực V và cường độ dòng điện I khi thay đổi biến trở tải R. Đồ thị V(I) cho tung độ gốc E và hệ số góc -r.",
    theory: {
      objective: "Xác định suất điện động E và điện trở trong r của nguồn pin thực nghiệm.",
      objectiveEn: "Determine electromotive force E and internal resistance r of a real battery cell.",
      purpose: "Đánh giá chất lượng pin lithium ô tô điện, acquy và mạch sạc.",
      purposeEn: "Quality testing for EV lithium batteries, accumulators, and charging circuits.",
      summary: "Điện áp đầu cực V giảm khi dòng I tăng: V = E - I · r.",
      summaryEn: "Terminal voltage V decreases as current I increases: V = E - I · r.",
      formulas: [
        {
          label: "Điện áp đầu cực nguồn điện",
          labelEn: "Battery Terminal Voltage",
          formula: "V = E - I · r",
          symbols: [
            { symbol: "V", name: "Điện áp đo hai cực nguồn", nameEn: "Terminal output voltage", unit: "V (Volt)", unitEn: "V (Volts)" },
            { symbol: "E", name: "Suất điện động của pin", nameEn: "Electromotive force E", unit: "V (Volt)", unitEn: "V (Volts)" },
            { symbol: "I", name: "Cường độ dòng điện phát ra", nameEn: "Circuit load current", unit: "A (Ampe)", unitEn: "A (Amperes)" },
            { symbol: "r", name: "Điện trở trong của pin", nameEn: "Internal resistance r", unit: "Ω (Ohm)", unitEn: "Ω (Ohms)" }
          ]
        }
      ],
      sgkRef: "Cambridge A Level Physics 9702 (D.C. Circuits)",
      sgkRefEn: "Cambridge A Level Physics 9702 (Chapter 10: D.C. Circuits)",
      guideSteps: [
        "Bước 1: Chỉnh biến trở R từ 0.5Ω đến 20Ω.",
        "Bước 2: Ghi nhận V và I trên đồng hồ đo.",
        "Bước 3: Vẽ đồ thị V(I) xác định tung độ gốc E và hệ số dốc r."
      ],
      guideStepsEn: [
        "Step 1: Vary load resistor R from 0.5Ω to 20Ω.",
        "Step 2: Record voltage V and current I readings.",
        "Step 3: Plot V vs I graph to find y-intercept E and slope -r."
      ]
    },
    defaultParams: { emfVolts: 9.0, internalR: 1.5, loadR: 4.5 },
    challenges: [
      {
        id: "c1",
        question: "Pin có E = 6V, r = 1Ω mắc với điện trở ngoài R = 5Ω. Cường độ dòng điện I trong mạch là bao nhiêu?",
        questionEn: "A cell with E = 6V, r = 1Ω is connected to load R = 5Ω. What is current I?",
        options: ["1.0 A", "1.2 A", "0.5 A", "6.0 A"],
        optionsEn: ["1.0 A", "1.2 A", "0.5 A", "6.0 A"],
        correctIndex: 0,
        explanation: "I = E / (R + r) = 6 / (5 + 1) = 1.0 A.",
        explanationEn: "I = E / (R + r) = 6 / (5 + 1) = 1.0 A."
      }
    ]
  },
  {
    id: "alevel-boyle",
    grade: "A Level",
    gradeLabel: "A Level",
    curriculum: "ALEVEL",
    category: "Nhiệt học",
    title: "A Level: Định luật Boyle cho Khí Lý Tưởng",
    titleEn: "A Level: Boyle's Law for Ideal Gases",
    subtitle: "Khảo sát sự phụ thuộc áp suất P vào thể tích V ở nhiệt độ không đổi",
    subtitleEn: "Investigate pressure P vs volume V at constant temperature",
    icon: "Activity",
    description: "Sử dụng xilanh nén khí đẳng nhiệt, đọc áp kế P và thể tích V. Kiểm chứng đường cong đẳng nhiệt P ~ 1/V.",
    theory: {
      objective: "Kiểm chứng định luật Boyle P · V = const khi nén khí đẳng nhiệt.",
      objectiveEn: "Verify Boyle's Law P · V = const during isothermal compression.",
      purpose: "Thiết kế xi-lanh động cơ đốt trong và máy nén khí tủ lạnh.",
      purposeEn: "Design of combustion engine cylinders and refrigerator compressors.",
      summary: "Áp suất khối lượng khí tỉ lệ nghịch với thể tích khi nhiệt độ không đổi.",
      summaryEn: "Gas pressure is inversely proportional to volume at constant temperature.",
      formulas: [
        {
          label: "Định luật Boyle",
          labelEn: "Boyle's Isothermal Law",
          formula: "P_1 · V_1 = P_2 · V_2    (T = const)",
          symbols: [
            { symbol: "P_1, P_2", name: "Áp suất khối khí", nameEn: "Gas pressures", unit: "Pa hoặc kPa", unitEn: "Pa or kPa" },
            { symbol: "V_1, V_2", name: "Thể tích khối khí", nameEn: "Gas volumes", unit: "m³ hoặc ml", unitEn: "m³ or ml" }
          ]
        }
      ],
      sgkRef: "Cambridge A Level Physics 9702 (Ideal Gases)",
      sgkRefEn: "Cambridge A Level Physics 9702 (Chapter 19: Ideal Gases)",
      guideSteps: [
        "Bước 1: Nén/Kéo xilanh đổi thể tích V (ml).",
        "Bước 2: Đọc áp suất P (kPa).",
        "Bước 3: Kiểm tra tích P · V không đổi."
      ],
      guideStepsEn: [
        "Step 1: Push/pull syringe to change volume V (ml).",
        "Step 2: Read pressure gauge P (kPa).",
        "Step 3: Verify constant product P · V."
      ]
    },
    defaultParams: { volumeMl: 50, tempK: 300 },
    challenges: [
      {
        id: "c1",
        question: "Khí ở thể tích V1 = 60ml có áp suất P1 = 100 kPa. Khi nén đẳng nhiệt đến V2 = 30ml thì áp suất P2 bằng bao nhiêu?",
        questionEn: "Gas at V1 = 60ml has P1 = 100 kPa. Compressed isothermally to V2 = 30ml, what is P2?",
        options: ["50 kPa", "150 kPa", "200 kPa", "300 kPa"],
        optionsEn: ["50 kPa", "150 kPa", "200 kPa", "300 kPa"],
        correctIndex: 2,
        explanation: "P1 · V1 = P2 · V2 => 100 · 60 = P2 · 30 => P2 = 200 kPa.",
        explanationEn: "P1 · V1 = P2 · V2 => 100 · 60 = P2 · 30 => P2 = 200 kPa."
      }
    ]
  },
  {
    id: "alevel-diffraction",
    grade: "A Level",
    gradeLabel: "A Level",
    curriculum: "ALEVEL",
    category: "Quang học",
    title: "A Level: Lưới Nhiễu Xạ & Đo Bước Sóng Ánh sáng",
    titleEn: "A Level: Diffraction Grating & Wavelength λ",
    subtitle: "Xác định góc nhiễu xạ θ_m và đo bước sóng ánh sáng λ qua lưới N vạch/mm",
    subtitleEn: "Determine diffraction angle θ_m and measure laser wavelength λ",
    icon: "Sun",
    description: "Chiếu chùm Laser qua lưới nhiễu xạ có mật độ vạch N. Đo các góc nhiễu xạ cực đại bậc 1, bậc 2, bậc 3 trên màn bán nguyệt theo công thức d sin(θ) = m λ.",
    theory: {
      objective: "Đo bước sóng ánh sáng λ qua lưới nhiễu xạ d · sin θ = m · λ.",
      objectiveEn: "Measure light wavelength λ using diffraction grating d · sin θ = m · λ.",
      purpose: "Phân tích quang phổ thiên văn học và kiểm định đĩa đĩa quang.",
      purposeEn: "Stellar astronomical spectroscopy and optical disc testing.",
      summary: "Lưới nhiễu xạ tạo cực đại nhiễu xạ tại góc θm thỏa mãn d · sin θ_m = m · λ.",
      summaryEn: "Diffraction grating produces maxima at angles θm satisfying d · sin θ_m = m · λ.",
      formulas: [
        {
          label: "Công thức cực đại lưới nhiễu xạ",
          labelEn: "Diffraction Grating Maxima",
          formula: "d · sin θ_m = m · λ",
          symbols: [
            { symbol: "d", name: "Chu kỳ lưới nhiễu xạ (d = 1/N)", nameEn: "Grating line spacing (d = 1/N)", unit: "m hoặc µm", unitEn: "m or µm" },
            { symbol: "θ_m", name: "Góc nhiễu xạ vệt sáng bậc m", nameEn: "Diffraction angle for order m", unit: "độ (°)", unitEn: "degrees (°)" },
            { symbol: "m", name: "Bậc nhiễu xạ (m = 0, ±1, ±2...)", nameEn: "Diffraction order integer", unit: "số nguyên", unitEn: "integer" },
            { symbol: "λ", name: "Bước sóng Laser", nameEn: "Laser wavelength", unit: "nm (nanomet)", unitEn: "nm (nanometers)" }
          ]
        }
      ],
      sgkRef: "Cambridge A Level Physics 9702 (Diffraction Gratings)",
      sgkRefEn: "Cambridge A Level Physics 9702 (Chapter 15: Diffraction Gratings)",
      guideSteps: [
        "Bước 1: Chiếu Laser qua lưới N vạch/mm.",
        "Bước 2: Đo góc nhiễu xạ θm các bậc m = 1, 2, 3.",
        "Bước 3: Tính bước sóng λ = d · sin θ_m / m."
      ],
      guideStepsEn: [
        "Step 1: Direct laser through grating with N lines/mm.",
        "Step 2: Measure diffraction angles θm for orders m = 1, 2, 3.",
        "Step 3: Calculate wavelength λ = d · sin θ_m / m."
      ]
    },
    defaultParams: { wavelengthNm: 532, linesPerMm: 300 },
    challenges: [
      {
        id: "c1",
        question: "Lưới nhiễu xạ có N = 500 vạch/mm. Khoảng cách giữa 2 vạch d bằng bao nhiêu?",
        questionEn: "A diffraction grating has N = 500 lines/mm. What is line spacing d?",
        options: ["2.0 µm", "5.0 µm", "0.5 µm", "20 µm"],
        optionsEn: ["2.0 µm", "5.0 µm", "0.5 µm", "20 µm"],
        correctIndex: 0,
        explanation: "d = 1 / 500 mm = 0.002 mm = 2.0 µm = 2.0 × 10⁻⁶ m.",
        explanationEn: "d = 1 / 500 mm = 0.002 mm = 2.0 µm = 2.0 × 10⁻⁶ m."
      }
    ]
  },
  {
    id: "alevel-young",
    grade: "A Level",
    gradeLabel: "A Level",
    curriculum: "ALEVEL",
    category: "Quang học",
    title: "A Level: Định luật Giao thoa Ánh sáng Khe Young",
    titleEn: "A Level: Young's Double Slit Interference",
    subtitle: "Khảo sát khoảng vân a, đo bước sóng Laser λ qua khe hẹp kép",
    subtitleEn: "Investigate fringe spacing a and laser wavelength λ through double slits",
    icon: "Sun",
    description: "Chiếu luồng Laser qua 2 khe hẹp Young cách nhau d. Quan sát vân sáng / vân tối trên màn cách xa D và đồ thị cường độ sáng I(y).",
    theory: {
      objective: "Đo khoảng vân a và tính bước sóng ánh sáng λ từ thí nghiệm giao thoa 2 khe Young.",
      objectiveEn: "Measure fringe spacing a and derive light wavelength λ via Young's double slit interference.",
      purpose: "Chứng minh bản chất sóng của ánh sáng và đo chiều dày màng mỏng quang học.",
      purposeEn: "Proves wave nature of light and enables optical thin film thickness measurement.",
      summary: "Giao thoa 2 khe Young tạo dải vân sáng và tối cách đều nhau với khoảng vân a = (λ · D) / d.",
      summaryEn: "Young's double slit interference produces equally spaced bright/dark fringes with spacing a = (λ · D) / d.",
      formulas: [
        {
          label: "Khoảng vân giao thoa a",
          labelEn: "Interference Fringe Spacing",
          formula: "a = (λ · D) / d",
          symbols: [
            { symbol: "a", name: "Khoảng vân (khoảng cách 2 vân sáng liên tiếp)", nameEn: "Fringe width spacing", unit: "mm", unitEn: "mm" },
            { symbol: "λ", name: "Bước sóng chiếu Laser", nameEn: "Laser wavelength", unit: "nm (nanomet)", unitEn: "nm" },
            { symbol: "D", name: "Khoảng cách từ khe đến màn", nameEn: "Slit-to-screen distance", unit: "m", unitEn: "m" },
            { symbol: "d", name: "Khoảng cách giữa 2 khe Young", nameEn: "Double slit separation", unit: "mm", unitEn: "mm" }
          ]
        }
      ],
      sgkRef: "Cambridge A Level Physics 9702 (Interference)",
      sgkRefEn: "Cambridge A Level Physics 9702 (Chapter 15: Interference)",
      guideSteps: [
        "Bước 1: Chiếu Laser qua khe kép d.",
        "Bước 2: Chỉnh khoảng cách màn D.",
        "Bước 3: Đo khoảng vân a và tính λ = (a · d) / D."
      ],
      guideStepsEn: [
        "Step 1: Direct laser through double slit separation d.",
        "Step 2: Adjust screen distance D.",
        "Step 3: Measure fringe width a and calculate λ = (a · d) / D."
      ]
    },
    defaultParams: { wavelengthNm: 650, slitDistanceMm: 0.25, screenDistanceM: 2.0 },
    challenges: [
      {
        id: "c1",
        question: "Với Laser đỏ λ = 650nm, d = 0.25mm, D = 2.0m. Khoảng vân a đo được là bao nhiêu?",
        questionEn: "Using red laser λ = 650nm, d = 0.25mm, D = 2.0m. What is measured fringe width a?",
        options: ["1.30 mm", "5.20 mm", "0.52 mm", "10.4 mm"],
        optionsEn: ["1.30 mm", "5.20 mm", "0.52 mm", "10.4 mm"],
        correctIndex: 1,
        explanation: "a = (λ · D) / d = (650e-9 · 2.0) / (0.25e-3) = 5.2e-3 m = 5.20 mm.",
        explanationEn: "a = (λ · D) / d = (650e-9 · 2.0) / (0.25e-3) = 5.2e-3 m = 5.20 mm."
      }
    ]
  },
  {
    id: "alevel-photoelectric",
    grade: "A Level",
    gradeLabel: "A Level",
    curriculum: "ALEVEL",
    category: "Vật lý Hiện đại",
    title: "A Level: Định luật Quang điện & Hằng số Planck h",
    titleEn: "A Level: Photoelectric Effect & Planck Constant h",
    subtitle: "Đo điện thế hãm Vs theo tần số f và xác định hằng số Planck h",
    subtitleEn: "Measure stopping potential Vs vs frequency f and determine Planck constant h",
    icon: "Zap",
    description: "Chiếu bức xạ điện từ f lên Catốt kim loại. Đo điện thế hãm Vs để triệt tiêu dòng quang điện. Xác định phương trình Einstein eVs = hf - Φ.",
    theory: {
      objective: "Đo hằng số Planck h và công thoát Φ qua hiện tượng quang điện ngoài.",
      objectiveEn: "Measure Planck's constant h and work function Φ via external photoelectric effect.",
      purpose: "Chế tạo tế bào quang điện, pin mặt trời và cảm biến hình ảnh camera CCD.",
      purposeEn: "Applications in photocells, solar panels, CCD image sensors, and night-vision devices.",
      summary: "Hiện tượng quang điện chứng minh ánh sáng có tính chất hạt Photon: e · V_s = h · f - A.",
      summaryEn: "Photoelectric effect proves quantum particle nature of light: e · V_s = h · f - Φ.",
      formulas: [
        {
          label: "Phương trình Quang điện Einstein",
          labelEn: "Einstein Photoelectric Equation",
          formula: "h · f = A + e · V_s = Φ + E_k,max",
          symbols: [
            { symbol: "h", name: "Hằng số Planck", nameEn: "Planck's constant", unit: "6.626 × 10⁻³⁴ J·s", unitEn: "6.626 × 10⁻³⁴ J·s" },
            { symbol: "f", name: "Tần số photon chiếu tới", nameEn: "Incident photon frequency", unit: "Hz", unitEn: "Hz" },
            { symbol: "A (Φ)", name: "Công thoát electron khỏi kim loại", nameEn: "Metal work function", unit: "eV hoặc J", unitEn: "eV or J" },
            { symbol: "V_s", name: "Điện thế hãm triệt tiêu dòng quang điện", nameEn: "Stopping potential voltage", unit: "V (Volt)", unitEn: "V (Volts)" },
            { symbol: "e", name: "Điện tích electron", nameEn: "Electron charge magnitude", unit: "1.6 × 10⁻¹⁹ C", unitEn: "1.6 × 10⁻¹⁹ C" }
          ]
        }
      ],
      sgkRef: "Cambridge A Level Physics 9702 (Quantum Physics)",
      sgkRefEn: "Cambridge A Level Physics 9702 (Chapter 28: Quantum Physics)",
      guideSteps: [
        "Bước 1: Chiếu ánh sáng tần số f vào cathode.",
        "Bước 2: Chỉnh điện thế hãm Vs đến khi dòng I = 0.",
        "Bước 3: Vẽ Vs(f) để tính h = e · slope."
      ],
      guideStepsEn: [
        "Step 1: Direct light frequency f onto metal cathode.",
        "Step 2: Adjust stopping potential Vs until current I = 0.",
        "Step 3: Plot Vs vs f to compute Planck constant h = e · slope."
      ]
    },
    defaultParams: { metal: "sodium", wavelengthNm: 350 },
    challenges: [
      {
        id: "c1",
        question: "Bức xạ có năng lượng Photon E = 3.54 eV chiếu vào Natri (công thoát Φ = 2.36 eV). Điện thế hãm Vs bằng bao nhiêu?",
        questionEn: "Photon energy E = 3.54 eV strikes Sodium (work function Φ = 2.36 eV). What is stopping potential Vs?",
        options: ["1.18 V", "2.36 V", "3.54 V", "5.90 V"],
        optionsEn: ["1.18 V", "2.36 V", "3.54 V", "5.90 V"],
        correctIndex: 0,
        explanation: "e·Vs = E - Φ = 3.54 - 2.36 = 1.18 eV => Vs = 1.18 V.",
        explanationEn: "e·Vs = E - Φ = 3.54 - 2.36 = 1.18 eV => Vs = 1.18 V."
      }
    ]
  },
  {
    id: "alevel-radioactive",
    grade: "A Level",
    gradeLabel: "A Level",
    curriculum: "ALEVEL",
    category: "Vật lý Hiện đại",
    title: "A Level: Định luật Phóng xạ Hạt nhân & Chu kỳ T1/2",
    titleEn: "A Level: Radioactive Decay & Half-life T1/2",
    subtitle: "Khảo sát sự giảm số hạt nhân N(t) và hằng số phân rã λ",
    subtitleEn: "Investigate exponential decay N(t) and decay constant λ",
    icon: "Activity",
    description: "Mô phỏng đếm hạt phân rã bằng ống đếm Geiger-Müller (GM). Đồ thị hàm mũ N(t) = N0 * e^(-λt) và xác định chu kỳ bán rã T1/2.",
    theory: {
      objective: "Xác định chu kỳ bán rã T1/2 và hằng số phân rã λ của chất phóng xạ.",
      objectiveEn: "Determine half-life T1/2 and decay constant λ of a radioactive isotope.",
      purpose: "Ứng dụng định tuổi cổ vật Carbon-14, xạ trị y tế ung thư và năng lượng hạt nhân.",
      purposeEn: "Carbon-14 archaeological dating, medical cancer radiotherapy, and nuclear power reactors.",
      summary: "Phân rã phóng xạ tuân theo quy luật hàm mũ giảm: N(t) = N_0 · e^(-λ · t).",
      summaryEn: "Radioactive decay obeys exponential law: N(t) = N_0 · e^(-λ · t).",
      formulas: [
        {
          label: "Định luật phân rã phóng xạ",
          labelEn: "Radioactive Decay Law",
          formula: "N(t) = N_0 · e^(-λ · t)",
          symbols: [
            { symbol: "N(t)", name: "Số hạt nhân phóng xạ còn lại", nameEn: "Remaining radioactive nuclei", unit: "hạt", unitEn: "nuclei count" },
            { symbol: "N_0", name: "Số hạt nhân ban đầu (t = 0)", nameEn: "Initial nuclei count", unit: "hạt", unitEn: "nuclei count" },
            { symbol: "λ", name: "Hằng số phân rã (λ = ln 2 / T_1/2)", nameEn: "Decay constant (λ = ln 2 / T_1/2)", unit: "1/s hoặc 1/năm", unitEn: "s⁻¹ or yr⁻¹" },
            { symbol: "T_1/2", name: "Chu kỳ bán rã", nameEn: "Half-life period", unit: "s hoặc năm", unitEn: "seconds or years" }
          ]
        }
      ],
      sgkRef: "Cambridge A Level Physics 9702 (Nuclear Physics)",
      sgkRefEn: "Cambridge A Level Physics 9702 (Chapter 23: Nuclear Physics)",
      guideSteps: [
        "Bước 1: Chọn chu kỳ bán rã T1/2.",
        "Bước 2: Nhấn 'Bắt đầu phân rã' đếm hạt.",
        "Bước 3: Theo dõi đồ thị hàm mũ N(t) và xác định thời gian còn 50%."
      ],
      guideStepsEn: [
        "Step 1: Set half-life period T1/2.",
        "Step 2: Click 'Start Decay' to trigger Geiger counter.",
        "Step 3: Monitor N(t) exponential curve and locate 50% remaining time."
      ]
    },
    defaultParams: { halfLifeSec: 10 },
    challenges: [
      {
        id: "c1",
        question: "Một chất phóng xạ có chu kỳ bán rã T1/2 = 10 giây. Sau 30 giây, tỉ lệ số hạt nhân còn lại là bao nhiêu?",
        questionEn: "A radioactive isotope has half-life T1/2 = 10s. After 30s, what fraction of nuclei remains?",
        options: ["50%", "25%", "12.5%", "6.25%"],
        optionsEn: ["50%", "25%", "12.5%", "6.25%"],
        correctIndex: 2,
        explanation: "30s = 3 · T1/2. Số hạt còn lại = (1/2)³ = 1/8 = 12.5%.",
        explanationEn: "30s = 3 · T1/2. Remaining fraction = (1/2)³ = 1/8 = 12.5%."
      }
    ]
  },
  {
    id: "alevel-resistivity",
    grade: "A Level",
    gradeLabel: "A Level",
    curriculum: "ALEVEL",
    category: "Điện - Từ",
    title: "A Level: Điện trở suất Dây Kim loại & Thước Panme",
    titleEn: "A Level: Resistivity of Wire & Micrometer Gauge",
    subtitle: "Xác định điện trở suất ρ = R·A / L bằng đồ thị R(L) tuyến tính",
    subtitleEn: "Determine wire resistivity ρ = R·A / L via linear R(L) graph",
    icon: "Zap",
    description: "Mô phỏng thước panme đo đường kính d, con trượt jockey thay đổi chiều dài L (cm), đồ thị R(L) tuyến tính và tính điện trở suất rho = R*A/L.",
    theory: {
      objective: "Đo điện trở suất ρ của dây kim loại dẫn điện và kiểm chứng định luật tỉ lệ thuận giữa điện trở R và chiều dài L.",
      objectiveEn: "Measure electrical resistivity ρ of metal wire and verify direct proportionality R ∝ L.",
      purpose: "Ứng dụng trong sản xuất dây dẫn truyền tải điện, cảm biến nhiệt điện trở và thiết bị sưởi ấm.",
      purposeEn: "Applications in power grid cabling, RTD temperature sensors, and heating elements.",
      summary: "Điện trở của một dây dẫn hình trụ tỉ lệ thuận với chiều dài L và tỉ lệ nghịch với tiết diện A: R = ρ · L / A.",
      summaryEn: "Electrical resistance of a cylindrical conductor is proportional to length L and inversely proportional to area A: R = ρ · L / A.",
      formulas: [
        {
          label: "Điện trở suất dây dẫn",
          labelEn: "Wire Electrical Resistivity",
          formula: "ρ = R · A / L = R · (π · d² / 4) / L",
          symbols: [
            { symbol: "ρ", name: "Điện trở suất của chất liệu", nameEn: "Material electrical resistivity", unit: "Ω·m", unitEn: "Ω·m" },
            { symbol: "R", name: "Điện trở của dây dẫn", nameEn: "Wire electrical resistance", unit: "Ω (Ohm)", unitEn: "Ω (Ohms)" },
            { symbol: "A", name: "Tiết diện ngang của dây", nameEn: "Wire cross-sectional area", unit: "m²", unitEn: "m²" },
            { symbol: "d", name: "Đường kính dây (kẹp panme)", nameEn: "Wire diameter (micrometer)", unit: "mm", unitEn: "mm" },
            { symbol: "L", name: "Chiều dài đoạn dây (con trượt jockey)", nameEn: "Wire length (jockey slider)", unit: "m", unitEn: "meters" }
          ]
        }
      ],
      sgkRef: "Cambridge A Level Physics 9702 (Chapter 9: Resistance & Resistivity)",
      sgkRefEn: "Cambridge A Level Physics 9702 (Chapter 9: Resistance & Resistivity)",
      guideSteps: [
        "Bước 1: Chọn chất liệu dây dẫn (Constantan, Nichrome, Manganin).",
        "Bước 2: Dùng thước kẹp panme chỉnh đường kính d (mm) của dây.",
        "Bước 3: Di chuyển con trượt Jockey để thay đổi chiều dài L (cm).",
        "Bước 4: Quan sát đồ thị R(L) tuyến tính và tính điện trở suất ρ."
      ],
      guideStepsEn: [
        "Step 1: Select wire material (Constantan, Nichrome, Manganin).",
        "Step 2: Adjust wire diameter d (mm) using micrometer screw gauge.",
        "Step 3: Move jockey slider to vary wire length L (cm).",
        "Step 4: Observe linear R(L) graph and compute resistivity ρ."
      ]
    },
    defaultParams: { material: "constantan", wireLengthCm: 50, wireDiameterMm: 0.45, driverVoltageV: 2.0 },
    challenges: [
      {
        id: "c1",
        question: "Dây dẫn dài 1m tiết diện 1mm² có điện trở R = 0.49 Ω. Điện trở suất ρ bằng bao nhiêu?",
        questionEn: "A 1m wire of area 1mm² has resistance R = 0.49 Ω. What is its resistivity ρ?",
        options: ["4.9×10⁻⁷ Ω·m", "1.1×10⁻⁶ Ω·m", "1.7×10⁻⁸ Ω·m", "4.8×10⁻⁵ Ω·m"],
        optionsEn: ["4.9×10⁻⁷ Ω·m", "1.1×10⁻⁶ Ω·m", "1.7×10⁻⁸ Ω·m", "4.8×10⁻⁵ Ω·m"],
        correctIndex: 0,
        explanation: "ρ = R · A / L = 0.49 · (1×10⁻⁶ m²) / 1m = 4.9×10⁻⁷ Ω·m.",
        explanationEn: "ρ = R · A / L = 0.49 · (1×10⁻⁶ m²) / 1m = 4.9×10⁻⁷ Ω·m."
      }
    ]
  },
  {
    id: "alevel-potentiometer",
    grade: "A Level",
    gradeLabel: "A Level",
    curriculum: "ALEVEL",
    category: "Điện - Từ",
    title: "A Level: Cầu Điện Thế Slide Wire Potentiometer",
    titleEn: "A Level: Slide Wire Metre Bridge Potentiometer",
    subtitle: "Đo chính xác suất điện động Ex của pin tại điểm cân bằng Null (IG = 0)",
    subtitleEn: "Measure exact cell EMF Ex at Null Balance point (IG = 0)",
    icon: "ShieldCheck",
    description: "Mô phỏng dây điện trở 1 mét, con trượt Jockey tìm điểm cân bằng NULL (IG = 0mA), đo chính xác suất điện động Ex mà không gây sụt áp pin.",
    theory: {
      objective: "Đo suất điện động Ex của nguồn điện bằng phương pháp xung đối cầu điện thế tại điểm cân bằng Null.",
      objectiveEn: "Measure unknown cell EMF Ex using potentiometer null balance method.",
      purpose: "Ưu điểm vượt trội: Đo suất điện động thực E mà không rút dòng từ pin (I_G = 0), tránh sai số do điện trở trong r.",
      purposeEn: "Key advantage: Measures true EMF without drawing current at balance (I_G = 0), avoiding internal resistance voltage drop.",
      summary: "Tại điểm cân bằng Null (I_G = 0), độ giảm thế V_Ax trên đoạn dây L_x đúng bằng suất điện động Ex: Ex = E1 · L_x / L_tổng.",
      summaryEn: "At null balance (I_G = 0), potential drop V_Ax along balance wire equals cell EMF Ex: Ex = E1 · L_x / L_total.",
      formulas: [
        {
          label: "Công thức cầu điện thế",
          labelEn: "Potentiometer Equation",
          formula: "E_x = E_1 · (L_x / L_tổng)",
          symbols: [
            { symbol: "E_x", name: "Suất điện động pin cần đo", nameEn: "Unknown cell EMF to measure", unit: "V (Volt)", unitEn: "V (Volts)" },
            { symbol: "E_1", name: "Suất điện động nguồn chính (Driver)", nameEn: "Driver cell EMF", unit: "V (Volt)", unitEn: "V (Volts)" },
            { symbol: "L_x", name: "Chiều dài đoạn dây ứng với điểm cân bằng Null", nameEn: "Balance length at null point", unit: "cm", unitEn: "cm" },
            { symbol: "L_tổng", name: "Tổng chiều dài dây điện thế (100 cm)", nameEn: "Total potentiometer wire length (100 cm)", unit: "cm", unitEn: "cm" }
          ]
        }
      ],
      sgkRef: "Cambridge A Level Physics 9702 (Chapter 10: D.C. Circuits)",
      sgkRefEn: "Cambridge A Level Physics 9702 (Chapter 10: D.C. Circuits - Potentiometers)",
      guideSteps: [
        "Bước 1: Chọn suất điện động pin cần đo E_x (0.5V - 1.8V).",
        "Bước 2: Trượt con trượt Jockey J dọc theo dây điện thế 100cm.",
        "Bước 3: Quan sát kim vôn kế Galvanometer G lệch âm hay dương.",
        "Bước 4: Nhấn nút 'Tự động tìm điểm cân bằng' để vị trí I_G = 0 mA và đọc L_x."
      ],
      guideStepsEn: [
        "Step 1: Set unknown cell EMF E_x (0.5V - 1.8V).",
        "Step 2: Slide Jockey J along 100cm potentiometer wire.",
        "Step 3: Observe Galvanometer needle deflection (-I or +I).",
        "Step 4: Click 'Find Null Balance' to position I_G = 0 mA and read L_x."
      ]
    },
    defaultParams: { driverEmfV: 2.0, testCellEmfV: 1.48, jockeyPosCm: 74 },
    challenges: [
      {
        id: "c1",
        question: "Cầu điện thế nguồn E1 = 2.0V dây dài 100cm. Cân bằng Null đạt được tại Lx = 74cm. Suất điện động Ex bằng bao nhiêu?",
        questionEn: "Potentiometer driver E1 = 2.0V on 100cm wire. Null balance is at Lx = 74cm. What is test cell EMF Ex?",
        options: ["1.48 V", "1.20 V", "1.60 V", "2.00 V"],
        optionsEn: ["1.48 V", "1.20 V", "1.60 V", "2.00 V"],
        correctIndex: 0,
        explanation: "Ex = E1 · (Lx / 100) = 2.0 · (74 / 100) = 1.48 V.",
        explanationEn: "Ex = E1 · (Lx / 100) = 2.0 · (74 / 100) = 1.48 V."
      }
    ]
  },
  {
    id: "alevel-resonance-tube",
    grade: "A Level",
    gradeLabel: "A Level",
    curriculum: "ALEVEL",
    category: "Cơ học",
    title: "A Level: Cột Sóng Dừng Ống Cộng Hưởng & Tốc Độ Âm",
    titleEn: "A Level: Air Column Resonance Tube & Speed of Sound",
    subtitle: "Xác định tốc độ âm thanh v = 4f(L1 + c) bằng cột sóng dừng",
    subtitleEn: "Determine speed of sound v = 4f(L1 + c) via stationary waves",
    icon: "Volume2",
    description: "Mô phỏng ống cộng hưởng mực nước thay đổi L, âm thoa các tần số 256Hz, 384Hz, 512Hz, 1024Hz, nút/bụng sóng dừng và đỉnh âm thanh to nhất.",
    theory: {
      objective: "Đo tốc độ truyền âm trong không khí bằng ống cộng hưởng cột không khí một đầu kín một đầu hở.",
      objectiveEn: "Measure speed of sound in air using open-closed air column resonance tube.",
      purpose: "Ứng dụng trong chế tạo nhạc cụ khí (sáo, kèn organ), thiết kế âm học phòng hát và cảm biến đo độ sâu siêu âm.",
      purposeEn: "Applications in wind instruments (flutes, pipe organs), room acoustics, and ultrasonic depth sensors.",
      summary: "Sóng dừng trong ống một đầu kín có nút sóng tại mặt nước và bụng sóng tại miệng ống: L + c = (2n - 1) · λ / 4.",
      summaryEn: "Stationary waves in open-closed tube form a node at water surface and antinode at tube top: L + c = (2n - 1) · λ / 4.",
      formulas: [
        {
          label: "Tốc độ truyền âm trong không khí",
          labelEn: "Speed of Sound in Air",
          formula: "v = f · λ = 2 · f · (L_2 - L_1)",
          symbols: [
            { symbol: "v", name: "Tốc độ truyền âm trong không khí", nameEn: "Speed of sound in air", unit: "m/s", unitEn: "m/s" },
            { symbol: "f", name: "Tần số dao động của âm thoa", nameEn: "Tuning fork frequency", unit: "Hz", unitEn: "Hz" },
            { symbol: "λ", name: "Bước sóng âm thanh", nameEn: "Sound wavelength", unit: "m", unitEn: "meters" },
            { symbol: "L_1", name: "Chiều dài cột khí tại cực đại cộng hưởng 1", nameEn: "Air column length at 1st resonance peak", unit: "m", unitEn: "meters" },
            { symbol: "L_2", name: "Chiều dài cột khí tại cực đại cộng hưởng 2", nameEn: "Air column length at 2nd resonance peak", unit: "m", unitEn: "meters" }
          ]
        }
      ],
      sgkRef: "Cambridge A Level Physics 9702 (Chapter 14: Stationary Waves)",
      sgkRefEn: "Cambridge A Level Physics 9702 (Chapter 14: Stationary Waves)",
      guideSteps: [
        "Bước 1: Chọn tần số âm thoa f (256Hz, 384Hz, 512Hz, 1024Hz).",
        "Bước 2: Thay đổi chiều dài cột không khí L (cm) bằng cách chỉnh mực nước.",
        "Bước 3: Nhấn nút 'Chỉnh tới Cực Đại 1' để đưa L về điểm âm thanh to nhất L1.",
        "Bước 4: Tính tốc độ truyền âm v = 4f · (L1 + c) và so sánh với 343 m/s."
      ],
      guideStepsEn: [
        "Step 1: Select tuning fork frequency f (256Hz, 384Hz, 512Hz, 1024Hz).",
        "Step 2: Adjust air column length L (cm) by changing water level.",
        "Step 3: Click 'Tune to 1st Peak' to locate max volume peak L1.",
        "Step 4: Compute speed of sound v = 4f · (L1 + c) and compare with 343 m/s."
      ]
    },
    defaultParams: { forkFreqHz: 512, tubeLengthCm: 16.5 },
    challenges: [
      {
        id: "c1",
        question: "Âm thoa 512 Hz tạo cộng hưởng cực đại 1 tại L1 = 16.0cm (c hiệu chỉnh = 0.75cm). Tốc độ âm v bằng bao nhiêu?",
        questionEn: "A 512 Hz fork resonates at L1 = 16.0cm (end correction c = 0.75cm). What is speed of sound v?",
        options: ["343 m/s", "320 m/s", "300 m/s", "360 m/s"],
        optionsEn: ["343 m/s", "320 m/s", "300 m/s", "360 m/s"],
        correctIndex: 0,
        explanation: "λ/4 = L1 + c = 16.75cm => λ = 0.67m. Tốc độ v = f · λ = 512 · 0.67 = 343 m/s.",
        explanationEn: "λ/4 = L1 + c = 16.75cm => λ = 0.67m. Speed v = f · λ = 512 · 0.67 = 343 m/s."
      }
    ]
  },
  {
    id: "g12-bohr-atom",
    grade: 12,
    gradeLabel: "Grade 12",
    curriculum: "VN",
    category: "Vật lý Hiện đại",
    title: "Mẫu Nguyên Tử Bohr & Quang Phổ Vạch Hydro",
    titleEn: "Bohr Atomic Model & Hydrogen Spectral Lines",
    subtitle: "Khảo sát mức năng lượng En = -13.6/n², chuyển mức lượng tử và các dãy Lyman, Balmer, Paschen",
    subtitleEn: "Investigate energy levels En = -13.6/n², quantum transitions and Lyman, Balmer, Paschen series",
    icon: "Sparkles",
    description: "Mô phỏng quỹ đạo dừng K, L, M, N, O, P của electron quanh hạt nhân. Chuyển mức lượng tử phát xạ photon tạo các vạch quang phổ nhìn thấy Hα, Hβ, Hγ, Hδ và thang năng lượng.",
    theory: {
      objective: "Kiểm chứng tiên đề Bohr về các trạng thái dừng và sự phát xạ/hấp thụ photon khi nguyên tử chuyển mức năng lượng: hf = E_cao - E_thấp.",
      objectiveEn: "Verify Bohr's postulates of stationary states and photon emission/absorption during energy level transitions: hf = E_high - E_low.",
      purpose: "Giải thích quang phổ phát xạ của các nguyên tố, phân tích thành phần hóa học của các ngôi sao trong vũ trụ và chế tạo laser.",
      purposeEn: "Explains elemental emission spectra, astrophysical stellar spectroscopy, and semiconductor laser design.",
      summary: "Nguyên tử chỉ tồn tại trong các trạng thái dừng có năng lượng xác định En = -13.6 / n² (eV). Khi chuyển từ mức cao về mức thấp, nguyên tử phát xạ 1 photon có năng lượng đúng bằng độ chênh lệch: ε = h·f = hc/λ = E_cao - E_thấp.",
      summaryEn: "Hydrogen atom exists only in discrete stationary energy states En = -13.6 / n² (eV). Transition from higher to lower state emits a photon with energy ε = hf = hc/λ = E_high - E_low.",
      formulas: [
        {
          label: "Mức năng lượng nguyên tử Hydro",
          labelEn: "Hydrogen Energy Levels",
          formula: "E_n = -13.6 / n²   (eV)    (n = 1, 2, 3, 4, 5, 6...)",
          symbols: [
            { symbol: "E_n", name: "Năng lượng ở trạng thái dừng n", nameEn: "Stationary state energy", unit: "eV", unitEn: "eV" },
            { symbol: "n", name: "Số lượng tử chính (1=K, 2=L, 3=M, 4=N, 5=O, 6=P)", nameEn: "Principal quantum number", unit: "nguyên", unitEn: "integer" }
          ]
        },
        {
          label: "Bước sóng photon phát xạ / hấp thụ",
          labelEn: "Emitted Photon Wavelength",
          formula: "λ = (h · c) / (E_cao - E_thấp) = 1242 / ΔE(eV)   (nm)",
          symbols: [
            { symbol: "λ", name: "Bước sóng vạch quang phổ phát xạ", nameEn: "Spectral line wavelength", unit: "nm", unitEn: "nm" },
            { symbol: "h", name: "Hằng số Planck", nameEn: "Planck's constant", unit: "6.626 × 10⁻³⁴ J·s", unitEn: "6.626 × 10⁻³⁴ J·s" },
            { symbol: "c", name: "Tốc độ ánh sáng", nameEn: "Speed of light", unit: "3 × 10⁸ m/s", unitEn: "3 × 10⁸ m/s" }
          ]
        }
      ],
      sgkRef: "SGK Vật lý 12 (Chuyên đề Mẫu nguyên tử Bohr & Quang phổ Hydro)",
      sgkRefEn: "Grade 12 Physics & Cambridge A Level (Chapter: Quantum Physics - Bohr Model)",
      guideSteps: [
        "Bước 1: Chọn mức năng lượng ban đầu n_cao (n=2 đến 6).",
        "Bước 2: Chọn mức năng lượng chuyển về n_thấp (n=1 đến 5).",
        "Bước 3: Nhấn nút 'Kích hoạt chuyển mức' để quan sát electron nhảy quỹ đạo và phát xạ photon sóng.",
        "Bước 4: Đọc bước sóng vạch quang phổ λ (nm) và đối chiếu với dãy Balmer (Hα, Hβ, Hγ, Hδ)."
      ],
      guideStepsEn: [
        "Step 1: Select initial energy level n_high (n=2 to 6).",
        "Step 2: Select destination level n_low (n=1 to 5).",
        "Step 3: Click 'Trigger Quantum Jump' to observe electron transition and emitted photon wavepacket.",
        "Step 4: Read emitted wavelength λ (nm) and compare with Balmer series visible lines."
      ]
    },
    defaultParams: { initialOrbitN: 3, finalOrbitN: 2, autoRotate: true },
    challenges: [
      {
        id: "c1",
        question: "Khi electron trong nguyên tử Hydro chuyển từ quỹ đạo M (n=3, E3 = -1.51 eV) về quỹ đạo L (n=2, E2 = -3.40 eV), nguyên tử phát ra vạch quang phổ nào?",
        questionEn: "When electron in Hydrogen transitions from orbit M (n=3, E3 = -1.51 eV) to orbit L (n=2, E2 = -3.40 eV), which spectral line is emitted?",
        options: ["Vạch đỏ Hα (656 nm) trong dãy Balmer", "Vạch tím trong dãy Lyman", "Bức xạ hồng ngoại dãy Paschen", "Tia X"],
        optionsEn: ["Red line Hα (656 nm) in Balmer series", "Violet line in Lyman series", "Infrared radiation in Paschen series", "X-ray"],
        correctIndex: 0,
        explanation: "ΔE = E3 - E2 = -1.51 - (-3.40) = 1.89 eV. Bước sóng λ = 1242 / 1.89 = 656 nm ứng với vạch đỏ Hα trong dãy Balmer.",
        explanationEn: "ΔE = E3 - E2 = -1.51 - (-3.40) = 1.89 eV. Wavelength λ = 1242 / 1.89 = 656 nm which is red Hα line in Balmer series."
      }
    ]
  },
  {
    id: "g11-lorentz-force",
    grade: 11,
    gradeLabel: "Grade 11",
    curriculum: "VN",
    category: "Điện - Từ",
    title: "Lực Lorentz & Khối Phổ Kế Phân Tách Đồng Vị",
    titleEn: "Lorentz Force & Mass Spectrometry",
    subtitle: "Khảo sát quỹ đạo tròn bán kính R = mv/(qB) và phân tách đồng vị Carbon, Uranium",
    subtitleEn: "Investigate circular trajectory radius R = mv/(qB) and separate Carbon, Uranium isotopes",
    icon: "Compass",
    description: "Mô phỏng súng bắn hạt điện tích (proton, alpha, electron, đồng vị C12/C14, U235/U238) bay vào từ trường đều B. Phân tích lực Lorentz FL = qvB, bán kính quỹ đạo R và điểm đập trên phim cảm biến.",
    theory: {
      objective: "Khảo sát chuyển động tròn đều của hạt mang điện trong từ trường đều dưới tác dụng của lực từ Lorentz: F_L = |q| · v · B.",
      objectiveEn: "Investigate uniform circular motion of charged particles in a uniform magnetic field governed by Lorentz force: F_L = |q| · v · B.",
      purpose: "Ứng dụng trong máy gia tốc hạt Cyclotron tại CERN, khối phổ kế định tuổi Carbon-14 và làm giàu Uranium-235 trong y tế/năng lượng.",
      purposeEn: "Applications in CERN cyclotron particle accelerators, Carbon-14 archaeological mass spectrometry, and medical isotope enrichment.",
      summary: "Khi hạt điện tích bay vuông góc vào từ trường đều B, lực Lorentz đóng vai trò lực hướng tâm làm hạt chuyển động tròn đều với bán kính R = (m · v) / (|q| · B).",
      summaryEn: "When a charged particle enters perpendicular to uniform B-field, Lorentz force provides centripetal force resulting in circular motion of radius R = (m · v) / (|q| · B).",
      formulas: [
        {
          label: "Bán kính quỹ đạo tròn trong từ trường",
          labelEn: "Cyclotron Orbit Radius",
          formula: "R = (m · v) / (|q| · B) = √[2 · m · U / (|q| · B²)]",
          symbols: [
            { symbol: "R", name: "Bán kính quỹ đạo tròn", nameEn: "Orbit radius", unit: "m hoặc cm", unitEn: "meters or cm" },
            { symbol: "m", name: "Khối lượng của hạt điện tích", nameEn: "Particle mass", unit: "kg", unitEn: "kg" },
            { symbol: "v", name: "Vận tốc của hạt", nameEn: "Particle velocity", unit: "m/s", unitEn: "m/s" },
            { symbol: "q", name: "Điện tích của hạt", nameEn: "Particle charge", unit: "C (Coulomb)", unitEn: "Coulombs" },
            { symbol: "B", name: "Cảm ứng từ của từ trường", nameEn: "Magnetic flux density", unit: "T (Tesla)", unitEn: "Teslas" }
          ]
        },
        {
          label: "Chu kỳ & Tần số Cyclotron",
          labelEn: "Cyclotron Period & Frequency",
          formula: "T = (2π · m) / (|q| · B),   f = (|q| · B) / (2π · m)",
          symbols: [
            { symbol: "T", name: "Chu kỳ quay của hạt (không phụ thuộc v)", nameEn: "Cyclotron period (independent of v)", unit: "s", unitEn: "seconds" },
            { symbol: "f", name: "Tần số quay Cyclotron", nameEn: "Cyclotron frequency", unit: "Hz hoặc MHz", unitEn: "Hz or MHz" }
          ]
        }
      ],
      sgkRef: "SGK Vật lý 11 (Chuyên đề Lực Lorentz & Chuyển động hạt mang điện trong từ trường)",
      sgkRefEn: "Grade 11 Physics & Cambridge A Level (Chapter 20: Magnetic Fields - Charged Particles)",
      guideSteps: [
        "Bước 1: Chọn loại hạt hoặc đồng vị (Proton, Alpha, C12, C14, U235, U238).",
        "Bước 2: Chỉnh cảm ứng từ B (Tesla) và điện áp gia tốc U (kV).",
        "Bước 3: Đổi chiều vectơ từ trường ⊗ (vào trong) hoặc ⊙ (ra ngoài).",
        "Bước 4: Nhấn 'Bắn hạt' để theo dõi quỹ đạo vòng cung và vị trí đập trên màn hứng (khoảng cách 2R)."
      ],
      guideStepsEn: [
        "Step 1: Select ion species (Proton, Alpha, C-12, C-14, U-235, U-238).",
        "Step 2: Set magnetic field B (Tesla) and accelerating voltage U (kV).",
        "Step 3: Toggle B-field direction ⊗ (into screen) or ⊙ (out of screen).",
        "Step 4: Click 'Launch Ion' to observe circular trajectory and impact diameter (2R)."
      ]
    },
    defaultParams: { ionType: "proton", magneticFieldB: 0.8, accelVoltageKV: 5.0, fieldDirection: "into" },
    challenges: [
      {
        id: "c1",
        question: "Hai ion có cùng điện tích q và cùng động năng bay vuông góc vào từ trường đều B. Ion nào có khối lượng m lớn hơn thì bán kính quỹ đạo R sẽ như thế nào?",
        questionEn: "Two ions with equal charge q and equal kinetic energy enter a uniform B field. Which ion with larger mass m has what orbit radius R?",
        options: ["Bán kính R lớn hơn (R tỉ lệ với √m)", "Bán kính R nhỏ hơn", "Bán kính R không đổi", "R bằng 0"],
        optionsEn: ["Larger radius R (R proportional to √m)", "Smaller radius R", "Unchanged radius R", "Zero radius R"],
        correctIndex: 0,
        explanation: "R = mv / (qB) = √(2m·E_k) / (qB) => R tỉ lệ thuận với căn bậc 2 của khối lượng √m (đồng vị nặng hơn đập ở xa hơn).",
        explanationEn: "R = mv / (qB) = √(2m·E_k) / (qB) => R is directly proportional to √m, so heavier isotopes curve with larger radius."
      }
    ]
  },
  {
    id: "g10-circular-motion",
    grade: 10,
    gradeLabel: "Grade 10",
    curriculum: "VN",
    category: "Cơ học",
    title: "Chuyển Động Tròn Đều & Lực Hướng Tâm",
    titleEn: "Uniform Circular Motion & Centripetal Force",
    subtitle: "Khảo sát lực hướng tâm F_ht = m·v²/r, gia tốc hướng tâm và góc nghiêng đường cong an toàn",
    subtitleEn: "Investigate centripetal force F_ht = m·v²/r, centripetal acceleration and banked road angle",
    icon: "RotateCw",
    description: "Mô phỏng vật chuyển động tròn đều trên đĩa quay và xe chạy qua khúc cua nghiêng góc θ. Phân tích vectơ vận tốc tiếp tuyến v, vectơ lực hướng tâm F_ht và tính góc nghiêng thiết kế đường cong.",
    theory: {
      objective: "Kiểm chứng công thức lực hướng tâm F_ht = m·v²/r = m·ω²·r và khảo sát góc nghiêng an toàn tan θ = v²/(g·r) ở khúc cua đường bộ.",
      objectiveEn: "Verify centripetal force equation F_ht = m·v²/r = m·ω²·r and investigate safe road banking angle tan θ = v²/(g·r).",
      purpose: "Thiết kế góc nghiêng khúc cua đường cao tốc/đường đua F1, tàu lượn siêu tốc và tính toán quỹ đạo vệ tinh địa tĩnh.",
      purposeEn: "Design of banked highway & F1 racetrack curves, roller coaster loops, and geostationary satellite orbital mechanics.",
      summary: "Trong chuyển động tròn đều, gia tốc hướng tâm luôn hướng về tâm quỹ đạo và có độ lớn a_ht = v² / r. Hợp lực tác dụng lên vật đóng vai trò lực hướng tâm: F_ht = m · a_ht = m · v² / r.",
      summaryEn: "In uniform circular motion, centripetal acceleration points towards orbit center with magnitude a_ht = v² / r. Net radial force provides centripetal force: F_ht = m · a_ht = m · v² / r.",
      formulas: [
        {
          label: "Lực hướng tâm",
          labelEn: "Centripetal Force Formula",
          formula: "F_ht = m · a_ht = m · (v² / r) = m · ω² · r",
          symbols: [
            { symbol: "F_ht", name: "Lực hướng tâm", nameEn: "Centripetal force", unit: "N (Newton)", unitEn: "Newtons (N)" },
            { symbol: "m", name: "Khối lượng của vật", nameEn: "Object mass", unit: "kg", unitEn: "kg" },
            { symbol: "v", name: "Tốc độ dài", nameEn: "Linear speed", unit: "m/s", unitEn: "m/s" },
            { symbol: "r", name: "Bán kính quỹ đạo tròn", nameEn: "Radius of circle", unit: "m", unitEn: "meters (m)" },
            { symbol: "ω", name: "Tốc độ góc", nameEn: "Angular velocity", unit: "rad/s", unitEn: "rad/s" }
          ]
        },
        {
          label: "Góc nghiêng đường cong an toàn",
          labelEn: "Safe Banking Angle for Curved Road",
          formula: "tan θ = v² / (g · r)",
          symbols: [
            { symbol: "θ", name: "Góc nghiêng mặt đường so với phương ngang", nameEn: "Road banking incline angle", unit: "độ (°)", unitEn: "degrees (°)" },
            { symbol: "g", name: "Gia tốc trọng trường", nameEn: "Gravitational acceleration", unit: "9.81 m/s²", unitEn: "9.81 m/s²" }
          ]
        }
      ],
      sgkRef: "SGK Vật lý 10 (Bài Lực hướng tâm & Chuyển động tròn đều)",
      sgkRefEn: "Grade 10 Physics & Cambridge IGCSE / A Level (Topic: Circular Motion)",
      guideSteps: [
        "Bước 1: Chọn khối lượng vật m (kg) và bán kính quỹ đạo r (m).",
        "Bước 2: Thay đổi tốc độ quay RPM (vòng/phút).",
        "Bước 3: Chuyển đổi góc nhìn 'Mặt phẳng tròn' hoặc 'Góc nghiêng khúc cua θ'.",
        "Bước 4: Ghi nhận lực hướng tâm F_ht (N) và góc nghiêng an toàn θ (°)."
      ],
      guideStepsEn: [
        "Step 1: Set mass m (kg) and radius r (m).",
        "Step 2: Adjust rotation speed RPM.",
        "Step 3: Toggle view perspective 'Top Orbit View' or 'Banked Road θ'.",
        "Step 4: Record centripetal force F_ht (N) and safe banking angle θ (°)."
      ]
    },
    defaultParams: { massKg: 1.5, radiusM: 1.2, rpmSpeed: 30, viewMode: "top_disk" },
    challenges: [
      {
        id: "c1",
        question: "Một vật chuyển động tròn đều với bán kính r không đổi. Nếu tốc độ dài v tăng gấp 2 lần (v' = 2v) thì lực hướng tâm F_ht thay đổi như thế nào?",
        questionEn: "An object moves in uniform circular motion with constant radius r. If linear speed v is doubled (v' = 2v), how does centripetal force F_ht change?",
        options: ["Tăng gấp 4 lần (tỉ lệ với v²)", "Tăng gấp 2 lần", "Giảm 2 lần", "Không đổi"],
        optionsEn: ["Quadrupled (proportional to v²)", "Doubled", "Halved", "Unchanged"],
        correctIndex: 0,
        explanation: "F_ht = m · v² / r. Khi v tăng 2 thì v² tăng 4 => F_ht tăng gấp 4 lần.",
        explanationEn: "F_ht = m · v² / r. Since F_ht is proportional to v², doubling speed quadruples force."
      }
    ]
  },
  {
    id: "g12-thermodynamics-1st",
    grade: 12,
    gradeLabel: "Grade 12",
    curriculum: "VN",
    category: "Nhiệt học",
    title: "Định Luật I Nhiệt Động Lực Học & Giản Đồ P-V",
    titleEn: "1st Law of Thermodynamics & P-V Indicator Cycles",
    subtitle: "Khảo sát biểu thức ΔU = A + Q và 4 quá trình Đẳng nhiệt, Đẳng áp, Đẳng tích, Đoạn nhiệt",
    subtitleEn: "Investigate ΔU = A + Q and 4 processes: Isothermal, Isobaric, Isochoric, Adiabatic",
    icon: "Flame",
    description: "Mô phỏng xilanh khí nén có piston di động, ngọn lửa gia nhiệt và đồ thị chỉ thị P-V. Khảo sát công A, nhiệt lượng Q và độ biến thiên nội năng ΔU.",
    theory: {
      objective: "Kiểm chứng nguyên lý bảo toàn năng lượng trong nhiệt học qua Định luật I Nhiệt động lực học: ΔU = A + Q.",
      objectiveEn: "Verify the First Law of Thermodynamics energy balance equation: ΔU = A + Q across ideal gas processes.",
      purpose: "Hiểu nguyên lý hoạt động của động cơ đốt trong ô tô (chu trình Otto), động cơ phản lực máy bay, tủ lạnh và điều hòa không khí.",
      purposeEn: "Foundational in automobile internal combustion engines (Otto cycle), jet engines, heat pumps, and refrigeration.",
      summary: "Độ biến thiên nội năng của hệ bằng tổng công và nhiệt lượng mà hệ nhận được: ΔU = A + Q. Quy ước dấu: Q > 0 (nhận nhiệt), Q < 0 (tỏa nhiệt), A > 0 (nhận công - bị nén), A < 0 (sinh công - dãn nở).",
      summaryEn: "The change in internal energy equals net heat added plus net work done on the system: ΔU = A + Q. Sign conventions: Q > 0 (heat in), Q < 0 (heat out), A > 0 (work in / compression), A < 0 (work done by gas / expansion).",
      formulas: [
        {
          label: "Định luật I Nhiệt động lực học",
          labelEn: "First Law of Thermodynamics",
          formula: "ΔU = A + Q",
          symbols: [
            { symbol: "ΔU", name: "Độ biến thiên nội năng của khối khí", nameEn: "Internal energy change", unit: "J (Joule)", unitEn: "Joules (J)" },
            { symbol: "A", name: "Công mà khối khí nhận được (A = -P·ΔV)", nameEn: "Work done on gas", unit: "J (Joule)", unitEn: "Joules (J)" },
            { symbol: "Q", name: "Nhiệt lượng mà khối khí nhận được", nameEn: "Heat added to gas", unit: "J (Joule)", unitEn: "Joules (J)" }
          ]
        },
        {
          label: "Nội năng khí lý tưởng đơn nguyên tử",
          labelEn: "Ideal Gas Internal Energy",
          formula: "U = (3/2) · n · R · T => ΔU = (3/2) · n · R · ΔT",
          symbols: [
            { symbol: "n", name: "Số mol khí", nameEn: "Amount of gas", unit: "mol", unitEn: "moles" },
            { symbol: "R", name: "Hằng số khí lý tưởng", nameEn: "Ideal gas constant", unit: "8.314 J/(mol·K)", unitEn: "8.314 J/(mol·K)" },
            { symbol: "T", name: "Nhiệt độ tuyệt đối", nameEn: "Absolute temperature", unit: "K (Kelvin)", unitEn: "Kelvins (K)" }
          ]
        }
      ],
      sgkRef: "SGK Vật lý 12 mới (Chuyên đề Khí lý tưởng & Định luật I Nhiệt động lực học)",
      sgkRefEn: "Grade 12 Physics & Cambridge A Level (Chapter 15: Ideal Gases & Thermodynamics)",
      guideSteps: [
        "Bước 1: Chọn quá trình nhiệt động: Đẳng nhiệt (T), Đẳng áp (P), Đẳng tích (V) hoặc Đoạn nhiệt (Q=0).",
        "Bước 2: Thay đổi nhiệt lượng truyền Q (J) và tỉ số nén thể tích V1/V2.",
        "Bước 3: Quan sát chuyển động của piston và quỹ đạo biến đổi trên giản đồ P - V.",
        "Bước 4: Kiểm tra sự cân bằng của biểu thức ΔU = A + Q."
      ],
      guideStepsEn: [
        "Step 1: Select thermodynamic process: Isothermal (T), Isobaric (P), Isochoric (V) or Adiabatic (Q=0).",
        "Step 2: Adjust heat added Q (J) and volume compression ratio V1/V2.",
        "Step 3: Observe piston motion, flame heating, and state curve on P - V diagram.",
        "Step 4: Verify energy balance equation ΔU = A + Q."
      ]
    },
    defaultParams: { processType: "isothermal", gasMoles: 1.0, heatAddedJoules: 150.0, initialTempK: 300.0, compressionRatio: 1.5 },
    challenges: [
      {
        id: "c1",
        question: "Chất khí trong xilanh dãn nở đẩy piston sinh một công 80 J và nhận từ nguồn nhiệt một nhiệt lượng 120 J. Độ biến thiên nội năng ΔU của khí là bao nhiêu?",
        questionEn: "Gas in a cylinder expands doing 80 J of work while absorbing 120 J of heat. What is the internal energy change ΔU?",
        options: ["+40 J (Nội năng tăng 40 J)", "+200 J", "-40 J", "+80 J"],
        optionsEn: ["+40 J (Internal energy increases by 40 J)", "+200 J", "-40 J", "+80 J"],
        correctIndex: 0,
        explanation: "Khí sinh công nên A = -80 J. Khí nhận nhiệt nên Q = +120 J. ΔU = A + Q = -80 + 120 = +40 J.",
        explanationEn: "Gas expands doing work => A = -80 J. Gas absorbs heat => Q = +120 J. ΔU = A + Q = -80 + 120 = +40 J."
      }
    ]
  }
];
