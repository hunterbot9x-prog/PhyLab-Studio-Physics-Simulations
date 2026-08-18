// SỔ TAY CHUYÊN ĐỀ DẠNG BÀI TẬP & PHƯƠNG PHÁP TƯ DUY GIẢI ĐỀ THI VẬT LÝ
// Chuẩn SGK Việt Nam (Lớp 6-12), Đề thi THPT Quốc Gia, ĐGNL, Cambridge IGCSE & A Level (9702)
// HỖ TRỢ SONG NGỮ 100% (VIETNAMESE & ENGLISH) CHO TOÀN BỘ 37 THÍ NGHIỆM

export const EXAM_METHODOLOGY_DATA_VI = {
  "g6-archimedes": {
    "topic": "Lực đẩy Archimedes & Sự nổi của vật",
    "mindset": {
      "steps": [
        "Bước 1: Phân tích trạng thái của vật (Chìm hoàn toàn, Nổi lơ lửng, hay Nổi một phần trên mặt thoáng).",
        "Bước 2: Xác định thể tích phần chất lỏng bị chiếm chỗ V_chìm (Chú ý: chỉ tính phần nằm ngập trong chất lỏng).",
        "Bước 3: Lập phương trình cân bằng lực khi vật nổi/lơ lửng: P = F_A (với P = d_vật · V_vật, F_A = d_lỏng · V_chìm).",
        "Bước 4: Sử dụng lực kế đo hiệu trọng lượng ngoài không khí và trong chất lỏng: F_A = P_khí - P_chìm."
      ],
      "coreLaw": "F_A = d_lỏng · V_chìm = ρ_lỏng · g · V_chìm",
      "shortcuts": [
        "Tỉ lệ thể tích chìm khi vật nổi: V_chìm / V_vật = d_vật / d_lỏng = ρ_vật / ρ_lỏng",
        "Lực đẩy Archimedes biểu kiến qua lực kế: F_A = P_1 - P_2 = ΔP",
        "Trọng lượng riêng của vật liệu: d_vật = d_lỏng · P_1 / (P_1 - P_2)"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Dạng 1: Tính Lực đẩy Archimedes & Thể tích chìm (Nhận biết - Thông hiểu)",
        "description": "Áp dụng trực tiếp công thức F_A = d · V khi biết thể tích vật hoặc độ dâng mực nước.",
        "formulaSummary": "F_A = d_lỏng · V = 10 · ρ · V",
        "traps": "⚠️ Bẫy đơn vị: Đổi cm³ sang m³ (1 cm³ = 10⁻⁶ m³; 1 dm³ = 1 lít = 10⁻³ m³). Nhầm lẫn giữa khối lượng riêng ρ (kg/m³) và trọng lượng riêng d = 10ρ (N/m³)."
      },
      {
        "id": "type2",
        "name": "Dạng 2: Khảo sát Sự nổi - Tính tỉ lệ chìm/nổi (Vận dụng)",
        "description": "Vật thả vào chất lỏng tự do, xác định phần trăm thể tích nổi trên mặt nước.",
        "formulaSummary": "%V_chìm = (ρ_vật / ρ_lỏng) · 100% | %V_nổi = 100% - %V_chìm",
        "traps": "⚠️ Đề bài hay hỏi 'thể tích phần NỔI' nhưng học sinh tính nhầm ra phần CHÌM."
      },
      {
        "id": "type3",
        "name": "Dạng 3: Xác định khối lượng riêng D qua 2 lần đo lực kế (Vận dụng cao - Thực hành)",
        "description": "Đo trọng lượng P1 trong không khí và P2 khi nhúng trong chất lỏng đã biết d_0.",
        "formulaSummary": "D_vật = (P_1 / (P_1 - P_2)) · D_lỏng",
        "traps": "⚠️ Vật phải chìm hoàn toàn trong chất lỏng nhưng không được chạm đáy cốc."
      }
    ],
    "workedExample": {
      "question": "Một khối gỗ có thể tích V = 500 cm³ được thả vào bể nước (khối lượng riêng của nước D_n = 1000 kg/m³, khối lượng riêng của gỗ D_g = 600 kg/m³). Lấy g = 10 m/s². Tính thể tích phần gỗ nổi trên mặt nước?",
      "thinkingAnalysis": "1) Khối lượng riêng của gỗ (600) nhỏ hơn nước (1000) nên vật nổi lơ lửng một phần trên mặt thoáng.\n2) Khi vật ở trạng thái cân bằng, Trọng lực P cân bằng với Lực đẩy Archimedes F_A: P = F_A.\n3) Từ đó tính được V_chìm = (D_g / D_n) · V, sau đó lấy V_nổi = V - V_chìm.",
      "solution": "1. Đổi đơn vị: V = 500 cm³ = 500 · 10⁻⁶ m³ = 5 · 10⁻⁴ m³.\n2. Trọng lượng của khối gỗ: P = 10 · D_g · V = 10 · 600 · 5·10⁻⁴ = 3.0 N.\n3. Khi gỗ nổi cân bằng trên mặt nước: F_A = P\n   <=> 10 · D_n · V_chìm = 3.0 N\n   <=> V_chìm = 3.0 / (10 · 1000) = 3 · 10⁻⁴ m³ = 300 cm³.\n4. Thể tích phần gỗ nổi trên mặt nước:\n   V_nổi = V - V_chìm = 500 - 300 = 200 cm³.",
      "examTrapWarning": "⚠️ Chú ý: Rất nhiều học sinh sau khi tìm ra V_chìm = 300 cm³ đã vội vàng khoanh đáp án 300 cm³ mà quên mất đề bài yêu cầu tìm 'thể tích phần NỔI' (200 cm³)."
    },
    "practiceQuiz": {
      "question": "Treo một vật kim loại vào lực kế ngoài không khí thấy lực kế chỉ 8.9 N. Nhúng chìm hoàn toàn vật vào trong nước (d_nước = 10000 N/m³) thì lực kế chỉ 7.9 N. Thể tích của vật kim loại là bao nhiêu?",
      "options": [
        "100 cm³",
        "79 cm³",
        "89 cm³",
        "10 cm³"
      ],
      "correctIndex": 0,
      "hint1": "Lực đẩy Archimedes tác dụng lên vật bằng độ giảm số chỉ lực kế: F_A = P_1 - P_2.",
      "hint2": "Dùng công thức F_A = d_nước · V để suy ra V = F_A / d_nước, sau đó đổi từ m³ ra cm³ (1 m³ = 10⁶ cm³).",
      "explanation": "F_A = P_1 - P_2 = 8.9 - 7.9 = 1.0 N. Thể tích V = F_A / d_n = 1.0 / 10000 = 10⁻⁴ m³ = 100 cm³."
    }
  },
  "g7-reflection": {
    "topic": "Định luật Phản xạ Ánh sáng & Gương phẳng",
    "mindset": {
      "steps": [
        "Bước 1: Vẽ pháp tuyến NN' vuông góc với mặt phẳng gương tại điểm tới I.",
        "Bước 2: Xác định góc tới i = (SI, IN) và góc phản xạ i' = (IR, IN). Luôn nhớ i' = i.",
        "Bước 3: Góc hợp bởi tia tới và tia phản xạ là: góc(SIR) = i + i' = 2i.",
        "Bước 4: Góc quay gương: Khi gương quay một góc α thì tia phản xạ quay đi một góc 2α theo cùng chiều quay."
      ],
      "coreLaw": "i' = i; Tia phản xạ nằm trong mặt phẳng tới",
      "shortcuts": [
        "Góc giữa tia tới và tia phản xạ: θ = 2i",
        "Góc giữa tia tới và mặt gương: α = 90° - i => Góc giữa tia tới và phản xạ = 2(90° - α) = 180° - 2α",
        "Gương quay góc α quanh trục song song mặt gương => Tia phản xạ quay 2α"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Dạng 1: Tính góc tới, góc phản xạ và góc giữa 2 tia (Nhận biết - Thông hiểu)",
        "description": "Xác định góc tới i khi biết góc hợp bởi tia tới với mặt gương hoặc giữa 2 tia tới/phản xạ.",
        "formulaSummary": "i = góc(SI, NN') | i' = i | góc(SI, IR) = 2i",
        "traps": "⚠️ Bẫy đề bài cho 'góc giữa tia tới và MẶT GƯƠNG' là α = 90° - i, học sinh nhầm đó là góc tới i."
      },
      {
        "id": "type2",
        "name": "Dạng 2: Bài toán gương quay (Vận dụng)",
        "description": "Giữ cố định tia tới, cho gương quay một góc α. Tìm góc quay của tia phản xạ.",
        "formulaSummary": "Δi' = 2α",
        "traps": "⚠️ Tia phản xạ quay cùng chiều với chiều quay của gương và có độ dời góc gấp đôi (2α)."
      },
      {
        "id": "type3",
        "name": "Dạng 3: Xác định vùng nhìn thấy của gương phẳng & Vận tốc ảnh (Vận dụng cao)",
        "description": "Người và vật di chuyển trước gương phẳng, tìm vận tốc của ảnh đối với người.",
        "formulaSummary": "Vật tiến lại gần gương với vận tốc v => Ảnh tiến lại gần vật với vận tốc tương đối 2v.",
        "traps": "⚠️ Vận tốc của ảnh đối với gương là v, nhưng đối với vật thật là 2v."
      }
    ],
    "workedExample": {
      "question": "Chiếu một tia sáng SI đến gương phẳng sao cho góc hợp bởi tia tới SI và mặt gương là 35°. Tính góc hợp bởi tia tới và tia phản xạ?",
      "thinkingAnalysis": "1) Góc giữa tia tới và mặt gương là α = 35° (không phải góc tới i).\n2) Pháp tuyến vuông góc mặt gương (90°) => Góc tới i = 90° - 35° = 55°.\n3) Góc giữa tia tới và tia phản xạ là 2i = 2 · 55° = 110°.",
      "solution": "1. Xác định góc tới: i = 90° - 35° = 55°.\n2. Theo Định luật phản xạ ánh sáng: i' = i = 55°.\n3. Góc hợp bởi tia tới và tia phản xạ:\n   góc(SIR) = i + i' = 55° + 55° = 110°.",
      "examTrapWarning": "⚠️ Lỗi cực phổ biến: Lấy luôn 35° làm góc tới => 2 · 35° = 70° (SAI)."
    },
    "practiceQuiz": {
      "question": "Một người đứng cách gương phẳng 1.5 m. Nếu người đó lùi xa gương thêm 0.5 m nữa thì khoảng cách giữa người đó và ảnh của mình trong gương là bao nhiêu?",
      "options": [
        "4.0 m",
        "2.0 m",
        "3.0 m",
        "3.5 m"
      ],
      "correctIndex": 0,
      "hint1": "Xác định khoảng cách mới từ người đến gương d = 1.5 + 0.5 m.",
      "hint2": "Ảnh đối xứng qua gương phẳng nên khoảng cách từ người đến ảnh là 2d.",
      "explanation": "Khoảng cách từ người đến gương lúc sau: d = 1.5 + 0.5 = 2.0 m. Khoảng cách giữa người và ảnh ảo trong gương: S = 2d = 2 · 2.0 = 4.0 m."
    }
  },
  "g9-circuit": {
    "topic": "Định luật Ohm, Mạch Nối tiếp & Song song, Công suất tiêu thụ",
    "mindset": {
      "steps": [
        "Bước 1: Vẽ lại sơ đồ tương đương (nếu mạch phức tạp). Nhận diện đoạn mạch: ((R1 // R2) nt R3...).",
        "Bước 2: Ghi nhớ nguyên tắc: Mạch Nối tiếp thì I bằng nhau (I = I1 = I2), U cộng lại (U = U1 + U2). Mạch Song song thì U bằng nhau (U = U1 = U2), I cộng lại (I = I1 + I2).",
        "Bước 3: Tính điện trở tương đương R_tđ từ trong ra ngoài.",
        "Bước 4: Áp dụng Định luật Ohm toàn mạch I = U / R_tđ hoặc I = E / (R_N + r)."
      ],
      "coreLaw": "I = U / R | P = U · I = I² · R = U² / R",
      "shortcuts": [
        "2 điện trở song song: R_tđ = (R1 · R2) / (R1 + R2)",
        "N điện trở R giống nhau song song: R_tđ = R / N",
        "Phân dòng trong mạch song song 2 nhánh: I_1 = I · R2 / (R1 + R2); I_2 = I · R1 / (R1 + R2)",
        "Công suất cực đại trên biến trở R: P_max = E² / (4r) khi R = r"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Dạng 1: Tính điện trở tương đương & Số chỉ Ampe kế, Vôn kế (Thông hiểu)",
        "description": "Mạch nối tiếp, song song hoặc hỗn hợp có mắc dụng cụ đo lý tưởng (R_A ≈ 0, R_V ≈ ∞).",
        "formulaSummary": "R_nt = R1 + R2 | 1/R_ss = 1/R1 + 1/R2",
        "traps": "⚠️ Ampe kế lý tưởng coi như dây dẫn (chập 2 nút), Vôn kế lý tưởng coi như hở mạch (bỏ nhánh vôn kế khi tính R_tđ)."
      },
      {
        "id": "type2",
        "name": "Dạng 2: Bài toán Đèn sáng bình thường & Biến trở (Vận dụng)",
        "description": "Tính điện trở định mức và cường độ định mức của đèn: R_đ = U_đm² / P_đm, I_đm = P_đm / U_đm.",
        "formulaSummary": "R_đ = U_đm² / P_đm | I_đm = P_đm / U_đm",
        "traps": "⚠️ Khi đèn sáng bình thường thì U_đèn = U_đm và P_đèn = P_đm. Nếu mắc vào nguồn khác phải tính lại I thực tế."
      },
      {
        "id": "type3",
        "name": "Dạng 3: Cực trị công suất trên điện trở (Vận dụng cao - Bất đẳng thức Cauchy)",
        "description": "Tìm R để công suất tiêu thụ trên mạch ngoài đạt giá trị lớn nhất.",
        "formulaSummary": "P_max = U² / (4r) khi R_ngoài = r_trong",
        "traps": "⚠️ Phân biệt giữa 'P trên R đạt max' và 'P trên toàn mạch ngoài đạt max'."
      }
    ],
    "workedExample": {
      "question": "Cho mạch điện gồm nguồn điện U = 12V không đổi, mắc nối tiếp với điện trở R1 = 4Ω và một biến trở R2. Điều chỉnh R2 để công suất tiêu thụ trên biến trở R2 đạt giá trị lớn nhất. Tính giá trị R2 và công suất P2_max đó?",
      "thinkingAnalysis": "1) Cường độ dòng điện qua mạch: I = U / (R1 + R2).\n2) Công suất trên R2: P2 = I² · R2 = (U / (R1 + R2))² · R2 = U² / [(R1/√R2 + √R2)²].\n3) Áp dụng bất đẳng thức Cauchy cho mẫu số: (R1/√R2 + √R2) ≥ 2√R1. Dấu '=' xảy ra khi R1/√R2 = √R2 <=> R2 = R1 = 4Ω.",
      "solution": "1. Biểu thức công suất tiêu thụ trên biến trở R2:\n   P2 = I² · R2 = (U² · R2) / (R1 + R2)²\n   Chia cả tử và mẫu cho R2:\n   P2 = U² / (R1/√R2 + √R2)²\n2. Theo BĐT Cauchy: (R1/√R2 + √R2) đạt min khi R1/√R2 = √R2 <=> R2 = R1 = 4 Ω.\n3. Công suất cực đại trên R2 khi đó:\n   P2_max = U² / (4 · R1) = 12² / (4 · 4) = 144 / 16 = 9.0 W.",
      "examTrapWarning": "⚠️ Lỗi hay gặp: Học sinh nhớ máy móc công thức P_max = U² / (4R) nhưng quên điều kiện xảy ra là R2 = R1."
    },
    "practiceQuiz": {
      "question": "Hai điện trở R1 = 6Ω và R2 = 12Ω mắc song song vào nguồn điện không đổi U = 12V. Cường độ dòng điện trong mạch chính bằng bao nhiêu?",
      "options": [
        "3.0 A",
        "1.0 A",
        "2.0 A",
        "0.67 A"
      ],
      "correctIndex": 0,
      "hint1": "Tính điện trở tương đương R_tđ của mạch song song: R_tđ = (R1 · R2) / (R1 + R2).",
      "hint2": "Dòng điện mạch chính theo định luật Ohm: I = U / R_tđ.",
      "explanation": "R_tđ = (6 · 12) / (6 + 12) = 72 / 18 = 4 Ω. Cường độ dòng điện mạch chính: I = U / R_tđ = 12 / 4 = 3.0 A."
    }
  },
  "g10-vertical-spring": {
    "topic": "Lò Xo Treo Thẳng Đứng, Độ Giãn Vị Trí Cân Bằng & Lực Đàn Hồi Cực Trị",
    "mindset": {
      "steps": [
        "Bước 1: Độ giãn của lò xo tại vị trí cân bằng (VTCB) do trọng lực: Δl_0 = (m · g) / k.",
        "Bước 2: Chu kỳ dao động điều hòa của con lắc lò xo treo thẳng đứng: T = 2π √(m / k) = 2π √(Δl_0 / g).",
        "Bước 3: Chiều dài cực đại và cực tiểu của lò xo khi dao động với biên độ A (chọn trục Ox hướng xuống, gốc O tại VTCB):\n   - Chiều dài tại VTCB: l_cb = l_0 + Δl_0.\n   - Chiều dài cực đại: l_max = l_cb + A = l_0 + Δl_0 + A.\n   - Chiều dài cực tiểu: l_min = l_cb - A = l_0 + Δl_0 - A.",
        "Bước 4: Lực đàn hồi của lò xo treo thẳng đứng:\n   - Lực đàn hồi cực đại (ở vị trí thấp nhất x = +A): F_đh_max = k · (Δl_0 + A).\n   - Lực đàn hồi cực tiểu:\n     + Nếu A ≤ Δl_0 (lò xo luôn dãn trong suốt quá trình dao động): F_đh_min = k · (Δl_0 - A) > 0 tại điểm cao nhất x = -A.\n     + Nếu A > Δl_0 (lò xo bị nén ở phần trên): F_đh_min = 0 tại vị trí lò xo không biến dạng x = -Δl_0."
      ],
      "coreLaw": "Δl_0 = (m · g) / k | T = 2π √(Δl_0 / g) | F_đh_max = k · (Δl_0 + A)",
      "shortcuts": [
        "Thời gian lò xo bị NÉN trong 1 chu kỳ (khi A > Δl_0): t_nen = (2 · α / 360°) · T với cos α = Δl_0 / A",
        "Thời gian lò xo bị DÃN trong 1 chu kỳ: t_dan = T - t_nen",
        "Lực phục hồi (lực kéo về): F_ph = -k · x (luôn hướng về VTCB, đổi dấu khi qua O, có F_ph_max = k · A)"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Dạng 1: Tính độ giãn Δl0 và chu kỳ T của con lắc lò xo thẳng đứng (Thông hiểu)",
        "description": "Áp dụng Δl0 = mg/k và T = 2π√(Δl0/g).",
        "formulaSummary": "Δl0 = mg / k | T = 2π√(Δl0 / g)",
        "traps": "⚠️ Đổi Δl0 từ cm sang mét (m) khi thay vào công thức tính chu kỳ T = 2π√(Δl0/g)."
      },
      {
        "id": "type2",
        "name": "Dạng 2: Tìm Lực đàn hồi cực đại F_max và cực tiểu F_min (Vận dụng cao)",
        "description": "So sánh biên độ A với độ giãn cân bằng Δl0 để xác định F_min.",
        "formulaSummary": "F_max = k(Δl0 + A) | F_min = k(Δl0 - A) [nếu A ≤ Δl0] hoặc 0 [nếu A > Δl0]",
        "traps": "⚠️ Rất nhiều học sinh viết F_min = k(Δl0 - A) cả khi A > Δl0 dẫn đến F_min âm (SAI, vì khi lò xo đi qua điểm không biến dạng thì F_đh = 0)."
      }
    ],
    "workedExample": {
      "question": "Một con lắc lò xo treo thẳng đứng có độ cứng k = 100 N/m, khối lượng vật nặng m = 250 g. Lấy g = 10 m/s² và π² = 10. Kéo vật xuống dưới vị trí cân bằng theo phương thẳng đứng một đoạn 5 cm rồi buông nhẹ cho vật dao động điều hòa. Tính: (a) Độ giãn của lò xo tại vị trí cân bằng Δl0. (b) Chu kỳ dao động T. (c) Độ lớn lực đàn hồi cực đại và cực tiểu của lò xo trong quá trình dao động?",
      "thinkingAnalysis": "1) Đổi đơn vị: m = 250 g = 0.25 kg; A = 5 cm = 0.05 m.\n2) Độ giãn tại VTCB: Δl0 = mg / k = (0.25 · 10) / 100 = 0.025 m = 2.5 cm.\n3) Chu kỳ dao động: T = 2π √(m/k) = 2π √(0.25 / 100) = 2π · (0.5 / 10) = 0.1π = 0.314 s.\n4) So sánh: A = 5 cm > Δl0 = 2.5 cm => Lò xo có thời điểm bị nén.\n5) Lực đàn hồi cực đại: F_max = k · (Δl0 + A) = 100 · (0.025 + 0.05) = 100 · 0.075 = 7.5 N.\n6) Lực đàn hồi cực tiểu: Vì A > Δl0 nên F_min = 0 (tại vị trí lò xo không biến dạng).",
      "solution": "1. Độ giãn tại vị trí cân bằng:\n   Δl0 = (m · g) / k = (0.25 kg · 10 m/s²) / 100 N/m = 0.025 m = 2.5 cm.\n2. Chu kỳ dao động:\n   T = 2π · √(m / k) = 2π · √(0.25 / 100) = 0.314 s.\n3. Lực đàn hồi cực đại:\n   F_max = k · (Δl0 + A) = 100 · (0.025 + 0.05) = 7.5 N.\n4. Lực đàn hồi cực tiểu:\n   Vì biên độ A = 5 cm > Δl0 = 2.5 cm nên trong quá trình dao động lò xo đi qua vị trí tự nhiên không biến dạng => F_min = 0 N.",
      "examTrapWarning": "⚠️ Bẫy phòng thi: Nếu tính F_min = k(Δl0 - A) = 100(0.025 - 0.05) = -2.5 N là SAI hoàn toàn. Độ lớn lực đàn hồi không thể âm, nhỏ nhất là 0 N."
    },
    "practiceQuiz": {
      "question": "Một con lắc lò xo treo thẳng đứng dao động điều hòa với biên độ A = 2 cm. Tại VTCB lò xo dãn Δl0 = 4 cm. Tỉ số giữa lực đàn hồi cực đại và lực đàn hồi cực tiểu F_max / F_min là bao nhiêu?",
      "options": [
        "3",
        "2",
        "4",
        "1.5"
      ],
      "correctIndex": 0,
      "hint1": "Vì A = 2 cm < Δl0 = 4 cm nên lò xo luôn luôn dãn: F_max = k(Δl0 + A) và F_min = k(Δl0 - A).",
      "hint2": "F_max / F_min = (Δl0 + A) / (Δl0 - A) = (4 + 2) / (4 - 2) = 6 / 2 = 3.",
      "explanation": "F_max / F_min = (4 + 2) / (4 - 2) = 6 / 2 = 3."
    }
  },
  "g11-lens": {
    "topic": "Thấu kính Mỏng (Hội tụ & Phân kỳ) - Dựng ảnh & Công thức Thấu kính",
    "mindset": {
      "steps": [
        "Bước 1: Xác định loại thấu kính (Thấu kính hội tụ: f > 0; Thấu kính phân kỳ: f < 0).",
        "Bước 2: Xác định tính chất vật và ảnh theo quy ước dấu:\n   - Vật thật d > 0.\n   - Ảnh thật d' > 0 (nằm sau thấu kính, hứng được trên màn, ngược chiều vật k < 0).\n   - Ảnh ảo d' < 0 (nằm trước thấu kính, cùng chiều vật k > 0).",
        "Bước 3: Sử dụng công thức thấu kính: 1/f = 1/d + 1/d' <=> d' = (d · f) / (d - f).",
        "Bước 4: Độ phóng đại ảnh: k = -d' / d = f / (f - d) = (f - d') / f. Chiều cao ảnh: A'B' = |k| · AB."
      ],
      "coreLaw": "1/f = 1/d + 1/d' | k = -d'/d = f / (f - d)",
      "shortcuts": [
        "Khoảng cách giữa vật thật và ảnh thật: L = d + d' ≥ 4f (Điều kiện có ảnh thật là L_min = 4f khi d = d' = 2f)",
        "Dịch chuyển vật đoạn Δd làm ảnh dịch đoạn Δd': d1·d1' = d2·d2'...",
        "Phương pháp Bessel đo tiêu cự thấu kính: f = (L² - a²) / (4L) (với L là khoảng cách vật - màn, a là khoảng cách 2 vị trí đặt thấu kính cho ảnh rõ nét)"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Dạng 1: Xác định vị trí, tính chất ảnh và độ phóng đại k (Nhận biết - Thông hiểu)",
        "description": "Cho vị trí vật d và tiêu cự f, tìm vị trí ảnh d' và độ cao ảnh A'B'.",
        "formulaSummary": "d' = (d · f) / (d - f) | k = -d' / d",
        "traps": "⚠️ Thấu kính phân kỳ f < 0 luôn cho ảnh ảo (d' < 0), cùng chiều, nhỏ hơn vật (|k| < 1)."
      },
      {
        "id": "type2",
        "name": "Dạng 2: Bài toán Khoảng cách Vật - Màn cố định L = d + d' (Vận dụng)",
        "description": "Vật thật và màn cố định cách nhau L, tìm vị trí thấu kính để hứng được ảnh rõ nét trên màn.",
        "formulaSummary": "d² - L·d + L·f = 0 | Điều kiện có nghiệm: L ≥ 4f",
        "traps": "⚠️ Nếu L < 4f thì không bao giờ hứng được ảnh thật trên màn."
      },
      {
        "id": "type3",
        "name": "Dạng 3: Dịch chuyển vật - thấu kính - màn (Vận dụng cao)",
        "description": "Dịch chuyển vật lại gần hoặc ra xa thấu kính một đoạn Δd.",
        "formulaSummary": "k1 = f / (f - d1); k2 = f / (f - d2)",
        "traps": "⚠️ Khi vật dịch lại gần thấu kính hội tụ thì ảnh thật dịch ra xa thấu kính (vật và ảnh luôn dịch chuyển cùng chiều)."
      }
    ],
    "workedExample": {
      "question": "Một vật sáng phẳng nhỏ AB đặt vuông góc với trục chính của một thấu kính hội tụ có tiêu cự f = 20 cm, cách thấu kính một khoảng d = 30 cm. Xác định vị trí, tính chất và số phóng đại của ảnh?",
      "thinkingAnalysis": "1) Thấu kính hội tụ nên tiêu cự f = +20 cm.\n2) Vật thật d = +30 cm (d > f nên chắc chắn cho ảnh thật d' > 0).\n3) Áp dụng công thức thấu kính tính d' = (d · f) / (d - f).\n4) Tính số phóng đại k = -d' / d và kết luận tính chất ảnh.",
      "solution": "1. Vị trí của ảnh:\n   1/f = 1/d + 1/d' => d' = (d · f) / (d - f) = (30 · 20) / (30 - 20) = 600 / 10 = +60 cm.\n   Vì d' = +60 cm > 0 nên đây là ẢNH THẬT, cách thấu kính 60 cm về phía sau.\n2. Số phóng đại của ảnh:\n   k = -d' / d = -60 / 30 = -2.\n   Vì k = -2 < 0 nên ảnh NGƯỢC CHIỀU với vật và có độ cao LỚN GẤP 2 LẦN VẬT (|k| = 2).",
      "examTrapWarning": "⚠️ Chú ý: Đề bài hỏi 'Số phóng đại k' thì phải giữ nguyên dấu (k = -2), nếu hỏi 'Độ phóng đại' hoặc 'ảnh cao gấp mấy lần' thì trả lời độ lớn |k| = 2."
    },
    "practiceQuiz": {
      "question": "Một thấu kính phân kỳ có tiêu cự f = -15 cm. Đặt một vật thật cách thấu kính 30 cm. Ảnh tạo bởi thấu kính có tính chất gì?",
      "options": [
        "Ảnh ảo, cách thấu kính 10 cm, cùng chiều vật",
        "Ảnh thật, cách thấu kính 10 cm, ngược chiều vật",
        "Ảnh ảo, cách thấu kính 30 cm, cùng chiều vật",
        "Ảnh thật, cách thấu kính 30 cm, ngược chiều vật"
      ],
      "correctIndex": 0,
      "hint1": "Thấu kính phân kỳ luôn cho ảnh ảo d' < 0 và cùng chiều vật.",
      "hint2": "Tính d' = (d · f) / (d - f) với f = -15 cm, d = +30 cm.",
      "explanation": "d' = (30 · (-15)) / (30 - (-15)) = -450 / 45 = -10 cm < 0. Ảnh là ảnh ảo, cách thấu kính 10 cm và cùng chiều với vật."
    }
  },
  "g12-rlc": {
    "topic": "Mạch Điện Xoay Chiều RLC Nối Tiếp - Giản Đồ Fresnel & Hiện tượng Cộng Hưởng",
    "mindset": {
      "steps": [
        "Bước 1: Tính cảm kháng Z_L = ωL = 2πfL và dung kháng Z_C = 1/(ωC) = 1/(2πfC).",
        "Bước 2: Tính tổng trở toàn mạch: Z = √[R² + (Z_L - Z_C)²].",
        "Bước 3: Tính cường độ dòng điện hiệu dụng: I = U / Z; I_0 = U_0 / Z.",
        "Bước 4: Tính độ lệch pha giữa điện áp u và dòng điện i: tan φ = (Z_L - Z_C) / R (với φ = φ_u - φ_i).\n   - Nếu Z_L > Z_C (mạch có tính cảm kháng): u sớm pha hơn i (φ > 0).\n   - Nếu Z_L < Z_C (mạch có tính dung kháng): u trễ pha hơn i (φ < 0).\n   - Nếu Z_L = Z_C: Hiện tượng CỘNG HƯỞNG ĐIỆN."
      ],
      "coreLaw": "Z = √[R² + (Z_L - Z_C)²] | tan φ = (Z_L - Z_C) / R | P = U·I·cos φ",
      "shortcuts": [
        "Điều kiện Cộng hưởng: Z_L = Z_C <=> ω²·L·C = 1 <=> f = 1 / (2π√LC)",
        "Khi cộng hưởng: Z_min = R; I_max = U / R; cos φ = 1; P_max = U² / R; u cùng pha với i",
        "Hệ số công suất: cos φ = R / Z = U_R / U",
        "Công thức tính nhanh khi 2 giá trị của ω cho cùng 1 giá trị I (hoặc P): ω_cộng_hưởng = √(ω1 · ω2)"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Dạng 1: Tính tổng trở Z, I hiệu dụng và viết biểu thức i, u (Nhận biết - Thông hiểu)",
        "description": "Tính các giá trị hiệu dụng, cực đại và độ lệch pha φ.",
        "formulaSummary": "i = I_0 · cos(ωt + φ_i) với I_0 = U_0 / Z, φ_i = φ_u - φ",
        "traps": "⚠️ Nhầm giữa giá trị cực đại U_0, I_0 và giá trị hiệu dụng U = U_0/√2, I = I_0/√2."
      },
      {
        "id": "type2",
        "name": "Dạng 2: Bài toán Hiện tượng Cộng hưởng điện (Vận dụng)",
        "description": "Thay đổi f, L, C để I_max, P_max hoặc u cùng pha với i.",
        "formulaSummary": "ω = 1 / √(LC) | P_max = U² / R | U_L = U_C",
        "traps": "⚠️ Khi cộng hưởng, điện áp U_L và U_C có thể rất lớn gấp nhiều lần U nguồn (hiện tượng quá điện áp)."
      },
      {
        "id": "type3",
        "name": "Dạng 3: Bài toán Cực trị RLC (Biến trở R thay đổi, cuộn cảm L hoặc tụ C thay đổi) (Vận dụng cao)",
        "description": "Tìm R để công suất P đạt cực đại khi Z_L ≠ Z_C.",
        "formulaSummary": "R = |Z_L - Z_C| => P_max = U² / (2|Z_L - Z_C|) = U² / (2R)",
        "traps": "⚠️ Khi R thay đổi để P_max thì cos φ = 1/√2 (φ = ±π/4), không phải cos φ = 1."
      }
    ],
    "workedExample": {
      "question": "Đặt điện áp u = 200√2 cos(100πt) (V) vào hai đầu đoạn mạch RLC mắc nối tiếp gồm R = 100 Ω, cuộn cảm thuần L = 1/π H và tụ điện C = 10⁻⁴ / (2π) F. Viết biểu thức cường độ dòng điện tức thời i trong mạch?",
      "thinkingAnalysis": "1) Xác định U_0 = 200√2 V (hoặc U = 200 V) và tần số góc ω = 100π rad/s, pha ban đầu φ_u = 0.\n2) Tính cảm kháng Z_L = ωL = 100π · (1/π) = 100 Ω.\n3) Tính dung kháng Z_C = 1/(ωC) = 1 / [100π · 10⁻⁴/(2π)] = 200 Ω.\n4) Tính tổng trở Z = √[R² + (Z_L - Z_C)²] = √[100² + (100 - 200)²] = 100√2 Ω.\n5) Tính I_0 = U_0 / Z = 200√2 / 100√2 = 2 A.\n6) Tính tan φ = (Z_L - Z_C)/R = (100 - 200)/100 = -1 => φ = -π/4. Pha dòng điện φ_i = φ_u - φ = 0 - (-π/4) = +π/4.",
      "solution": "1. Cảm kháng: Z_L = ω · L = 100π · (1/π) = 100 Ω.\n2. Dung kháng: Z_C = 1 / (ω · C) = 1 / [100π · 10⁻⁴ / (2π)] = 200 Ω.\n3. Tổng trở của mạch:\n   Z = √[R² + (Z_L - Z_C)²] = √[100² + (100 - 200)²] = 100√2 Ω.\n4. Cường độ dòng điện cực đại:\n   I_0 = U_0 / Z = 200√2 / (100√2) = 2.0 A.\n5. Độ lệch pha giữa u và i:\n   tan φ = (Z_L - Z_C) / R = (100 - 200) / 100 = -1 => φ = -π/4 rad.\n   => φ_i = φ_u - φ = 0 - (-π/4) = +π/4 rad.\n6. Biểu thức cường độ dòng điện tức thời:\n   i = 2 cos(100πt + π/4) (A).",
      "examTrapWarning": "⚠️ Lỗi dấu độ lệch pha: φ = φ_u - φ_i => φ_i = φ_u - φ. Vì φ = -π/4 nên φ_i = 0 - (-π/4) = +π/4 rad (dòng điện sớm pha hơn điện áp π/4)."
    },
    "practiceQuiz": {
      "question": "Đoạn mạch RLC nối tiếp có R = 50 Ω, L = 0.5/π H và C = 2·10⁻⁴/π F mắc vào mạng điện xoay chiều có f = 50 Hz. Hệ số công suất cos φ của mạch là bao nhiêu?",
      "options": [
        "1.0 (Cộng hưởng)",
        "0.5",
        "0.707 (√2/2)",
        "0.866 (√3/2)"
      ],
      "correctIndex": 0,
      "hint1": "Tính ω = 2πf = 100π rad/s. Sau đó tính Z_L = ωL và Z_C = 1/(ωC).",
      "hint2": "So sánh Z_L và Z_C. Nếu Z_L = Z_C thì mạch xảy ra hiện tượng cộng hưởng và cos φ = 1.",
      "explanation": "ω = 2πf = 100π rad/s => Z_L = 100π · (0.5/π) = 50 Ω; Z_C = 1 / [100π · (2·10⁻⁴/π)] = 50 Ω. Vì Z_L = Z_C = 50 Ω nên mạch xảy ra hiện tượng cộng hưởng điện => Tổng trở Z = R = 50 Ω => cos φ = R / Z = 50 / 50 = 1.0."
    }
  },
  "alevel-young": {
    "topic": "Giao thoa Ánh sáng Khe Young & Đo Bước Sóng Ánh sáng",
    "mindset": {
      "steps": [
        "Bước 1: Ghi nhớ các thông số hình học: a (khoảng cách 2 khe, đơn vị mm), D (khoảng cách khe - màn, đơn vị m), λ (bước sóng, đơn vị μm hoặc nm).",
        "Bước 2: Khoảng vân i: i = (λ · D) / a.",
        "Bước 3: Vị trí vân sáng bậc k: x_s = k · i (k = 0, ±1, ±2...).\n   Vị trí vân tối thứ k: x_t = (k - 0.5) · i hoặc (k + 0.5) · i.",
        "Bước 4: Bề rộng vùng giao thoa L: Số vân sáng N_s = 2[L / (2i)] + 1; Số vân tối N_t = 2[L / (2i) + 0.5]."
      ],
      "coreLaw": "i = λ·D / a | x_s = k·i | x_t = (k - 0.5)·i",
      "shortcuts": [
        "Đổi đơn vị siêu tốc: a(mm), D(m), λ(μm) => Khoảng vân i tự động ra đơn vị mm!",
        "Khoảng cách giữa N vân sáng liên tiếp: d = (N - 1) · i",
        "Khoảng cách giữa vân sáng bậc k1 và vân sáng bậc k2:\n   - Cùng phía: Δx = |k1 - k2| · i\n   - Khác phía: Δx = (|k1| + |k2|) · i",
        "Giao thoa 2 bức xạ trùng nhau: x1 = x2 <=> k1 · λ1 = k2 · λ2 <=> k1 / k2 = λ2 / λ1 (phân số tối giản)"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Dạng 1: Tính khoảng vân i, vị trí vân sáng / vân tối (Nhận biết - Thông hiểu)",
        "description": "Tìm tọa độ vân sáng bậc k, vân tối thứ k trên màn quan sát.",
        "formulaSummary": "i = λD / a | x_s = k·i | x_t = (k - 0.5)·i",
        "traps": "⚠️ 'Vân tối thứ 3' ứng với k = 3 => x_t = 2.5 i (không phải 3.5 i)."
      },
      {
        "id": "type2",
        "name": "Dạng 2: Số vân sáng, vân tối trên bề rộng trường giao thoa L (Vận dụng)",
        "description": "Đếm số vân quan sát được trên đoạn MN hoặc trường giao thoa đối xứng bề rộng L.",
        "formulaSummary": "N_s = 2·[L / (2i)] + 1",
        "traps": "⚠️ Nếu đoạn MN bất kỳ không đối xứng, lấy x_M ≤ k·i ≤ x_N để đếm số giá trị k nguyên."
      },
      {
        "id": "type3",
        "name": "Dạng 3: Giao thoa nhiều bức xạ (Vân trùng nhau) & Ánh sáng trắng (Vận dụng cao)",
        "description": "Xác định vị trí các vân sáng trùng nhau của 2 bức xạ λ1, λ2.",
        "formulaSummary": "k1/k2 = λ2/λ1 = a/b => i_trùng = a · i1 = b · i2",
        "traps": "⚠️ Phải rút gọn phân số λ2/λ1 về phân số tối giản a/b trước khi tính khoảng vân trùng."
      }
    ],
    "workedExample": {
      "question": "Trong thí nghiệm Y-âng về giao thoa ánh sáng, hai khe cách nhau a = 0.5 mm, khoảng cách từ mặt phẳng chứa hai khe đến màn quan sát là D = 2.0 m. Chiếu vào hai khe ánh sáng đơn sắc có bước sóng λ = 0.5 μm. Khoảng cách từ vân sáng bậc 2 đến vân sáng bậc 5 ở cùng một phía so với vân sáng trung tâm là bao nhiêu?",
      "thinkingAnalysis": "1) Tính khoảng vân i = λ · D / a.\n2) Chú ý chuẩn đơn vị: a = 0.5 mm, D = 2.0 m, λ = 0.5 μm => i = (0.5 · 2.0) / 0.5 = 2.0 mm.\n3) Vì ở 'CÙNG MỘT PHÍA' nên khoảng cách Δx = x_s5 - x_s2 = (5 - 2) · i = 3i = 3 · 2.0 = 6.0 mm.",
      "solution": "1. Khoảng vân giao thoa:\n   i = (λ · D) / a = (0.5 · 2.0) / 0.5 = 2.0 mm.\n2. Vị trí vân sáng bậc 2 và bậc 5 ở cùng một phía đối với vân trung tâm:\n   x_s2 = 2 · i = 2 · 2.0 = 4.0 mm.\n   x_s5 = 5 · i = 5 · 2.0 = 10.0 mm.\n3. Khoảng cách giữa hai vân sáng này:\n   Δx = |x_s5 - x_s2| = 10.0 - 4.0 = 6.0 mm.",
      "examTrapWarning": "⚠️ Nếu đề bài nói 'ở HAI PHÍA KHÁC NHAU' thì khoảng cách sẽ là: Δx = x_s5 + x_s2 = 10 + 4 = 14 mm. Đọc kỹ cụm từ 'cùng phía' hay 'khác phía'."
    },
    "practiceQuiz": {
      "question": "Trong thí nghiệm Y-âng, trên bề rộng vùng giao thoa L = 13 mm đối xứng qua vân trung tâm, người ta đo được khoảng vân i = 1.2 mm. Số vân sáng quan sát được trên màn là bao nhiêu?",
      "options": [
        "11 vân",
        "9 vân",
        "10 vân",
        "12 vân"
      ],
      "correctIndex": 0,
      "hint1": "Vân sáng nằm trong khoảng -L/2 ≤ k · i ≤ +L/2.",
      "hint2": "Thay số: -6.5 ≤ 1.2 · k ≤ 6.5 => -5.41 ≤ k ≤ 5.41. Đếm các giá trị nguyên của k từ -5 đến +5.",
      "explanation": "-6.5 / 1.2 ≤ k ≤ 6.5 / 1.2 <=> -5.41 ≤ k ≤ 5.41 => k ∈ {-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5}. Tổng cộng có 11 giá trị nguyên => 11 vân sáng."
    }
  },
  "alevel-photoelectric": {
    "topic": "Hiện tượng Quang điện Ngoài - Phương trình Einstein & Hằng số Planck",
    "mindset": {
      "steps": [
        "Bước 1: Điều kiện xảy ra hiện tượng quang điện: λ ≤ λ_0 (hoặc f ≥ f_0; photon năng lượng ε = hf ≥ Công thoát Φ).",
        "Bước 2: Phương trình Einstein bảo toàn năng lượng: ε = h·f = h·c/λ = Φ + W_đ0_max = Φ + (1/2)·m_e·v_max².",
        "Bước 3: Hiệu điện thế hãm U_h: Triệt tiêu toàn bộ động năng ban đầu cực đại của quang electron: e · |U_h| = (1/2)·m_e·v_max² = hf - Φ.",
        "Bước 4: Cường độ dòng quang điện bão hòa I_bh = n_e · e (với n_e là số electron bật ra đập vào anot trong 1 giây). Hiệu suất lượng tử H = n_e / n_p."
      ],
      "coreLaw": "h·c/λ = Φ + e·|U_h| | e·|U_h| = (1/2)·m_e·v_max²",
      "shortcuts": [
        "Quy đổi năng lượng nhanh: ε(eV) = 1240 / λ(nm) = 1.24 / λ(μm)",
        "Độ lớn hiệu điện thế hãm tính theo eV: |U_h|(Volt) = [ε(eV) - Φ(eV)] / 1",
        "Vận tốc ban đầu cực đại: v_max = √[2 · e · |U_h| / m_e]",
        "Đồ thị U_h theo tần số f là đường thẳng: |U_h| = (h/e) · f - (Φ/e) (Độ dốc slope = h/e, giúp đo hằng số Planck h)"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Dạng 1: Kiểm tra điều kiện quang điện & Tính công thoát Φ (Nhận biết - Thông hiểu)",
        "description": "Tính giới hạn quang điện λ_0 = hc/Φ và so sánh với bước sóng kích thích λ.",
        "formulaSummary": "λ_0 = h·c / Φ | Điều kiện: λ ≤ λ_0",
        "traps": "⚠️ Chú ý đổi 1 eV = 1.6 · 10⁻¹⁹ J khi tính λ_0 theo mét (m)."
      },
      {
        "id": "type2",
        "name": "Dạng 2: Tính Hiệu điện thế hãm U_h & Vận tốc ban đầu cực đại v_max (Vận dụng)",
        "description": "Áp dụng phương trình Einstein: e·U_h = hc/λ - Φ.",
        "formulaSummary": "e·|U_h| = h·c/λ - Φ | v_max = √(2·e·U_h / m_e)",
        "traps": "⚠️ Khối lượng electron m_e = 9.1 · 10⁻³¹ kg, điện tích electron |e| = 1.6 · 10⁻¹⁹ C."
      },
      {
        "id": "type3",
        "name": "Dạng 3: Xác định hằng số Planck h từ đồ thị U_h - f (Vận dụng cao - A Level Practical)",
        "description": "Đồ thị đường thẳng cắt trục hoành tại tần số ngưỡng f_0 và có hệ số góc slope = h/e.",
        "formulaSummary": "h = slope · e",
        "traps": "⚠️ Đổi đúng trục f từ 10¹⁴ Hz sang Hz khi lấy hệ số góc."
      }
    ],
    "workedExample": {
      "question": "Chiếu bức xạ có bước sóng λ = 0.35 μm vào một tấm kim loại có công thoát electron Φ = 2.36 eV. Cho h = 6.625·10⁻³⁴ J·s; c = 3·10⁸ m/s; 1 eV = 1.6·10⁻¹⁹ J. Tính hiệu điện thế hãm cần đặt vào giữa anôt và catôt để triệt tiêu dòng quang điện?",
      "thinkingAnalysis": "1) Tính năng lượng của photon kích thích: ε = hc / λ (Joule) rồi đổi sang eV.\n2) ε = (6.625·10⁻³⁴ · 3·10⁸) / (0.35·10⁻⁶ · 1.6·10⁻¹⁹) = 3.55 eV (hoặc dùng mẹo 1.24 / 0.35 = 3.543 eV).\n3) So sánh ε = 3.55 eV > Φ = 2.36 eV (xảy ra hiện tượng quang điện).\n4) Động năng ban đầu cực đại: W_đ0_max = e · |U_h| = ε - Φ = 3.55 - 2.36 = 1.19 eV => |U_h| = 1.19 V.",
      "solution": "1. Năng lượng của photon ánh sáng kích thích:\n   ε = (h · c) / λ = (6.625 · 10⁻³⁴ · 3 · 10⁸) / (0.35 · 10⁻⁶) = 5.678 · 10⁻¹⁹ J.\n   Đổi sang eV: ε = 5.678 · 10⁻¹⁹ / (1.6 · 10⁻¹⁹) ≈ 3.549 eV.\n2. Áp dụng phương trình Anh-xtanh:\n   ε = Φ + e · |U_h|\n   => e · |U_h| = ε - Φ = 3.549 eV - 2.36 eV = 1.189 eV.\n3. Hiệu điện thế hãm:\n   |U_h| = 1.19 V (hoặc U_AK ≤ -1.19 V).",
      "examTrapWarning": "⚠️ Đề bài hỏi 'Hiệu điện thế hãm U_h' thì độ lớn là 1.19 V. Nếu hỏi 'Hiệu điện thế giữa Anot và Catot U_AK để triệt tiêu dòng' thì U_AK = -U_h = -1.19 V."
    },
    "practiceQuiz": {
      "question": "Công thoát electron của kim loại Natri là Φ = 2.48 eV. Giới hạn quang điện λ_0 của Natri bằng bao nhiêu?",
      "options": [
        "0.50 μm",
        "0.25 μm",
        "0.65 μm",
        "0.35 μm"
      ],
      "correctIndex": 0,
      "hint1": "Công thức giới hạn quang điện: λ_0 = h·c / Φ.",
      "hint2": "Đổi Φ = 2.48 · 1.6 · 10⁻¹⁹ J = 3.968 · 10⁻¹⁹ J. Hoặc dùng công thức nhanh: λ_0(μm) = 1.24 / Φ(eV).",
      "explanation": "λ_0 = 1.24 / 2.48 = 0.50 μm = 500 nm."
    }
  },
  "alevel-radioactive": {
    "topic": "Định luật Phóng xạ Hạt nhân - Chu kỳ Bán rã & Hằng số Phóng xạ",
    "mindset": {
      "steps": [
        "Bước 1: Xác định số hạt nhân ban đầu N_0 (hoặc khối lượng ban đầu m_0) tại thời điểm t = 0.",
        "Bước 2: Sau thời gian t = k · T_1/2, số hạt nhân CÒN LẠI: N(t) = N_0 · 2^(-t / T) = N_0 · e^(-λt).",
        "Bước 3: Số hạt nhân ĐÃ BỊ PHÂN RÃ (biến thành hạt nhân con): ΔN = N_0 - N(t) = N_0 · (1 - 2^(-t / T)).",
        "Bước 4: Tỉ số giữa hạt nhân con sinh ra và hạt nhân mẹ còn lại: N_con / N_mẹ = ΔN / N(t) = 2^(t/T) - 1."
      ],
      "coreLaw": "N(t) = N_0 · 2^(-t/T) = N_0 · e^(-λt) | λ = ln 2 / T ≈ 0.693 / T",
      "shortcuts": [
        "Quy tắc lũy thừa 2: Sau 1T còn 50% (1/2), sau 2T còn 25% (1/4), sau 3T còn 12.5% (1/8), sau 4T còn 6.25% (1/16)...",
        "Tỉ số hạt sinh ra / hạt còn lại: ΔN / N = 2^(t/T) - 1 => t = T · log_2(1 + N_con / N_mẹ)",
        "Độ phóng xạ: H(t) = λ · N(t) = H_0 · 2^(-t/T) (Đơn vị Bq = 1 phân rã/s; 1 Ci = 3.7·10¹⁰ Bq)"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Dạng 1: Tính số hạt / khối lượng còn lại và đã phân rã (Nhận biết - Thông hiểu)",
        "description": "Tính m(t), N(t) sau khoảng thời gian t.",
        "formulaSummary": "m(t) = m_0 · 2^(-t/T) | Δm = m_0 · (1 - 2^(-t/T))",
        "traps": "⚠️ Đề bài hỏi 'khối lượng CÒN LẠI' hay 'khối lượng ĐÃ BỊ PHÂN RÃ'. Học sinh hay lấy nhầm Δm."
      },
      {
        "id": "type2",
        "name": "Dạng 2: Bài toán Tuổi cổ vật / Tỉ lệ hạt nhân Con và Mẹ (Vận dụng)",
        "description": "Xác định tuổi của mẫu vật địa chất dựa vào tỉ số đồng vị N_con / N_mẹ.",
        "formulaSummary": "t = T · ln(1 + N_con / N_mẹ) / ln 2",
        "traps": "⚠️ Phải chú ý tỉ lệ số hạt N_con/N_mẹ khác với tỉ lệ khối lượng m_con/m_mẹ vì số khối A_con và A_mẹ khác nhau: m_con / m_mẹ = (N_con / N_mẹ) · (A_con / A_mẹ)."
      },
      {
        "id": "type3",
        "name": "Dạng 3: Độ phóng xạ H & Liều lượng chiếu xạ y tế (Vận dụng cao)",
        "description": "Xác định thời gian chiếu xạ của nguồn phóng xạ trong điều trị ung thư.",
        "formulaSummary": "H(t) = λ · N(t) = (ln 2 / T) · (m / A) · N_A",
        "traps": "⚠️ Khi tính H = λN ra đơn vị Becquerel (Bq), chu kỳ T BẮT BUỘC PHẢI ĐỔI RA GIÂY (s)."
      }
    ],
    "workedExample": {
      "question": "Chất phóng xạ Poloni ⁸⁴₂₁₀Po phân rã α tạo thành chì ²⁰⁶₈₂Pb với chu kỳ bán rã T = 138 ngày. Ban đầu có một mẫu Po nguyên chất khối lượng 100 mg. Sau bao lâu thì tỉ số giữa số hạt nhân Chì sinh ra và số hạt nhân Poloni còn lại trong mẫu bằng 3?",
      "thinkingAnalysis": "1) Số hạt Poloni còn lại: N_Po = N_0 · 2^(-t/T).\n2) Số hạt Chì sinh ra: N_Pb = ΔN = N_0 · (1 - 2^(-t/T)).\n3) Tỉ số N_Pb / N_Po = (1 - 2^(-t/T)) / 2^(-t/T) = 2^(t/T) - 1.\n4) Theo đề bài tỉ số này bằng 3 => 2^(t/T) - 1 = 3 <=> 2^(t/T) = 4 = 2² => t/T = 2 => t = 2T = 2 · 138 = 276 ngày.",
      "solution": "1. Tỉ số giữa số hạt nhân chì sinh ra và số hạt nhân poloni còn lại:\n   N_Pb / N_Po = (N_0 - N_Po) / N_Po = (N_0 / N_Po) - 1 = 2^(t / T) - 1.\n2. Theo giả thiết:\n   2^(t / T) - 1 = 3\n   <=> 2^(t / T) = 4 = 2²\n   <=> t / T = 2.\n3. Thời gian cần tìm:\n   t = 2 · T = 2 · 138 = 276 ngày.",
      "examTrapWarning": "⚠️ Chú ý: Đề bài cho tỉ số 'SỐ HẠT NHÂN' (N_Pb / N_Po = 3) thì suy ra trực tiếp t = 2T. Nếu đề bài cho tỉ số 'KHỐI LƯỢNG' (m_Pb / m_Po = 3) thì phải nhân thêm tỉ lệ số khối 206/210."
    },
    "practiceQuiz": {
      "question": "Một chất phóng xạ có chu kỳ bán rã T = 20 ngày. Sau 60 ngày, tỉ lệ phần trăm số hạt nhân bị phân rã là bao nhiêu?",
      "options": [
        "87.5%",
        "12.5%",
        "75%",
        "25%"
      ],
      "correctIndex": 0,
      "hint1": "Tính số chu kỳ bán rã đã trôi qua: k = t / T = 60 / 20 = 3.",
      "hint2": "Sau 3 chu kỳ: Số hạt CÒN LẠI = (1/2)³ = 1/8 = 12.5%. Suy ra số hạt ĐÃ BỊ PHÂN RÃ = 100% - 12.5%.",
      "explanation": "t = 3T => Số hạt còn lại N(t) = N_0 / 2³ = N_0 / 8 = 12.5% N_0. Số hạt đã bị phân rã ΔN = 100% - 12.5% = 87.5%."
    }
  },
  "igcse-hooke": {
    "topic": "Cambridge IGCSE: Định Luật Hooke, Hằng Số Đàn Hồi Lò Xo k & Giới Hạn Đàn Hồi",
    "mindset": {
      "steps": [
        "Bước 1: Phân biệt giữa Chiều dài ban đầu l_0, Chiều dài khi dãn l, và Độ dãn (Extension) x = l - l_0.",
        "Bước 2: Định luật Hooke: Lực đàn hồi tỉ lệ thuận với độ dãn trong giới hạn đàn hồi: F = k · x (với k là hằng số lò xo N/m hoặc N/cm).",
        "Bước 3: Đồ thị F theo x: Đoạn thẳng qua gốc tọa độ biểu thị Định luật Hooke đúng. Độ dốc (Gradient) = k. Điểm uốn cong biểu thị Giới hạn đàn hồi (Limit of Proportionality).",
        "Bước 4: Thế năng đàn hồi (Công thực hiện kéo lò xo) = Diện tích hình tam giác dưới đồ thị F-x: E_p = (1/2) · F · x = (1/2) · k · x²."
      ],
      "coreLaw": "F = k · Δx | E_p = (1/2) · k · (Δx)²",
      "shortcuts": [
        "Ghép 2 lò xo giống nhau nối tiếp: k_hệ = k / 2 (Lò xo mềm hơn, dãn gấp đôi)",
        "Ghép 2 lò xo giống nhau song song: k_hệ = 2k (Lò xo cứng hơn, độ dãn giảm một nửa)",
        "Độ dốc đồ thị Extension (trục tung) vs Load (trục hoành): Gradient = 1/k"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Dạng 1: Tính Độ cứng k & Độ dãn của lò xo (Nhận biết - Thông hiểu)",
        "description": "Áp dụng công thức F = k · x để tìm độ dãn hoặc khối lượng treo vào lò xo.",
        "formulaSummary": "k = F / x = (m · g) / (l - l_0)",
        "traps": "⚠️ Bẫy phổ biến: Lấy nhầm chiều dài tổng l thay vì độ dãn x = l - l_0 khi thay vào F = kx."
      },
      {
        "id": "type2",
        "name": "Dạng 2: Giới hạn đàn hồi & Công / Thế năng đàn hồi (Vận dụng)",
        "description": "Tính thế năng biến dạng đàn hồi bằng diện tích hình phẳng dưới đồ thị Lực - Độ dãn.",
        "formulaSummary": "E_p = Diện tích = (1/2) · F · x = (1/2) · k · x²",
        "traps": "⚠️ Vượt quá giới hạn tỉ lệ, lò xo bị biến dạng vĩnh viễn (biến dạng dẻo) và định luật Hooke không còn đúng."
      },
      {
        "id": "type3",
        "name": "Dạng 3: Ghép lò xo nối tiếp và song song (Vận dụng cao)",
        "description": "Xác định độ cứng tương đương của hệ nhiều lò xo ghép.",
        "formulaSummary": "1/k_nt = 1/k1 + 1/k2 | k_ss = k1 + k2",
        "traps": "⚠️ Hai lò xo ghép nối tiếp cùng chịu lực căng F, nhưng độ dãn tổng bằng tổng độ dãn từng lò xo: x_tong = x1 + x2."
      }
    ],
    "workedExample": {
      "question": "Một lò xo có chiều dài tự nhiên 12.0 cm treo thẳng đứng. Khi treo quả nặng có trọng lượng 4.0 N, chiều dài của lò xo là 20.0 cm. (a) Tính độ cứng k của lò xo. (b) Tính thế năng đàn hồi tích trữ trong lò xo.",
      "thinkingAnalysis": "1) Tính độ dãn x = l - l_0 = 20.0 - 12.0 = 8.0 cm = 0.08 m.\n2) Theo định luật Hooke: k = F / x = 4.0 / 0.08 = 50 N/m.\n3) Thế năng đàn hồi: E_p = 0.5 · k · x² = 0.5 · 50 · 0.08² = 0.16 J.",
      "solution": "1. Độ dãn của lò xo:\n   x = l - l_0 = 20.0 cm - 12.0 cm = 8.0 cm = 0.08 m.\n2. Độ cứng k của lò xo:\n   k = F / x = 4.0 N / 0.08 m = 50.0 N/m.\n3. Thế năng đàn hồi tích trữ trong lò xo:\n   E_p = (1/2) · k · x² = (1/2) · 50.0 · (0.08)² = 0.16 Joules (J).",
      "examTrapWarning": "⚠️ Bẫy thi Cambridge: Để x theo đơn vị cm (8.0 cm) sẽ tính ra E_p = 0.5 · 50 · 8² = 1600 J (SAI lệch 10.000 lần!). Luôn đổi độ dãn sang MÉT (m)."
    },
    "practiceQuiz": {
      "question": "Một lò xo có độ cứng k = 200 N/m. Công cần thực hiện để kéo lò xo dãn từ 0.02 m đến 0.04 m là bao nhiêu?",
      "options": [
        "0.12 J",
        "0.16 J",
        "0.04 J",
        "0.08 J"
      ],
      "correctIndex": 0,
      "hint1": "Công thực hiện bằng độ biến thiên thế năng đàn hồi: W = ΔE_p = (1/2) · k · (x2² - x1²).",
      "hint2": "KHÔNG tính (1/2)·k·(x2 - x1)². Phải bình phương từng độ dãn riêng biệt: (0.04² - 0.02²) = 0.0016 - 0.0004 = 0.0012 m².",
      "explanation": "W = 0.5 · 200 · (0.04² - 0.02²) = 100 · (0.0016 - 0.0004) = 100 · 0.0012 = 0.12 J."
    }
  },
  "igcse-snell": {
    "topic": "Cambridge IGCSE / A Level: Snell's Law, Refractive Index & Total Internal Reflection (TIR)",
    "mindset": {
      "steps": [
        "Bước 1: Định luật khúc xạ ánh sáng (Snell's Law): n1 · sin i = n2 · sin r. Đối với ánh sáng từ không khí vào môi trường: n = sin i / sin r.",
        "Bước 2: Chiết suất n liên hệ với tốc độ ánh sáng: n = c / v = λ_0 / λ_môi_trường (với c = 3·10⁸ m/s). Tần số f không bao giờ đổi khi truyền qua các môi trường.",
        "Bước 3: Hiện tượng Phản xạ Toàn phần (Total Internal Reflection - TIR):\n   - Điều kiện 1: Ánh sáng truyền từ môi trường chiết quang HƠN sang môi trường chiết quang KÉM (n1 > n2).\n   - Điều kiện 2: Góc tới lớn hơn hoặc bằng góc giới hạn: i ≥ c (với sin c = n2 / n1)."
      ],
      "coreLaw": "n1 · sin i = n2 · sin r | n = c / v | sin c = 1 / n",
      "shortcuts": [
        "Góc tới giới hạn từ thủy tinh/nước ra không khí: sin c = 1 / n => c = arcsin(1/n)",
        "Độ dời góc của tia sáng: D = |i - r|",
        "Lưỡng chất phẳng / Độ sâu biểu kiến nhìn từ trên xuống: h' = h / n (Đáy bể nước trông nông hơn thực tế)"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Dạng 1: Tính Chiết suất n & Góc khúc xạ r (Nhận biết - Thông hiểu)",
        "description": "Áp dụng định luật Snell khi ánh sáng truyền vào khối thủy tinh hoặc nước.",
        "formulaSummary": "n = sin i / sin r | v = c / n",
        "traps": "⚠️ Luôn đo góc tới i và góc khúc xạ r so với PHÁP TUYẾN (đường vuông góc với mặt phân cách), không đo so với mặt phân cách."
      },
      {
        "id": "type2",
        "name": "Dạng 2: Phản xạ toàn phần & Góc tới giới hạn c (Vận dụng)",
        "description": "Xác định góc tới giới hạn để tia sáng phản xạ toàn phần hay ló ra ngoài.",
        "formulaSummary": "sin c = n2 / n1 (với n1 > n2)",
        "traps": "⚠️ Phản xạ toàn phần KHÔNG BAO GIỜ xảy ra khi ánh sáng truyền từ không khí vào thủy tinh. Chỉ xảy ra khi truyền từ môi trường chiết quang hơn sang kém."
      },
      {
        "id": "type3",
        "name": "Dạng 3: Bản mặt song song & Lăng kính (Vận dụng cao)",
        "description": "Tia ló khỏi bản mặt song song luôn song song với tia tới và bị dời ngang một đoạn d.",
        "formulaSummary": "Độ dời ngang d = e · sin(i - r) / cos(r)",
        "traps": "⚠️ Với bản mặt song song, góc ló luôn bằng góc tới (i_lo = i_toi)."
      }
    ],
    "workedExample": {
      "question": "Một tia sáng trong không khí chiếu tới một khối thủy tinh (chiết suất n = 1.50) với góc tới i = 45°. (a) Tính góc khúc xạ r trong thủy tinh. (b) Tính góc tới giới hạn phản xạ toàn phần c ở mặt phân cách thủy tinh - không khí.",
      "thinkingAnalysis": "1) Áp dụng định luật Snell: 1.0 · sin(45°) = 1.50 · sin(r).\n2) sin(r) = sin(45°) / 1.50 = 0.7071 / 1.50 = 0.4714 => r = arcsin(0.4714) = 28.1°.\n3) Công thức góc giới hạn: sin c = 1 / n = 1 / 1.50 = 0.6667 => c = arcsin(0.6667) = 41.8°.",
      "solution": "1. Tính góc khúc xạ r:\n   sin i / sin r = n\n   => sin r = sin(45°) / 1.50 = 0.7071 / 1.50 = 0.4714\n   => r = 28.1°.\n2. Tính góc giới hạn phản xạ toàn phần c:\n   sin c = 1 / n = 1 / 1.50 = 0.6667\n   => c = 41.8°.",
      "examTrapWarning": "⚠️ Bẫy thi Cambridge / THPTQG: Chỉ viết sin c = 0.667 mà quên bấm hàm arcsin để ra góc c = 41.8°."
    },
    "practiceQuiz": {
      "question": "Ánh sáng truyền từ kim cương (n = 2.42) vào nước (n = 1.33). Góc tới giới hạn để xảy ra phản xạ toàn phần là bao nhiêu?",
      "options": [
        "33.3°",
        "41.8°",
        "48.8°",
        "24.4°"
      ],
      "correctIndex": 0,
      "hint1": "Áp dụng công thức tổng quát: sin c = n_nhỏ / n_lớn = n_nước / n_kim_cương.",
      "hint2": "sin c = 1.33 / 2.42 = 0.5496. Bấm arcsin(0.5496).",
      "explanation": "sin c = 1.33 / 2.42 = 0.5496 => c = arcsin(0.5496) = 33.34° ≈ 33.3°."
    }
  },
  "alevel-pendulumg": {
    "topic": "Cambridge A Level 9702: Simple Pendulum, Harmonic Oscillations & Measuring Gravity g",
    "mindset": {
      "steps": [
        "Bước 1: Phương trình chu kỳ con lắc đơn dao động góc nhỏ (θ ≤ 10° hay 0.17 rad): T = 2π √(L / g).",
        "Bước 2: Tuyến tính hóa đồ thị thực nghiệm: Bình phương 2 vế ta có T² = (4π² / g) · L.\n   - Trục tung Y = T² (s²), Trục hoành X = L (m).\n   - Đồ thị là đường thẳng đi qua gốc tọa độ có hệ số góc Gradient (slope) m = 4π² / g.",
        "Bước 3: Tính gia tốc trọng trường: g = 4π² / Gradient.",
        "Bước 4: Kỹ thuật giảm sai số thực hành (A Level Paper 3): Đo thời gian của 20 dao động toàn phần (20T), sau đó chia cho 20 để giảm sai số bấm giây phản xạ của người (human reaction time error)."
      ],
      "coreLaw": "T = 2π √(L / g) | T² = (4π² / g) · L | g = 4π² / Gradient",
      "shortcuts": [
        "Con lắc đơn đếm giây (chu kỳ T = 2.0 s): Chiều dài L ≈ 1.0 m (vì g ≈ π²)",
        "Tỉ số chu kỳ khi thay đổi chiều dài: T1 / T2 = √(L1 / L2)",
        "Độ tăng chu kỳ khi nhiệt độ tăng / đưa lên cao: ΔT / T = (1/2) · α · Δt + h / R_Earth"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Dạng 1: Tính Chu kỳ T & Gia tốc Trọng trường g (A Level AS / Lớp 12)",
        "description": "Áp dụng công thức T = 2π√(L/g) cho dao động con lắc đơn góc nhỏ.",
        "formulaSummary": "T = 2π√(L/g) | g = 4π²·L / T²",
        "traps": "⚠️ Chiều dài L bắt buộc phải đo từ điểm treo đến TRỌNG TÂM của quả nặng (L = chiều dài dây + bán kính quả cầu)."
      },
      {
        "id": "type2",
        "name": "Dạng 2: Xử lý Đồ thị Thực nghiệm Paper 5 & Xác định Hệ số góc Gradient",
        "description": "Vẽ đồ thị T² theo L, tìm hệ số góc m và tính phần trăm sai số của g.",
        "formulaSummary": "Gradient = 4π² / g => g = 4π² / m | %Sai số của g = %ΔL + 2·%ΔT",
        "traps": "⚠️ Khi tính sai số cho T², nhớ phải NHÂN ĐÔI phần trăm sai số của T (%Δ(T²) = 2·%ΔT do có số mũ 2)."
      },
      {
        "id": "type3",
        "name": "Dạng 3: Gần đúng Góc nhỏ & Bảo toàn Năng lượng (Vận dụng cao)",
        "description": "Bảo toàn cơ năng giữa vị trí cao nhất (biên độ góc θ_0) và vị trí thấp nhất (VTCB).",
        "formulaSummary": "v_max = √(2 · g · L · (1 - cos θ_0))",
        "traps": "⚠️ Lực căng dây cực đại xuất hiện tại vị trí thấp nhất (VTCB): T_max = m·g · (3 - 2 cos θ_0)."
      }
    ],
    "workedExample": {
      "question": "Trong một bài thi thực hành Vật lý Cambridge A Level, một học sinh đo chu kỳ T ứng với các chiều dài dây L khác nhau của con lắc đơn. Hệ số góc của đồ thị đường thẳng biểu diễn T² (s²) theo L (m) đo được là 4.02 s²/m. (a) Tính giá trị thực nghiệm của gia tốc trọng trường g. (b) Nếu phần trăm sai số trong phép đo T là 1.5% và trong phép đo L là 1.0%, hãy tính phần trăm sai số của g.",
      "thinkingAnalysis": "1) Từ phương trình chu kỳ T² = (4π² / g) · L, hệ số góc của đồ thị tuyến tính là m = 4π² / g.\n2) Từ đó suy ra gia tốc g = 4π² / m = 4π² / 4.02 = 9.82 m/s².\n3) Phần trăm sai số của g: Vì g = 4π²·L / T² nên %Δg = %ΔL + 2 · %ΔT = 1.0% + 2 · 1.5% = 4.0%.",
      "solution": "1. Tính gia tốc trọng trường thực nghiệm g:\n   g = 4 · π² / Gradient = 4 · (3.14159)² / 4.02 = 39.478 / 4.02 = 9.82 m/s².\n2. Tính phần trăm sai số của g:\n   %Δg = %ΔL + 2 · (%ΔT)\n   %Δg = 1.0% + 2 · (1.5%) = 1.0% + 3.0% = 4.0%.\n3. Sai số tuyệt đối và kết quả đo:\n   Δg = 4.0% · 9.82 = 0.39 m/s² => g = (9.8 ± 0.4) m/s².",
      "examTrapWarning": "⚠️ Bẫy thi Cambridge Paper 5: Quên nhân đôi sai số của T khi tính sai số cho T² dẫn đến tính ra %Δg = 2.5% (SAI)."
    },
    "practiceQuiz": {
      "question": "Một con lắc đơn có chu kỳ dao động T = 1.60 s trên Trái Đất. Nếu chiều dài của con lắc tăng gấp 4 lần (4L), chu kỳ dao động mới của con lắc là bao nhiêu?",
      "options": [
        "3.20 s",
        "6.40 s",
        "0.80 s",
        "4.00 s"
      ],
      "correctIndex": 0,
      "hint1": "Chu kỳ tỉ lệ thuận với căn bậc hai của chiều dài: T ∝ √L.",
      "hint2": "Khi chiều dài L tăng 4 lần thì chu kỳ tăng √4 = 2 lần. Chu kỳ mới: T' = 2 · 1.60 s = 3.20 s.",
      "explanation": "T' = 2π√(4L / g) = 2 · (2π√(L/g)) = 2 · 1.60 s = 3.20 s."
    }
  },
  "alevel-internalr": {
    "topic": "Cambridge A Level 9702: Battery EMF E, Internal Resistance r & Potential Dividers",
    "mindset": {
      "steps": [
        "Bước 1: Suất điện động E là tổng công của nguồn sinh ra trên toàn mạch: E = I · (R_ngoài + r) = V + I · r.",
        "Bước 2: Hiệu điện thế hai đầu cực nguồn (Terminal p.d.): V = E - I · r.\n   - Khi hở mạch (I = 0): V = E (Vôn kế đo đúng suất điện động thực).\n   - Khi có tải ngoài R: V < E do bị sụt áp trên điện trở trong (Lost volts = I · r).",
        "Bước 3: Đồ thị V theo I là đường thẳng dốc xuống:\n   - Điểm cắt trục tung (I = 0): Y-intercept = E.\n   - Độ dốc (Gradient / Slope): m = -r.\n   - Điểm cắt trục hoành (V = 0): Dòng ngắn mạch I_sc = E / r."
      ],
      "coreLaw": "E = V + I · r = I · (R + r) | V = E - I · r",
      "shortcuts": [
        "Lost Volts = I · r = E - V",
        "Hiệu suất nguồn điện: H = (P_có_ích / P_toàn_phần) · 100% = (V / E) · 100% = (R / (R + r)) · 100%",
        "Bộ nguồn ghép nối tiếp N nguồn giống nhau: E_bộ = N · E, r_bộ = N · r",
        "Bộ nguồn ghép song song N nguồn giống nhau: E_bộ = E, r_bộ = r / N"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Dạng 1: Tính Suất điện động E, Điện trở trong r & Độ sụt thế Lost Volts (Thông hiểu)",
        "description": "Áp dụng định luật Ohm toàn mạch E = V + I·r cho các điện trở tải R khác nhau.",
        "formulaSummary": "E = I1·(R1 + r) = I2·(R2 + r) => r = (I1·R1 - I2·R2) / (I2 - I1)",
        "traps": "⚠️ Vôn kế mắc trực tiếp vào 2 cực của nguồn khi mạch kín đo hiệu điện thế V = E - Ir, KHÔNG PHẢI suất điện động E (trừ khi mạch hở I = 0)."
      },
      {
        "id": "type2",
        "name": "Dạng 2: Khai thác Đồ thị V theo I (Bài thi Thực hành Cambridge Paper 3/5)",
        "description": "Tìm E từ điểm cắt trục tung và r từ độ lớn hệ số góc.",
        "formulaSummary": "V = -r · I + E => Điểm cắt trục tung = E; Hệ số góc = -r",
        "traps": "⚠️ Hệ số góc m mang dấu ÂM (m = -r). Điện trở trong r là độ lớn tuyệt đối |m| (điện trở luôn dương)."
      },
      {
        "id": "type3",
        "name": "Dạng 3: Định lý Truyền công suất cực đại (Vận dụng cao)",
        "description": "Tìm điện trở tải R để công suất tiêu thụ mạch ngoài đạt giá trị cực đại.",
        "formulaSummary": "P_ngoai_max = E² / (4r) khi R_tai = r",
        "traps": "⚠️ Tại điểm công suất cực đại (R = r), hiệu suất của nguồn điện chỉ đạt đúng 50% (một nửa công suất bị tiêu hao thành nhiệt trên r)."
      }
    ],
    "workedExample": {
      "question": "Một nguồn điện có suất điện động E và điện trở trong r được nối với biến trở R. Khi R = 5.0 Ω, dòng điện trong mạch là 1.20 A. Khi R = 11.0 Ω, dòng điện giảm xuống còn 0.60 A. Tính: (a) Điện trở trong r. (b) Suất điện động E của nguồn điện.",
      "thinkingAnalysis": "1) Viết phương trình định luật Ohm toàn mạch cho 2 trường hợp:\n   Trường hợp 1: E = 1.20 · (5.0 + r)\n   Trường hợp 2: E = 0.60 · (11.0 + r)\n2) Cho 2 biểu thức bằng nhau để giải r:\n   1.20 · (5.0 + r) = 0.60 · (11.0 + r)\n   6.0 + 1.20r = 6.6 + 0.60r => 0.60r = 0.60 => r = 1.0 Ω.\n3) Thay r = 1.0 Ω vào tìm E: E = 1.20 · (5.0 + 1.0) = 7.20 V.",
      "solution": "1. Thiết lập hệ phương trình:\n   E = 1.20 · (5.0 + r)  --- (1)\n   E = 0.60 · (11.0 + r) --- (2)\n2. Giải hệ phương trình tìm r:\n   1.20 · (5.0 + r) = 0.60 · (11.0 + r)\n   6.0 + 1.20r = 6.6 + 0.60r\n   0.60r = 0.60 => r = 1.0 Ω.\n3. Tính suất điện động E:\n   E = 1.20 · (5.0 + 1.0) = 7.20 V.",
      "examTrapWarning": "⚠️ Sai lầm phổ biến: Cho rằng hiệu điện thế 2 đầu nguồn V không đổi khi R thay đổi. Thực tế V biến đổi theo I vì độ sụt thế Ir thay đổi."
    },
    "practiceQuiz": {
      "question": "Một nguồn điện có suất điện động E = 9.0 V và điện trở trong r = 2.0 Ω nối với điện trở R = 10.0 Ω. Hiệu điện thế giữa hai đầu cực nguồn V là bao nhiêu?",
      "options": [
        "7.5 V",
        "9.0 V",
        "1.5 V",
        "6.0 V"
      ],
      "correctIndex": 0,
      "hint1": "Tính cường độ dòng điện trong mạch: I = E / (R + r) = 9.0 / (10.0 + 2.0).",
      "hint2": "Hiệu điện thế mạch ngoài: V = I · R = E - I · r.",
      "explanation": "I = 9.0 / (10 + 2) = 0.75 A. Hiệu điện thế V = I · R = 0.75 · 10.0 = 7.5 V (hoặc V = 9.0 - 0.75 · 2.0 = 7.5 V)."
    }
  },
  "alevel-diffraction": {
    "topic": "Cambridge A Level 9702: Diffraction Gratings, Angular Separation & Wavelength Measurement",
    "mindset": {
      "steps": [
        "Bước 1: Phương trình lưới nhiễu xạ (Grating equation): d · sin θ = n · λ (với d là khoảng cách giữa 2 khe liên tiếp, n là bậc nhiễu xạ n = 0, 1, 2...).",
        "Bước 2: Tính hằng số cách tử d từ mật độ vạch N (lines/mm): d = (1 mm) / N = 10⁻³ / N (m).",
        "Bước 3: Bậc nhiễu xạ cực đại có thể quan sát được: Vì sin θ ≤ 1 nên n_max = ⌊d / λ⌋ (lấy phần nguyên).",
        "Bước 4: Tổng số cực đại (vạch sáng) quan sát được trên màn: Total maxima N_total = 2 · n_max + 1 (gồm n cực đại bên trái, n cực đại bên phải và 1 cực đại trung tâm n = 0)."
      ],
      "coreLaw": "d · sin θ = n · λ | d = 10⁻³ / N | n_max = ⌊d / λ⌋",
      "shortcuts": [
        "Khoảng cách góc giữa 2 vạch phổ: Δθ = θ_red - θ_blue",
        "Đối với ánh sáng trắng: Vạch trung tâm n=0 có màu trắng; các bậc n ≥ 1 bị tán sắc thành dải cầu vồng (tím ở trong, đỏ ở ngoài vì λ_tím < λ_đỏ => θ_tím < θ_đỏ)",
        "Điều kiện chồng lấn phổ bậc k và bậc (k+1): (k+1) · λ_tím ≤ k · λ_đỏ"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Dạng 1: Tính Bước Sóng λ & Góc Nhiễu Xạ θ (Thông hiểu)",
        "description": "Áp dụng phương trình cách tử d · sin θ = n · λ để tìm bước sóng hoặc hằng số cách tử d.",
        "formulaSummary": "λ = (d · sin θ) / n",
        "traps": "⚠️ Đổi số vạch/mm sang hằng số cách tử d tính bằng MÉT (m): ví dụ 500 vạch/mm => d = 10⁻³ / 500 = 2.0 · 10⁻⁶ m."
      },
      {
        "id": "type2",
        "name": "Dạng 2: Bậc nhiễu xạ cực đại n_max & Tổng số vạch sáng quan sát được (Vận dụng)",
        "description": "Tìm bậc cực đại nhìn thấy được sử dụng điều kiện sin θ ≤ 1.",
        "formulaSummary": "n_max = ⌊d / λ⌋ | Tổng số vạch sáng = 2·n_max + 1",
        "traps": "⚠️ Luôn LẤY PHẦN NGUYÊN (làm tròn xuống). Nếu d/λ = 3.8 thì n_max = 3 (bậc 4 đòi hỏi sin θ > 1 là vô lý)."
      },
      {
        "id": "type3",
        "name": "Dạng 3: Quang phổ liên tục của Ánh sáng trắng & Chồng lấn phổ (Vận dụng cao)",
        "description": "Phân tích sự chồng lấn giữa quang phổ bậc 2 và bậc 3.",
        "formulaSummary": "Bắt đầu chồng lấn khi: (n + 1) · λ_tím ≤ n · λ_đỏ",
        "traps": "⚠️ Trong cách tử nhiễu xạ, ánh sáng ĐỎ bị lệch góc LỚN HƠN ánh sáng LAM (ngược lại với hiện tượng tán sắc qua lăng kính nơi tia tím bị lệch nhiều nhất!)."
      }
    ],
    "workedExample": {
      "question": "Chiếu một chùm tia laser đơn sắc có bước sóng λ = 632.8 nm vuông góc với một cách tử nhiễu xạ có mật độ 400 vạch/mm. (a) Tính góc nhiễu xạ ứng với cực đại bậc 2 (n = 2). (b) Xác định tổng số cực đại sáng có thể quan sát được trên màn.",
      "thinkingAnalysis": "1) Tính khoảng cách giữa 2 vạch liên tiếp d = (1 · 10⁻³ m) / 400 = 2.50 · 10⁻⁶ m.\n2) Với n = 2: d · sin θ = 2 · λ => sin θ = (2 · 632.8 · 10⁻⁹) / (2.50 · 10⁻⁶) = 0.50624 => θ = arcsin(0.50624) = 30.41°.\n3) Bậc cực đại: n_max = ⌊d / λ⌋ = ⌊(2.50 · 10⁻⁶) / (632.8 · 10⁻⁹)⌋ = ⌊3.95⌋ = 3.\n   Tổng số cực đại quan sát được = 2 · n_max + 1 = 2 · 3 + 1 = 7.",
      "solution": "1. Hằng số cách tử d:\n   d = 10⁻³ m / 400 = 2.50 · 10⁻⁶ m.\n2. Góc nhiễu xạ bậc 2 (n = 2):\n   d · sin θ_2 = 2 · λ\n   sin θ_2 = (2 · 632.8 · 10⁻⁹ m) / (2.50 · 10⁻⁶ m) = 0.50624\n   => θ_2 = 30.4°.\n3. Bậc nhiễu xạ cực đại:\n   n_max = ⌊d / λ⌋ = ⌊(2.50 · 10⁻⁶) / (632.8 · 10⁻⁹)⌋ = 3.\n4. Tổng số vạch sáng cực đại quan sát được:\n   N_tong = 2 · n_max + 1 = 2 · 3 + 1 = 7 vạch (gồm n = -3, -2, -1, 0, +1, +2, +3).",
      "examTrapWarning": "⚠️ Bẫy phòng thi: Chỉ trả lời có 3 cực đại (quên tính cực đại trung tâm n=0 và các cực đại đối xứng âm n = -1, -2, -3 ở phía đối diện!)."
    },
    "practiceQuiz": {
      "question": "Một cách tử nhiễu xạ có khoảng cách giữa 2 vạch d = 2.0 μm. Một nguồn sáng tạo ra cực đại bậc 1 ở góc θ = 17.5°. Bước sóng của nguồn sáng là bao nhiêu?",
      "options": [
        "601 nm",
        "500 nm",
        "450 nm",
        "650 nm"
      ],
      "correctIndex": 0,
      "hint1": "Áp dụng phương trình cách tử với n = 1: λ = d · sin θ.",
      "hint2": "λ = (2.0 · 10⁻⁶ m) · sin(17.5°) = 2.0 · 10⁻⁶ · 0.3007 = 6.01 · 10⁻⁷ m = 601 nm.",
      "explanation": "λ = d · sin θ / 1 = 2.0 · 10⁻⁶ · sin(17.5°) = 6.01 · 10⁻⁷ m = 601 nm."
    }
  },
  "alevel-resistivity": {
    "topic": "Cambridge A Level 9702: Electrical Resistivity of Metals & Micrometer Screw Gauge",
    "mindset": {
      "steps": [
        "Bước 1: Điện trở dây kim loại tỉ lệ thuận với chiều dài L và tỉ lệ nghịch với tiết diện A: R = ρ · L / A = ρ · L / (π · d² / 4).",
        "Bước 2: Tuyến tính hóa đồ thị R theo L: R = (ρ / A) · L. Đồ thị là đường thẳng qua gốc tọa độ có hệ số góc Gradient m = ρ / A.",
        "Bước 3: Xác định điện trở suất ρ: ρ = Gradient · A = Gradient · (π · d² / 4).",
        "Bước 4: Sử dụng thước panme (Micrometer screw gauge): Đo đường kính d tại ít nhất 3 vị trí khác nhau dọc theo thân dây và theo các hướng vuông góc để lấy giá trị trung bình d_tb, đồng thời hiệu chỉnh sai số điểm không (zero error)."
      ],
      "coreLaw": "R = ρ · L / A | A = π · d² / 4 | ρ = R · A / L",
      "shortcuts": [
        "Kéo dãn dây đồng nhất làm chiều dài tăng n lần => Tiết diện giảm n lần (do V = A·L không đổi) => Điện trở R tăng n² lần!",
        "Tỉ số điện trở 2 dây cùng chất liệu: R1 / R2 = (L1 / L2) · (d2 / d1)²",
        "Phần trăm sai số điện trở suất: %Δρ = %ΔR + %ΔL + 2·%Δd (Sai số của d nhân đôi vì d có bậc 2)"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Dạng 1: Tính Điện trở suất ρ & Điện trở dây kim loại (Thông hiểu)",
        "description": "Áp dụng R = ρ·L/A kết hợp số liệu đo đường kính dây bằng thước panme.",
        "formulaSummary": "ρ = (R · π · d²) / (4 · L)",
        "traps": "⚠️ Đổi đường kính d từ mm sang mét (m) trước khi bình phương! Ví dụ d = 0.40 mm = 0.40 · 10⁻³ m."
      },
      {
        "id": "type2",
        "name": "Dạng 2: Kéo dãn dây kim loại & Bảo toàn thể tích (Vận dụng)",
        "description": "Khi kéo dãn dây làm chiều dài tăng gấp đôi, tính điện trở mới của dây.",
        "formulaSummary": "R' = n² · R (vì thể tích V = A·L không đổi)",
        "traps": "⚠️ Không được coi tiết diện A không đổi. Khi chiều dài tăng n lần thì tiết diện giảm n lần."
      },
      {
        "id": "type3",
        "name": "Dạng 3: Phân tích sai số thực nghiệm trong phép đo điện trở suất (Vận dụng cao)",
        "description": "Đánh giá phần trăm sai số và sai số tuyệt đối của điện trở suất ρ.",
        "formulaSummary": "%Δρ = %ΔR + %ΔL + 2·%Δd",
        "traps": "⚠️ Nguồn sai số lớn nhất thường đến từ phép đo đường kính d bằng panme, và sai số này bị nhân đôi."
      }
    ],
    "workedExample": {
      "question": "Một đoạn dây constantan đồng chất dài L = 1.50 m có đường kính d = 0.50 mm đo được điện trở R = 3.75 Ω. Tính: (a) Điện trở suất ρ của constantan. (b) Điện trở của một đoạn dây constantan khác dài 3.00 m và có đường kính 1.00 mm.",
      "thinkingAnalysis": "1) Tiết diện dây: A = π · (d/2)² = π · (0.25 · 10⁻³)² = 1.963 · 10⁻⁷ m².\n2) Điện trở suất: ρ = R · A / L = (3.75 · 1.963 · 10⁻⁷) / 1.50 = 4.91 · 10⁻⁷ Ω·m.\n3) Với dây thứ hai: Chiều dài tăng gấp đôi (×2), đường kính tăng gấp đôi => Tiết diện tăng gấp 4 (×4) => R2 = R1 · (2 / 4) = 3.75 / 2 = 1.88 Ω.",
      "solution": "1. Tiết diện của dây dẫn A:\n   A = π · (d / 2)² = π · (0.50 · 10⁻³ / 2)² = 1.9635 · 10⁻⁷ m².\n2. Điện trở suất của constantan ρ:\n   ρ = (R · A) / L = (3.75 · 1.9635 · 10⁻⁷) / 1.50 = 4.91 · 10⁻⁷ Ω·m.\n3. Điện trở của đoạn dây thứ hai:\n   R2 = ρ · L2 / A2 = R1 · (L2 / L1) · (d1 / d2)²\n   R2 = 3.75 · (3.00 / 1.50) · (0.50 / 1.00)² = 3.75 · 2 · 0.25 = 1.88 Ω.",
      "examTrapWarning": "⚠️ Bẫy Paper 3: Nhầm đường kính d vào công thức π·r² thay vì bán kính r = d/2. Tiết diện A = π·(d/2)² = π·d² / 4."
    },
    "practiceQuiz": {
      "question": "Một sợi dây dẫn có điện trở R được kéo dãn đều sao cho chiều dài tăng gấp 3 lần (3L). Điện trở mới của sợi dây là bao nhiêu?",
      "options": [
        "9R",
        "3R",
        "R/3",
        "R/9"
      ],
      "correctIndex": 0,
      "hint1": "Do thể tích V = A · L không đổi, khi chiều dài tăng 3 lần (3L) thì tiết diện A giảm 3 lần (A/3).",
      "hint2": "Điện trở mới R' = ρ · (3L) / (A/3) = 9 · (ρL/A) = 9R.",
      "explanation": "R' = ρ · (3L) / (A/3) = 9 · (ρL / A) = 9R."
    }
  },
  "alevel-potentiometer": {
    "topic": "Cambridge A Level 9702: Slide Wire Potentiometer & Null Balance Measurement",
    "mindset": {
      "steps": [
        "Bước 1: Nguyên lý cầu điện thế: Độ giảm điện thế dọc theo dây đồng nhất tỉ lệ thuận với chiều dài đoạn dây V_AJ = E_driver · (L_x / L_total).",
        "Bước 2: Điều kiện cân bằng Null (I_G = 0): Khi con trượt ở vị trí L_x sao cho V_AJ = E_test, không có dòng điện chạy qua điện kế G.",
        "Bước 3: Công thức tính suất điện động chưa biết: E_test = E_driver · (L_x / L_total).",
        "Bước 4: Ưu điểm tuyệt đối của Potentiometer so với Vôn kế: Tại điểm cân bằng, mạch đo không rút bất kỳ dòng điện nào từ nguồn cần đo (I = 0) => Không có sụt áp trên điện trở trong (Ir = 0), đo được chính xác 100% SUẤT ĐIỆN ĐỘNG THỰC E."
      ],
      "coreLaw": "E_test = E_driver · (L_x / L_total) | E1 / E2 = L1 / L2",
      "shortcuts": [
        "So sánh 2 nguồn điện E1 và E2: E1 / E2 = L1 / L2 (không phụ thuộc vào E_driver)",
        "Đo điện trở trong r của pin: Khi mắc thêm điện trở R song song với pin cần đo, chiều dài cân bằng chuyển từ L1 sang L2 => r = R · (L1 - L2) / L2",
        "Điều kiện để tìm được điểm cân bằng: Suất điện động nguồn chính E_driver PHẢI LỚN HƠN suất điện động cần đo E_test"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Dạng 1: Xác định Suất điện động chưa biết E_x từ Chiều dài cân bằng L_x (Thông hiểu)",
        "description": "Áp dụng công thức E_x = E_driver · (L_x / 100) trên dây cầu 1 mét.",
        "formulaSummary": "E_x = E_driver · (L_x / L_tong)",
        "traps": "⚠️ Nếu điện kế G chỉ lệch về 1 phía trên toàn bộ chiều dài dây: kiểm tra xem suất điện động nguồn chính có nhỏ hơn nguồn cần đo không (E_driver < E_test) hoặc cực dương 2 nguồn chưa đấu chung."
      },
      {
        "id": "type2",
        "name": "Dạng 2: So sánh Suất điện động 2 nguồn (E1 / E2 = L1 / L2)",
        "description": "Xác định tỉ số suất điện động mà không cần biết chính xác điện áp nguồn chính.",
        "formulaSummary": "E1 / E2 = L1 / L2",
        "traps": "⚠️ Chiều dài cân bằng KHÔNG PHỤ THUỘC vào điện trở trong r của pin cần đo (vì khi cân bằng I_G = 0 nên Ir = 0)."
      },
      {
        "id": "type3",
        "name": "Dạng 3: Đo Điện trở trong r của pin bằng Potentiometer (Vận dụng cao)",
        "description": "Đo chiều dài cân bằng mạch hở L1 và mạch kín L2 khi mắc điện trở shunt R.",
        "formulaSummary": "r = R · [(L1 - L2) / L2]",
        "traps": "⚠️ L1 là chiều dài cân bằng khi hở mạch (đo E), L2 là chiều dài cân bằng khi đóng mạch qua điện trở tải R (đo V)."
      }
    ],
    "workedExample": {
      "question": "Một dây cầu điện thế AB dài 100.0 cm được nối với nguồn điện chính 2.00 V có điện trở trong không đáng kể. Một pin chuẩn có suất điện động 1.48 V cho điểm cân bằng tại L_x = 74.0 cm. Một pin chưa biết khác cho điểm cân bằng tại L_x = 60.0 cm. Tính: (a) Độ dốc điện thế dọc theo dây. (b) Suất điện động của pin chưa biết.",
      "thinkingAnalysis": "1) Độ dốc điện thế k = V_day / L_tong = 2.00 V / 100.0 cm = 0.020 V/cm (hoặc 2.00 V/m).\n2) Áp dụng tỉ lệ chiều dài cân bằng: E_x / E_chuan = L_x / L_chuan.\n3) E_x = E_chuan · (L_x / L_chuan) = 1.48 · (60.0 / 74.0) = 1.20 V.",
      "solution": "1. Độ dốc điện thế k dọc theo dây AB:\n   k = E_driver / L_tong = 2.00 V / 100.0 cm = 0.020 V/cm = 2.00 V/m.\n2. Suất điện động của pin chưa biết E_x:\n   E_x = k · L_x = 0.020 V/cm · 60.0 cm = 1.20 V.\n   (Hoặc: E_x / 1.48 = 60.0 / 74.0 => E_x = 1.20 V).",
      "examTrapWarning": "⚠️ Câu hỏi lý thuyết Cambridge: 'Tại sao Potentiometer đo suất điện động chính xác hơn vôn kế số?' => Trả lời: Tại điểm cân bằng, mạch đo không rút dòng điện nào từ nguồn (I = 0), do đó không có sụt áp trên điện trở trong (lost volts = 0)."
    }
  },
  "g7-spherical-mirror": {
    "topic": "Gương Cầu Lõm & Gương Cầu Lồi - Tiêu cự & Dựng ảnh",
    "mindset": {
      "steps": [
        "Bước 1: Tiêu cự gương cầu f = R / 2 (Gương cầu lõm f > 0; Gương cầu lồi f < 0).",
        "Bước 2: Tia đặc biệt dựng ảnh:\n   - Tia 1: Song song trục chính => Tia phản xạ đi qua tiêu điểm F (hoặc đường kéo dài qua F).\n   - Tia 2: Đi qua tiêu điểm F => Tia phản xạ song song trục chính.\n   - Tia 3: Đi qua tâm cong C => Tia phản xạ truyền thẳng ngược lại.",
        "Bước 3: Công thức gương cầu: 1/f = 1/d + 1/d' => d' = (d · f) / (d - f). Độ phóng đại k = -d' / d.",
        "Bước 4: Tính chất đặc trưng:\n   - Gương cầu lồi: Luôn cho ảnh ảo (d' < 0), cùng chiều, nhỏ hơn vật (|k| < 1), vùng nhìn thấy rộng (làm gương chiếu hậu ô tô, gương cầu an toàn giao thông góc cua).\n   - Gương cầu lõm: Vật đặt trong khoảng tiêu cự (d < f) cho ảnh ảo lớn hơn vật (gương nha khoa, gương trang điểm); Vật đặt ngoài tiêu cự (d > f) cho ảnh thật ngược chiều."
      ],
      "coreLaw": "f = R / 2 | 1/f = 1/d + 1/d' | k = -d'/d",
      "shortcuts": [
        "Vật thật tại tâm cong C (d = R = 2f) qua gương cầu lõm => Ảnh thật tại C (d' = 2f), ngược chiều, bằng vật (|k| = 1)",
        "Gương cầu lõm biến chùm sáng song song thành chùm hội tụ tại tiêu điểm F (ứng dụng bếp năng lượng mặt trời, kính thiên văn phản xạ)",
        "Nguồn sáng đặt tại tiêu điểm F của gương cầu lõm => Cho chùm phản xạ song song (chóa đèn pin, đèn pha ô tô)"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Dạng 1: Xác định vị trí, tính chất ảnh qua gương cầu lõm (Thông hiểu)",
        "description": "Tìm vị trí ảnh d' và độ cao ảnh A'B' khi biết d và bán kính cong R.",
        "formulaSummary": "f = R/2 | d' = (d·f)/(d - f)",
        "traps": "⚠️ Gương cầu lõm có f > 0. Nếu d < f thì d' < 0 (ảnh ảo sau gương)."
      },
      {
        "id": "type2",
        "name": "Dạng 2: Tính chất ảnh qua gương cầu lồi & Vùng nhìn thấy (Thông hiểu)",
        "description": "Gương cầu lồi có f = -R/2 < 0. Tính khoảng cách ảnh ảo.",
        "formulaSummary": "d' = (d · (-|f|)) / (d + |f|) < 0",
        "traps": "⚠️ Tiêu cự gương cầu lồi LUÔN ÂM (f < 0). Ảnh ảo luôn nằm giữa đỉnh gương O và tiêu điểm F."
      }
    ],
    "workedExample": {
      "question": "Một vật sáng nhỏ AB cao 2 cm đặt vuông góc với trục chính của một gương cầu lõm có bán kính cong R = 40 cm, cách gương một khoảng d = 30 cm. Xác định vị trí, tính chất và chiều cao của ảnh?",
      "thinkingAnalysis": "1) Tiêu cự gương cầu lõm f = R / 2 = 40 / 2 = +20 cm.\n2) d = 30 cm > f = 20 cm => Cho ảnh thật.\n3) Vị trí ảnh: d' = (d · f) / (d - f) = (30 · 20) / (30 - 20) = 600 / 10 = +60 cm.\n4) Số phóng đại: k = -d' / d = -60 / 30 = -2. Chiều cao ảnh A'B' = |k| · AB = 2 · 2 = 4 cm.",
      "solution": "1. Tiêu cự của gương cầu lõm: f = R / 2 = 40 / 2 = +20 cm.\n2. Vị trí của ảnh:\n   d' = (d · f) / (d - f) = (30 · 20) / (30 - 20) = +60 cm > 0 (Ảnh thật, trước gương 60 cm).\n3. Độ phóng đại và chiều cao ảnh:\n   k = -d' / d = -60 / 30 = -2 (Ảnh ngược chiều vật).\n   Chiều cao ảnh: A'B' = |k| · AB = 2 · 2 cm = 4 cm.",
      "examTrapWarning": "⚠️ Chú ý: Đừng quên tính tiêu cự f = R/2 trước khi thay vào công thức thấu kính/gương."
    },
    "practiceQuiz": {
      "question": "Một gương cầu lồi có bán kính cong R = 20 cm. Một vật thật đặt cách gương 10 cm. Vị trí của ảnh cách gương bao nhiêu?",
      "options": [
        "Cách gương 5 cm (ảnh ảo)",
        "Cách gương 5 cm (ảnh thật)",
        "Cách gương 10 cm (ảnh ảo)",
        "Cách gương 20 cm (ảnh thật)"
      ],
      "correctIndex": 0,
      "hint1": "Gương cầu lồi có tiêu cự âm: f = -R/2 = -10 cm.",
      "hint2": "Tính d' = (d · f) / (d - f) = (10 · (-10)) / (10 - (-10)).",
      "explanation": "f = -10 cm. d' = (10 · (-10)) / (10 - (-10)) = -100 / 20 = -5 cm (ảnh ảo, cách gương 5 cm ở phía sau gương)."
    }
  },
  "g8-inclined-plane": {
    "topic": "Mặt Phẳng Nghiêng, Lực Ma Sát & Hiệu Suất Cơ Học",
    "mindset": {
      "steps": [
        "Bước 1: Phân tích lực tác dụng lên vật trên mặt phẳng nghiêng góc α:\n   - Thành phần trọng lực kéo xuống dọc mặt dốc: P_song_song = P · sin α = P · (h / l).\n   - Thành phần trọng lực ép vuông góc mặt dốc: P_vuong_goc = P · cos α.\n   - Phản lực pháp tuyến: N = P · cos α.\n   - Lực ma sát trượt: F_ms = μ · N = μ · P · cos α.",
        "Bước 2: Công có ích (nâng vật trực tiếp lên độ cao h): A_ich = P · h = m · g · h.",
        "Bước 3: Công toàn phần (kéo vật dọc theo chiều dài mặt dốc l): A_tp = F_keo · l.",
        "Bước 4: Hiệu suất mặt phẳng nghiêng: H = (A_ich / A_tp) · 100% = (P · h) / (F_keo · l) · 100%."
      ],
      "coreLaw": "F_keo = P · (h / l) + F_ms | H = (P · h) / (F_keo · l)",
      "shortcuts": [
        "Mặt phẳng nghiêng lý tưởng (không ma sát): F_0 = P · (h / l) = P · sin α",
        "Lực ma sát cản trở: F_ms = F_keo_thuc_te - F_0",
        "Công hao phí do ma sát: A_hp = F_ms · l = A_tp - A_ich",
        "Gia tốc vật trượt tự do xuống dốc có ma sát: a = g · (sin α - μ · cos α)"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Dạng 1: Tính Lực kéo lý tưởng & Lực kéo có ma sát (Nhận biết - Thông hiểu)",
        "description": "Xác định lực kéo cần thiết để kéo đều vật lên mặt phẳng nghiêng.",
        "formulaSummary": "F_keo = P · (h / l) + F_ms",
        "traps": "⚠️ Nhầm lẫn giữa chiều cao h và chiều dài dốc l (luôn có l > h)."
      },
      {
        "id": "type2",
        "name": "Dạng 2: Tính Hiệu suất cơ học H & Công hao phí (Vận dụng)",
        "description": "Tính tỉ lệ công có ích trên công toàn phần.",
        "formulaSummary": "H = (P · h) / (F · l) | A_hp = A_tp · (1 - H)",
        "traps": "⚠️ Hiệu suất H luôn ≤ 100% (hoặc ≤ 1.0). Nếu tính ra H > 100% là tính ngược tỉ số."
      }
    ],
    "workedExample": {
      "question": "Để kéo một thùng hàng có khối lượng m = 60 kg lên sàn xe tải cao h = 1.2 m, người ta dùng một tấm ván dài l = 4.0 m làm mặt phẳng nghiêng. Lấy g = 10 m/s². Lực ma sát giữa thùng hàng và mặt ván là F_ms = 40 N. Tính: (a) Lực kéo thùng hàng lên dốc đều. (b) Hiệu suất của mặt phẳng nghiêng?",
      "thinkingAnalysis": "1) Trọng lượng thùng hàng: P = m · g = 60 · 10 = 600 N.\n2) Lực kéo cần thiết: F_k = P · (h / l) + F_ms = 600 · (1.2 / 4.0) + 40 = 180 + 40 = 220 N.\n3) Công có ích: A_ich = P · h = 600 · 1.2 = 720 J.\n4) Công toàn phần: A_tp = F_k · l = 220 · 4.0 = 880 J.\n5) Hiệu suất: H = (720 / 880) · 100% = 81.82%.",
      "solution": "1. Trọng lượng của thùng hàng: P = m · g = 60 · 10 = 600 N.\n2. Lực kéo thùng hàng lên đều:\n   F_k = P · (h / l) + F_ms = 600 · (1.2 / 4.0) + 40 N = 180 + 40 = 220 N.\n3. Công có ích và công toàn phần:\n   A_ich = P · h = 600 · 1.2 = 720 J.\n   A_tp = F_k · l = 220 · 4.0 = 880 J.\n4. Hiệu suất của mặt phẳng nghiêng:\n   H = (A_ich / A_tp) · 100% = (720 / 880) · 100% = 81.82%.",
      "examTrapWarning": "⚠️ Bẫy thi: Quên cộng lực ma sát F_ms vào lực kéo F_k khiến tính sai công toàn phần A_tp."
    },
    "practiceQuiz": {
      "question": "Kéo đều một vật nặng P = 500 N lên dốc dài l = 5 m, cao h = 1 m bằng một lực F = 125 N. Hiệu suất của mặt phẳng nghiêng là bao nhiêu?",
      "options": [
        "80%",
        "75%",
        "85%",
        "90%"
      ],
      "correctIndex": 0,
      "hint1": "Công có ích: A_ich = P · h = 500 · 1 = 500 J.",
      "hint2": "Công toàn phần: A_tp = F · l = 125 · 5 = 625 J. Hiệu suất H = A_ich / A_tp.",
      "explanation": "H = (500 · 1) / (125 · 5) = 500 / 625 = 0.80 = 80%."
    }
  },
  "g8-lever": {
    "topic": "Đòn Bẩy, Cân Bằng Vật Rắn & Quy Tắc Momen Lực",
    "mindset": {
      "steps": [
        "Bước 1: Xác định trục quay (hoặc điểm tựa O) của đòn bẩy.",
        "Bước 2: Xác định cánh tay đòn d1, d2 (khoảng cách vuông góc từ trục quay O đến giá của các lực F1, F2).",
        "Bước 3: Quy tắc Momen lực (Principle of Moments): Để vật rắn cân bằng, tổng các momen lực làm vật quay theo chiều kim đồng hồ bằng tổng các momen lực làm vật quay ngược chiều kim đồng hồ: M_thuận = M_ngược <=> F1 · d1 = F2 · d2.",
        "Bước 4: Lợi về lực: F2 = F1 · (d1 / d2). Đòn bẩy cho lợi về lực khi d1 > d2 (cánh tay đòn của lực tác dụng dài hơn cánh tay đòn của tải trọng)."
      ],
      "coreLaw": "M = F · d | F1 · d1 = F2 · d2",
      "shortcuts": [
        "Đòn bẩy loại 1: Điểm tựa O nằm giữa điểm đặt của F1 và F2 (kéo, bập bênh, đòn bẩy nạy đá)",
        "Đòn bẩy loại 2: Tải trọng nằm giữa điểm tựa O và lực nâng F (xe cút kít, kẹp hạt dẻ, mở nắp chai - luôn lợi về lực vì d_nang > d_tai)",
        "Đòn bẩy loại 3: Lực nâng nằm giữa điểm tựa O và tải trọng (cần câu cá, kẹp gắp đá, cánh tay người - thiệt về lực nhưng lợi về đường đi và tốc độ)"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Dạng 1: Áp dụng Quy tắc Momen lực tính lực cân bằng (Nhận biết - Thông hiểu)",
        "description": "Tìm độ lớn lực F2 khi biết F1 và các cánh tay đòn d1, d2.",
        "formulaSummary": "F1 · d1 = F2 · d2 => F2 = F1 · d1 / d2",
        "traps": "⚠️ Cánh tay đòn d là khoảng cách VUÔNG GÓC từ trục quay đến giá của lực, không phải chiều dài thanh nếu lực nghiêng."
      },
      {
        "id": "type2",
        "name": "Dạng 2: Thanh có trọng lượng bản thân P_thanh (Vận dụng)",
        "description": "Trọng lực P_thanh đặt tại trọng tâm G (trung điểm của thanh đồng chất).",
        "formulaSummary": "F1 · d1 + P_thanh · d_G = F2 · d2",
        "traps": "⚠️ Quên tính Momen của trọng lực thanh P_thanh làm thanh tự quay."
      }
    ],
    "workedExample": {
      "question": "Một đòn bẩy có điểm tựa O. Đặt một vật nặng có trọng lượng P = 200 N tại điểm A cách O một khoảng OA = 20 cm. Cần tác dụng một lực F tối thiểu bằng bao nhiêu tại điểm B cách O một khoảng OB = 80 cm theo phương vuông góc với đòn bẩy để nâng vật lên?",
      "thinkingAnalysis": "1) Trục quay tại điểm tựa O.\n2) Cánh tay đòn của trọng lượng P là d1 = OA = 20 cm = 0.2 m.\n3) Cánh tay đòn của lực nâng F là d2 = OB = 80 cm = 0.8 m.\n4) Điều kiện cân bằng đòn bẩy: F · OB = P · OA => F = P · (OA / OB) = 200 · (20 / 80) = 50 N.",
      "solution": "1. Theo quy tắc Momen lực cân bằng đòn bẩy:\n   M_P = M_F\n   <=> P · OA = F · OB\n2. Lực tối thiểu cần tác dụng tại B:\n   F = P · (OA / OB) = 200 · (20 / 80) = 200 · (1 / 4) = 50 N.",
      "examTrapWarning": "⚠️ Lợi về lực 4 lần (OB = 4 OA) nhưng sẽ thiệt 4 lần về quãng đường dịch chuyển của điểm B theo định luật về công."
    },
    "practiceQuiz": {
      "question": "Một thanh đòn nhẹ dài 1.0 m có điểm tựa O ở chính giữa (cách mỗi đầu 0.5 m). Treo vật m1 = 6 kg ở đầu bên trái. Để thanh cân bằng nằm ngang, cần treo vật m2 cách điểm tựa O 0.3 m về phía bên phải có khối lượng bằng bao nhiêu?",
      "options": [
        "10 kg",
        "8 kg",
        "12 kg",
        "4 kg"
      ],
      "correctIndex": 0,
      "hint1": "Áp dụng phương trình momen: m1 · g · d1 = m2 · g · d2 => m1 · d1 = m2 · d2.",
      "hint2": "m2 = m1 · d1 / d2 = 6 · 0.5 / 0.3 = 3.0 / 0.3 = 10 kg.",
      "explanation": "6 kg · 0.5 m = m2 · 0.3 m => m2 = 3.0 / 0.3 = 10 kg."
    }
  },
  "g10-free-fall": {
    "topic": "Chuyển Động Rơi Tự Do & Chuyển Động Thẳng Biến Đổi Đều",
    "mindset": {
      "steps": [
        "Bước 1: Rơi tự do là chuyển động thẳng nhanh dần đều không vận tốc đầu (v_0 = 0) dưới tác dụng duy nhất của trọng lực với gia tốc a = g ≈ 9.8 m/s² (hoặc 10 m/s²).",
        "Bước 2: Hệ phương trình rơi tự do:\n   - Vận tốc tại thời điểm t: v(t) = g · t.\n   - Quãng đường rơi sau thời gian t: s(t) = (1/2) · g · t².\n   - Công thức độc lập thời gian: v² = 2 · g · s => v = √(2gs).",
        "Bước 3: Thời gian rơi từ độ cao h: t = √(2h / g). Vận tốc chạm đất: v_cham_dat = √(2gh).",
        "Bước 4: Quãng đường đi được trong giây thứ n: Δs_n = s(n) - s(n - 1) = g · (n - 0.5)."
      ],
      "coreLaw": "v = g · t | s = (1/2) · g · t² | v² = 2 · g · s",
      "shortcuts": [
        "Tỉ lệ quãng đường rơi trong các giây liên tiếp: s_1 : s_2 : s_3 : s_4... = 1 : 3 : 5 : 7 : 9...",
        "Quãng đường rơi trong 1 giây cuối cùng trước khi chạm đất: Δs_cuoi = v_cham_dat - (1/2) · g",
        "Ném thẳng đứng lên cao với vận tốc v_0: Độ cao cực đại H_max = v_0² / (2g); Thời gian lên = Thời gian xuống = v_0 / g"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Dạng 1: Tính thời gian rơi, vận tốc chạm đất và độ cao h (Nhận biết - Thông hiểu)",
        "description": "Áp dụng t = √(2h/g) và v = √(2gh).",
        "formulaSummary": "t = √(2h/g) | v = √(2gh)",
        "traps": "⚠️ Lấy đúng giá trị g đề bài cho (g = 9.8 m/s² hay g = 10 m/s²)."
      },
      {
        "id": "type2",
        "name": "Dạng 2: Bài toán Quãng đường trong giây thứ n hoặc n giây cuối (Vận dụng)",
        "description": "Lấy hiệu quãng đường: Δs = s(t) - s(t - Δt).",
        "formulaSummary": "Δs_giay_thu_n = g · (n - 0.5)",
        "traps": "⚠️ Phân biệt 'quãng đường rơi TRONG n giây' (s = 0.5 g n²) và 'quãng đường rơi trong GIÂY THỨ n' (Δs = g(n - 0.5))."
      }
    ],
    "workedExample": {
      "question": "Thả một vật rơi tự do từ độ cao h xuống đất. Lấy g = 10 m/s². Trong 1 giây cuối cùng trước khi chạm đất, vật rơi được quãng đường 35 m. Tính: (a) Tổng thời gian rơi của vật. (b) Độ cao h nơi thả vật?",
      "thinkingAnalysis": "1) Gọi tổng thời gian rơi là t (giây).\n2) Quãng đường rơi trong cả thời gian t: s(t) = 0.5 · g · t² = 5t².\n3) Quãng đường rơi trong (t - 1) giây đầu tiên: s(t - 1) = 0.5 · g · (t - 1)² = 5(t - 1)².\n4) Quãng đường rơi trong 1 giây cuối: Δs = s(t) - s(t - 1) = 5t² - 5(t² - 2t + 1) = 10t - 5 = 35 m.\n5) Giải ra: 10t = 40 => t = 4 s. Độ cao h = 5 · 4² = 80 m.",
      "solution": "1. Quãng đường rơi trong 1 giây cuối cùng:\n   Δs = s(t) - s(t - 1)\n   <=> 35 = (1/2) · 10 · t² - (1/2) · 10 · (t - 1)²\n   <=> 35 = 5t² - 5(t² - 2t + 1) = 10t - 5\n   <=> 10t = 40 => t = 4.0 giây.\n2. Độ cao h thả vật:\n   h = (1/2) · g · t² = (1/2) · 10 · 4² = 5 · 16 = 80 mét.",
      "examTrapWarning": "⚠️ Cách giải siêu nhanh: Δs_cuoi = g(t - 0.5) => 35 = 10(t - 0.5) => t - 0.5 = 3.5 => t = 4s."
    },
    "practiceQuiz": {
      "question": "Một vật rơi tự do từ độ cao 45 m xuống đất. Lấy g = 10 m/s². Vận tốc của vật ngay trước khi chạm đất là bao nhiêu?",
      "options": [
        "30 m/s",
        "45 m/s",
        "20 m/s",
        "15 m/s"
      ],
      "correctIndex": 0,
      "hint1": "Sử dụng công thức liên hệ trực tiếp giữa vận tốc và độ cao: v = √(2gh).",
      "hint2": "v = √(2 · 10 · 45) = √900 = 30 m/s.",
      "explanation": "v = √(2 · g · h) = √(2 · 10 · 45) = √900 = 30 m/s."
    }
  },
  "g10-projectile": {
    "topic": "Chuyển Động Ném Ngang & Ném Xiên - Quỹ Đạo Parabol & Tầm Xa",
    "mindset": {
      "steps": [
        "Bước 1: Phương pháp Tọa độ - Phân tích chuyển động 2D thành 2 chuyển động thành phần độc lập trên 2 trục tọa độ vuông góc:\n   - Trục Ox (phương ngang): Không có lực cản => Chuyển động THẲNG ĐỀU với vận tốc v_x = v_0 · cos θ; Tọa độ x(t) = (v_0 · cos θ) · t.\n   - Trục Oy (phương thẳng đứng hướng lên): Chịu tác dụng của trọng lực => Chuyển động BIẾN ĐỔI ĐỀU với gia tốc a_y = -g; Vận tốc v_y(t) = v_0 · sin θ - g · t; Tọa độ y(t) = (v_0 · sin θ) · t - (1/2) · g · t².",
        "Bước 2: Thời gian vật đạt độ cao cực đại (khi v_y = 0): t_dinh = (v_0 · sin θ) / g.",
        "Bước 3: Tầm cao cực đại (Max Height): H_max = (v_0² · sin² θ) / (2g).",
        "Bước 4: Tổng thời gian bay: T = 2 · t_dinh = (2 · v_0 · sin θ) / g. Tầm xa cực đại (Range): R = v_x · T = (v_0² · sin 2θ) / g. (Tầm xa lớn nhất khi góc ném θ = 45°: R_max = v_0² / g)."
      ],
      "coreLaw": "x = (v_0 cos θ)·t | y = (v_0 sin θ)·t - 0.5gt² | R = (v_0² sin 2θ) / g",
      "shortcuts": [
        "Phương trình quỹ đạo Parabol: y = (tan θ) · x - [g / (2 v_0² cos² θ)] · x²",
        "Ném ngang (θ = 0°): Thời gian rơi t = √(2h/g) (bằng thời gian thả rơi tự do cùng độ cao); Tầm xa L = v_0 · √(2h/g)",
        "Hai góc ném có tổng bằng 90° (θ1 + θ2 = 90°) cho CÙNG MỘT TẦM XA R (vì sin 2θ1 = sin 2(90° - θ1) = sin 2θ2)"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Dạng 1: Chuyển động Ném Ngang từ độ cao h (Thông hiểu)",
        "description": "Tính thời gian rơi t, tầm xa L và vận tốc chạm đất v_cd = √(v_0² + 2gh).",
        "formulaSummary": "t = √(2h/g) | L = v_0 · √(2h/g)",
        "traps": "⚠️ Thời gian rơi của ném ngang KHÔNG PHỤ THUỘC vào vận tốc ban đầu v_0, chỉ phụ thuộc vào độ cao h."
      },
      {
        "id": "type2",
        "name": "Dạng 2: Chuyển động Ném Xiên - Tầm Cao & Tầm Xa (Vận dụng)",
        "description": "Tính H_max và Range R khi biết vận tốc ném v_0 và góc ném θ.",
        "formulaSummary": "H_max = (v_0 sin θ)² / (2g) | R = (v_0² sin 2θ) / g",
        "traps": "⚠️ Phân biệt sin² θ = (sin θ)² trong công thức H_max và sin 2θ = sin(2θ) trong công thức tầm xa R."
      }
    ],
    "workedExample": {
      "question": "Một quả bóng được đá từ mặt đất với vận tốc ban đầu v_0 = 20 m/s hợp với phương ngang một góc θ = 30°. Lấy g = 10 m/s². Bỏ qua lực cản không khí. Tính: (a) Độ cao cực đại H_max quả bóng đạt được. (b) Tầm xa R của quả bóng khi chạm đất?",
      "thinkingAnalysis": "1) Vận tốc thành phần ban đầu: v_0x = 20 · cos(30°) = 10√3 m/s; v_0y = 20 · sin(30°) = 10 m/s.\n2) Tầm cao cực đại: H_max = v_0y² / (2g) = 10² / (2 · 10) = 100 / 20 = 5.0 m.\n3) Thời gian bóng bay trong không khí: T = 2 · v_0y / g = 2 · 10 / 10 = 2.0 s.\n4) Tầm xa: R = v_0x · T = 10√3 · 2.0 = 20√3 ≈ 34.64 m.",
      "solution": "1. Độ cao cực đại H_max:\n   H_max = (v_0 · sin θ)² / (2g) = (20 · sin 30°)² / (2 · 10) = 10² / 20 = 5.0 mét.\n2. Tầm bay xa R:\n   R = (v_0² · sin 2θ) / g = (20² · sin 60°) / 10 = (400 · √3 / 2) / 10 = 20√3 ≈ 34.64 mét.",
      "examTrapWarning": "⚠️ Bẫy phòng thi: Nhầm góc 2θ = 60° thành góc 30° khi bấm máy tính tầm xa."
    },
    "practiceQuiz": {
      "question": "Từ độ cao h = 20 m, một vật được ném theo phương ngang với vận tốc v_0 = 15 m/s. Lấy g = 10 m/s². Tầm xa của vật khi chạm đất là bao nhiêu?",
      "options": [
        "30 m",
        "20 m",
        "15 m",
        "45 m"
      ],
      "correctIndex": 0,
      "hint1": "Thời gian rơi: t = √(2h / g) = √(2 · 20 / 10) = √4 = 2.0 s.",
      "hint2": "Tầm xa L = v_0 · t = 15 · 2.0 = 30 m.",
      "explanation": "t = √(2 · 20 / 10) = 2 s => Tầm xa L = v_0 · t = 15 · 2 = 30 m."
    }
  },
  "g10-momentum": {
    "topic": "Định Luật Bảo Toàn Động Lượng, Xung Lượng & Các Dạng Va Chạm",
    "mindset": {
      "steps": [
        "Bước 1: Vectơ động lượng của vật: p_vec = m · v_vec (Đơn vị: kg·m/s hoặc N·s).",
        "Bước 2: Định lý biến thiên động lượng (Xung lượng của lực): Δp_vec = F_vec · Δt (Lực tác dụng càng lớn hoặc thời gian va chạm càng dài thì độ biến thiên động lượng càng lớn).",
        "Bước 3: Định luật Bảo toàn Động lượng cho hệ kín (cô lập): Tổng p_truoc = Tổng p_sau <=> m1 · v1_vec + m2 · v2_vec = m1 · v1'_vec + m2 · v2'_vec.",
        "Bước 4: Phân loại 2 dạng va chạm chính:\n   - Va chạm Hoàn toàn Đàn hồi (Elastic collision): Bảo toàn cả Động lượng VÀ Động năng W_đ (hệ số phục hồi e = 1).\n   - Va chạm Mềm (Inelastic / Plastic collision): Hai vật dính vào nhau chuyển động cùng vận tốc V chung => Động lượng bảo toàn nhưng Động năng KHÔNG bảo toàn (một phần cơ năng chuyển thành nhiệt năng Q tỏa ra)."
      ],
      "coreLaw": "m1·v1 + m2·v2 = (m1 + m2)·V_chung | F · Δt = Δp",
      "shortcuts": [
        "Va chạm mềm: V_chung = (m1·v1 + m2·v2) / (m1 + m2)",
        "Nhiệt lượng tỏa ra trong va chạm mềm: Q = W_đ_truoc - W_đ_sau = (1/2) · [m1·m2 / (m1 + m2)] · (v1 - v2)²",
        "Va chạm đàn hồi xuyên tâm 2 vật (vật 2 ban đầu đứng yên v2 = 0):\n   v1' = (m1 - m2)·v1 / (m1 + m2); v2' = 2m1·v1 / (m1 + m2)\n   (Nếu m1 = m2: Vật 1 dừng lại v1'=0, truyền toàn bộ vận tốc cho vật 2 v2'=v1 - hiện tượng con lắc Newton!)"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Dạng 1: Va chạm Mềm & Chuyển động bằng Phản lực (Thông hiểu)",
        "description": "Hai vật dính liền nhau sau va chạm hoặc bài toán súng giật khi bắn đạn.",
        "formulaSummary": "V_chung = (m1·v1 + m2·v2) / (m1 + m2)",
        "traps": "⚠️ Vận tốc là đại lượng VECTƠ, phải chọn trục tọa độ và mang dấu âm (-) nếu chuyển động ngược chiều."
      },
      {
        "id": "type2",
        "name": "Dạng 2: Va chạm Đàn hồi Xuyên tâm & Bảo toàn Động năng (Vận dụng cao)",
        "description": "Hệ bảo toàn cả động lượng và động năng.",
        "formulaSummary": "v1 - v2 = v2' - v1' (Vận tốc tương đối đổi dấu sau va chạm)",
        "traps": "⚠️ Không áp dụng công thức bảo toàn cơ năng nếu đề bài cho va chạm không đàn hồi."
      }
    ],
    "workedExample": {
      "question": "Một viên đạn khối lượng m = 20 g bay theo phương ngang với vận tốc v = 400 m/s cắm vào một bao cát khối lượng M = 3.98 kg đang nằm yên trên mặt phẳng nhẵn không ma sát. Sau va chạm, bao cát chứa viên đạn chuyển động với vận tốc V bằng bao nhiêu?",
      "thinkingAnalysis": "1) Đây là va chạm mềm (viên đạn nằm yên trong bao cát và cùng chuyển động với vận tốc V).\n2) Hệ gồm (viên đạn + bao cát) là hệ kín theo phương ngang.\n3) Bảo toàn động lượng: m · v = (m + M) · V => V = (m · v) / (m + M).\n4) Đổi đơn vị: m = 20 g = 0.02 kg; M = 3.98 kg => m + M = 4.0 kg.",
      "solution": "1. Đổi đơn vị: m = 20 g = 0.02 kg.\n2. Áp dụng định luật bảo toàn động lượng cho hệ đạn và bao cát:\n   p_truoc = p_sau\n   <=> m · v + M · 0 = (m + M) · V\n3. Vận tốc của bao cát và đạn sau va chạm:\n   V = (m · v) / (m + M) = (0.02 · 400) / (0.02 + 3.98) = 8.0 / 4.0 = 2.0 m/s.",
      "examTrapWarning": "⚠️ Quên đổi 20 g ra kg (0.02 kg) sẽ tính ra kết quả sai lệch 1000 lần."
    },
    "practiceQuiz": {
      "question": "Một khẩu pháo có khối lượng M = 1000 kg bắn một viên đạn khối lượng m = 10 kg theo phương ngang với vận tốc v = 500 m/s. Vận tốc giật lùi của súng pháo là bao nhiêu?",
      "options": [
        "-5.0 m/s (giật lùi)",
        "50 m/s",
        "5.0 m/s (tiến tới)",
        "-0.5 m/s"
      ],
      "correctIndex": 0,
      "hint1": "Trước khi bắn: Hệ đứng yên => Tổng động lượng bằng 0.",
      "hint2": "Bảo toàn động lượng: 0 = M · V_sung + m · v => V_sung = -(m · v) / M.",
      "explanation": "V_sung = -(10 · 500) / 1000 = -5000 / 1000 = -5.0 m/s (dấu trừ chỉ súng giật lùi ngược hướng bắn)."
    }
  },
  "g11-faraday": {
    "topic": "Hiện Tượng Cảm Ứng Điện Từ, Định Luật Faraday & Định Luật Lenz",
    "mindset": {
      "steps": [
        "Bước 1: Từ thông qua diện tích S của cuộn dây N vòng: Φ = N · B · S · cos α (với α là góc giữa vectơ cảm ứng từ B_vec và vectơ pháp tuyến n_vec của mặt phẳng khung dây).",
        "Bước 2: Hiện tượng cảm ứng điện từ chỉ xảy ra khi TỪ THÔNG BIẾN THIÊN theo thời gian (ΔΦ ≠ 0).",
        "Bước 3: Độ lớn suất điện động cảm ứng (Định luật Faraday): e_c = -N · (ΔΦ / Δt). Độ lớn: |e_c| = N · |ΔΦ / Δt|.",
        "Bước 4: Chiều dòng điện cảm ứng (Định luật Lenz):\n   - Dòng điện cảm ứng sinh ra từ trường cảm ứng B_c có tác dụng CHỐNG LẠI sự biến thiên của từ thông ban đầu sinh ra nó.\n   - Nếu từ thông TĂNG (ΔΦ > 0): B_c ngược chiều với B ban đầu.\n   - Nếu từ thông GIẢM (ΔΦ < 0): B_c cùng chiều với B ban đầu.\n   - Quy tắc Bàn tay phải: Ngón cái chỉ chiều B_c, các ngón tay khum lại chỉ chiều dòng điện cảm ứng I_c."
      ],
      "coreLaw": "Φ = B · S · cos α | e_c = -N · (ΔΦ / Δt) | e_chuyen_dong = B · v · L · sin θ",
      "shortcuts": [
        "Thanh kim loại dài L chuyển động cắt đường sức từ: e = B · v · L (khi B, v, L vuông góc đôi một)",
        "Góc α trong công thức từ thông: Nếu đề bài cho 'góc giữa B và MẶT PHẲNG khung dây' là β thì góc α = 90° - β",
        "Suất điện động tự cảm trong ống dây: e_tc = -L · (Δi / Δt) với L = 4π·10⁻⁷ · (N² / l) · S"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Dạng 1: Tính Từ thông Φ & Suất điện động cảm ứng e_c (Thông hiểu)",
        "description": "B biến thiên theo thời gian B(t) hoặc khung dây quay trong từ trường.",
        "formulaSummary": "|e_c| = S · |ΔB / Δt| | I_c = |e_c| / R",
        "traps": "⚠️ Bẫy góc α: Pháp tuyến n_vec vuông góc với mặt khung dây. Nếu từ trường B song song mặt phẳng khung thì α = 90° => Φ = 0."
      },
      {
        "id": "type2",
        "name": "Dạng 2: Xác định chiều dòng điện cảm ứng theo Định luật Lenz (Vận dụng)",
        "description": "Đưa nam châm lại gần hoặc ra xa ống dây (Tiến lại gần thì ĐẨY nhau, Rút ra xa thì HÚT nhau).",
        "formulaSummary": "B_c chống lại sự dịch chuyển tương đối",
        "traps": "⚠️ Quy tắc tổng quát: Cực của ống dây đối diện nam châm sẽ xuất hiện cực cùng tên khi lại gần (đẩy) và cực trái tên khi ra xa (hút)."
      }
    ],
    "workedExample": {
      "question": "Một khung dây phẳng diện tích S = 50 cm² gồm N = 100 vòng dây đặt trong từ trường đều có cảm ứng từ B = 0.2 T vuông góc với mặt phẳng khung dây. Trong thời gian Δt = 0.05 s, người ta giảm đều cảm ứng từ B về 0. Tính: (a) Độ biến thiên từ thông ΔΦ. (b) Độ lớn suất điện động cảm ứng xuất hiện trong khung dây?",
      "thinkingAnalysis": "1) Vectơ B vuông góc với mặt phẳng khung dây nên góc giữa B và pháp tuyến n là α = 0° => cos α = 1.\n2) Từ thông ban đầu qua 1 vòng: Φ1 = B · S = 0.2 · (50 · 10⁻⁴) = 1.0 · 10⁻³ Wb.\n3) Từ thông lúc sau: Φ2 = 0 => ΔΦ = 0 - 1.0 · 10⁻³ = -1.0 · 10⁻³ Wb.\n4) Độ lớn suất điện động cảm ứng: |e_c| = N · |ΔΦ / Δt| = 100 · (1.0 · 10⁻³ / 0.05) = 100 · 0.02 = 2.0 V.",
      "solution": "1. Đổi đơn vị: S = 50 cm² = 50 · 10⁻⁴ m² = 5.0 · 10⁻³ m².\n2. Từ thông ban đầu qua mỗi vòng dây:\n   Φ1 = B · S · cos 0° = 0.2 · 5.0 · 10⁻³ · 1 = 1.0 · 10⁻³ Wb (Weber).\n3. Độ biến thiên từ thông qua khung dây:\n   ΔΦ = Φ2 - Φ1 = 0 - 1.0 · 10⁻³ Wb = -1.0 · 10⁻³ Wb.\n4. Độ lớn suất điện động cảm ứng trong toàn khung N = 100 vòng:\n   |e_c| = N · (|ΔΦ| / Δt) = 100 · (1.0 · 10⁻³ / 0.05) = 2.0 V.",
      "examTrapWarning": "⚠️ Quên nhân số vòng dây N = 100 là lỗi mất điểm phổ biến nhất trong bài thi."
    },
    "practiceQuiz": {
      "question": "Một thanh dẫn điện dài L = 0.5 m chuyển động đều với vận tốc v = 4 m/s vuông góc với các đường sức từ của một từ trường đều B = 0.5 T. Suất điện động cảm ứng xuất hiện giữa hai đầu thanh là bao nhiêu?",
      "options": [
        "1.0 V",
        "0.5 V",
        "2.0 V",
        "0.25 V"
      ],
      "correctIndex": 0,
      "hint1": "Áp dụng công thức suất điện động chuyển động: e = B · v · L · sin θ.",
      "hint2": "Vì chuyển động vuông góc nên sin 90° = 1. Tính e = 0.5 · 4 · 0.5.",
      "explanation": "e = B · v · L = 0.5 · 4 · 0.5 = 1.0 V."
    }
  },
  "g11-capacitor": {
    "topic": "Tụ Điện Phẳng, Điện Dung C, Điện môi & Năng Lượng Điện Trường",
    "mindset": {
      "steps": [
        "Bước 1: Điện dung của tụ điện phẳng: C = (ε · ε_0 · A) / d (với ε_0 = 8.85·10⁻¹² F/m, A là diện tích bản cực m², d là khoảng cách giữa 2 bản cực m, ε là hằng số điện môi).",
        "Bước 2: Mối liên hệ Điện tích Q, Điện áp U và Điện dung C: Q = C · U.",
        "Bước 3: Hai trạng thái quan trọng khi thay đổi tham số tụ điện (rút/đẩy bản cực, chèn điện môi ε):\n   - Trạng thái 1: Tụ VẪN NỐI NGUỒN PIN => Điện áp KHÔNG ĐỔI: U = const. Khi C tăng thì Q = C·U tăng.\n   - Trạng thái 2: Tụ ĐÃ NGẮT NGUỒN PIN => Điện tích KHÔNG ĐỔI: Q = const. Khi C tăng thì điện áp U = Q / C giảm!",
        "Bước 4: Năng lượng điện trường dự trữ trong tụ điện: W = (1/2) · C · U² = (1/2) · Q · U = Q² / (2C)."
      ],
      "coreLaw": "C = (ε · A) / (4π · k · d) | Q = C · U | W = (1/2) · C · U²",
      "shortcuts": [
        "Tụ ghép nối tiếp: 1/C_nt = 1/C1 + 1/C2; Q_chung = Q1 = Q2; U_chung = U1 + U2",
        "Tụ ghép song song: C_ss = C1 + C2; U_chung = U1 = U2; Q_chung = Q1 + Q2",
        "Lực hút tĩnh điện giữa 2 bản tụ phẳng: F = Q² / (2 · ε · ε_0 · A) = (1/2) · Q · E"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Dạng 1: Tính Điện dung C, Điện tích Q và Năng lượng W (Thông hiểu)",
        "description": "Áp dụng Q = CU và W = 0.5 CU².",
        "formulaSummary": "Q = C·U | W = 0.5·C·U² = 0.5·Q²/C",
        "traps": "⚠️ Đổi khoảng cách d từ mm ra mét (m). Đổi điện dung từ μF, nF, pF ra Farad (F): 1 μF = 10⁻⁶ F; 1 pF = 10⁻¹² F."
      },
      {
        "id": "type2",
        "name": "Dạng 2: Thay đổi khoảng cách d hoặc chèn điện môi ε (Vận dụng cao)",
        "description": "Phân biệt trường hợp 'Vẫn nối nguồn' (U = const) và 'Đã ngắt nguồn' (Q = const).",
        "formulaSummary": "Nối nguồn: U=const => W ∝ C | Ngắt nguồn: Q=const => W ∝ 1/C",
        "traps": "⚠️ Khi đã ngắt nguồn, chèn thêm tấm điện môi ε > 1 làm C tăng => Năng lượng W = Q²/(2C) GIẢM do điện trường sinh công hút điện môi vào trong."
      }
    ],
    "workedExample": {
      "question": "Một tụ điện phẳng không khí có điện dung C = 20 pF được nạp điện dưới hiệu điện thế U = 100 V. Sau khi ngắt tụ điện khỏi nguồn, người ta tăng khoảng cách giữa hai bản cực lên gấp đôi (2d). Tính: (a) Điện tích Q của tụ điện. (b) Hiệu điện thế mới U' giữa hai bản tụ.",
      "thinkingAnalysis": "1) Điện tích nạp vào tụ ban đầu: Q = C · U = 20 · 10⁻¹² · 100 = 2.0 · 10⁻⁹ C = 2.0 nC.\n2) Vì 'ĐÃ NGẮT NGUỒN' nên điện tích trên bản tụ được bảo toàn không đổi: Q' = Q = 2.0 nC.\n3) Khoảng cách tăng gấp đôi d' = 2d => Điện dung giảm một nửa: C' = C / 2 = 10 pF.\n4) Hiệu điện thế mới: U' = Q / C' = Q / (C / 2) = 2 · (Q / C) = 2 · U = 200 V.",
      "solution": "1. Điện tích của tụ điện ban đầu:\n   Q = C · U = (20 · 10⁻¹² F) · 100 V = 2.0 · 10⁻⁹ C = 2.0 nC.\n2. Sau khi ngắt khỏi nguồn, điện tích được bảo toàn: Q' = Q = 2.0 nC.\n3. Khi tăng khoảng cách d lên gấp đôi (d' = 2d):\n   C' = (ε · A) / (4π · k · d') = C / 2 = 20 / 2 = 10 pF.\n4. Hiệu điện thế mới giữa hai bản tụ:\n   U' = Q' / C' = (2.0 · 10⁻⁹ C) / (10 · 10⁻¹² F) = 200 V.",
      "examTrapWarning": "⚠️ Nếu đề bài cho 'TỤ VẪN NỐI NGUỒN' thì U' vẫn bằng 100 V, lúc đó điện tích Q sẽ giảm một nửa."
    },
    "practiceQuiz": {
      "question": "Một tụ điện có điện dung C = 10 μF được nạp đến hiệu điện thế U = 20 V. Năng lượng điện trường tích trữ trong tụ điện là bao nhiêu?",
      "options": [
        "2.0 · 10⁻³ J (2 mJ)",
        "4.0 · 10⁻³ J",
        "1.0 · 10⁻³ J",
        "0.2 J"
      ],
      "correctIndex": 0,
      "hint1": "Áp dụng công thức năng lượng điện trường: W = (1/2) · C · U².",
      "hint2": "W = 0.5 · (10 · 10⁻⁶ F) · (20 V)² = 5 · 10⁻⁶ · 400 = 2 · 10⁻³ J = 2 mJ.",
      "explanation": "W = 0.5 · 10 · 10⁻⁶ · 20² = 2 · 10⁻³ J = 2 mJ."
    }
  },
  "g12-standingwave": {
    "topic": "Sóng Dừng Trên Dây, Ống Khí, Bụng Sóng, Nút Sóng & Họa Âm (Harmonics)",
    "mindset": {
      "steps": [
        "Bước 1: Điều kiện xảy ra sóng dừng trên dây chiều dài L:\n   - Hai đầu cố định (hoặc 2 đầu kín): L = k · (λ / 2) = k · [v / (2f)] (với k là số bó sóng, số bụng sóng = k, số nút sóng = k + 1).\n   - Một đầu cố định, một đầu tự do (hoặc 1 đầu kín 1 đầu hở): L = (2k + 1) · (λ / 4) = (2k + 1) · [v / (4f)] (với k là số bó sóng nguyên, số bụng = số nút = k + 1).",
        "Bước 2: Khoảng cách giữa 2 nút liên tiếp (hoặc 2 bụng liên tiếp) bằng nửa bước sóng: d = λ / 2.\n   Khoảng cách giữa 1 nút và 1 bụng kề nhau: d = λ / 4.",
        "Bước 3: Vận tốc truyền sóng trên dây căng có lực căng T và khối lượng trên đơn vị chiều dài μ (kg/m): v = √(T / μ).",
        "Bước 4: Tần số các họa âm:\n   - 2 đầu cố định: f_n = n · f_1 (các họa âm là bội số nguyên của âm cơ bản f_1 = v / 2L).\n   - 1 đầu cố định 1 đầu hở: f_n = (2n - 1) · f_1 (chỉ có các họa âm bậc LẺ 1, 3, 5...)."
      ],
      "coreLaw": "L = k · (λ / 2) | L = (2k + 1) · (λ / 4) | v = f · λ",
      "shortcuts": [
        "Hai tần số liên tiếp cho sóng dừng trên dây 2 đầu cố định: f_(k+1) - f_k = f_1 = v / 2L",
        "Hai tần số liên tiếp cho sóng dừng trên dây 1 đầu tự do: f_(k+1) - f_k = 2 · f_1 = v / 2L",
        "Biên độ sóng dừng cách nút đoạn d: A_d = 2a · |sin(2πd / λ)|",
        "Biên độ sóng dừng cách bụng đoạn d: A_d = 2a · |cos(2πd / λ)|"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Dạng 1: Tính số bụng, số nút, bước sóng λ và vận tốc v (Nhận biết - Thông hiểu)",
        "description": "Dây 2 đầu cố định hoặc 1 đầu tự do dao động với tần số f.",
        "formulaSummary": "λ = 2L / k | v = λ · f",
        "traps": "⚠️ 'Dây có 5 nút sóng' (kể cả 2 đầu) => k = 4 bó sóng (không phải k = 5)."
      },
      {
        "id": "type2",
        "name": "Dạng 2: Tìm tần số âm cơ bản f1 từ 2 tần số sóng dừng liên tiếp (Vận dụng)",
        "description": "Cho 2 tần số f1, f2 liên tiếp tạo sóng dừng, tìm tần số nhỏ nhất f_min.",
        "formulaSummary": "2 đầu cố định: f_min = f2 - f1 | 1 đầu hở: f_min = (f2 - f1) / 2",
        "traps": "⚠️ Phải đọc kỹ đầu dây là '2 đầu cố định' hay '1 đầu tự do'."
      }
    ],
    "workedExample": {
      "question": "Một sợi dây đàn hồi AB dài L = 1.2 m có hai đầu cố định. Kích thích cho dây dao động với tần số f = 100 Hz thì thấy trên dây xuất hiện sóng dừng ổn định với 4 bụng sóng. (a) Tính bước sóng λ của sóng truyền trên dây. (b) Tính tốc độ truyền sóng v trên dây.",
      "thinkingAnalysis": "1) Dây 2 đầu cố định nên số bụng sóng bằng số bó sóng: k = 4.\n2) Điều kiện sóng dừng: L = k · (λ / 2) => λ = 2L / k = (2 · 1.2) / 4 = 2.4 / 4 = 0.6 m = 60 cm.\n3) Tốc độ truyền sóng: v = λ · f = 0.6 · 100 = 60 m/s.",
      "solution": "1. Bước sóng λ trên dây:\n   L = k · (λ / 2) với k = 4 (số bụng sóng)\n   => λ = (2 · L) / k = (2 · 1.2 m) / 4 = 0.60 mét = 60 cm.\n2. Tốc độ truyền sóng trên dây:\n   v = λ · f = 0.60 m · 100 Hz = 60 m/s.",
      "examTrapWarning": "⚠️ Số nút sóng trên dây là k + 1 = 4 + 1 = 5 nút. Nhớ phân biệt giữa số bụng (k) và số nút (k+1)."
    },
    "practiceQuiz": {
      "question": "Trên một sợi dây dài 90 cm có hai đầu cố định đang có sóng dừng với 3 bó sóng. Khoảng cách giữa hai nút sóng liên tiếp là bao nhiêu?",
      "options": [
        "30 cm",
        "15 cm",
        "60 cm",
        "45 cm"
      ],
      "correctIndex": 0,
      "hint1": "Khoảng cách giữa hai nút liên tiếp bằng nửa bước sóng: d = λ / 2.",
      "hint2": "Với 3 bó sóng (k = 3): L = 3 · (λ / 2) = 90 cm => λ / 2 = 90 / 3 = 30 cm.",
      "explanation": "L = k · (λ/2) => λ/2 = L / k = 90 cm / 3 = 30 cm."
    }
  },
  "alevel-boyle": {
    "topic": "Cambridge A Level 9702: Boyle's Law, Ideal Gas Equation & Work Done by Gas",
    "mindset": {
      "steps": [
        "Bước 1: Định luật Boyle-Mariotte (Quá trình đẳng nhiệt T = const): Áp suất P tỉ lệ nghịch với thể tích V của một khối lượng khí xác định: P · V = const <=> P1 · V1 = P2 · V2.",
        "Bước 2: Tuyến tính hóa đồ thị: Vẽ P theo (1/V) cho đường thẳng đi qua gốc tọa độ có hệ số góc Gradient = n·R·T. Đồ thị P theo V là đường cong Hyperbol (Isotherm).",
        "Bước 3: Phương trình trạng thái khí lý tưởng: P · V = n · R · T = (m / M) · R · T = N · k_B · T (với R = 8.314 J/(mol·K), k_B = 1.38·10⁻²³ J/K, T tính theo Kelvin: T(K) = t(°C) + 273.15).",
        "Bước 4: Động học phân tử khí: Động năng tịnh tiến trung bình của 1 phân tử: E_k = (3/2) · k_B · T. Căn bậc hai của vận tốc trung bình bình phương (r.m.s. speed): c_rms = √[3·R·T / M] = √[3·k_B·T / m]."
      ],
      "coreLaw": "P1 · V1 = P2 · V2 | P · V = n · R · T | E_k = (3/2) · k_B · T",
      "shortcuts": [
        "Khi nén khí đẳng nhiệt: Thể tích giảm n lần => Áp suất tăng n lần (mật độ phân tử tăng n lần => số va chạm vào thành bình trong 1s tăng n lần)",
        "Độ dốc đường đẳng nhiệt: Đường ở trên tương ứng nhiệt độ cao hơn (T2 > T1)",
        "Công thực hiện khi khí dãn nở đẳng áp: W = P · ΔV = P · (V2 - V1)"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Dạng 1: Áp dụng Định luật Boyle & Đồ thị tuyến tính P theo 1/V (Thông hiểu)",
        "description": "Áp dụng P1·V1 = P2·V2 để tìm áp suất hoặc thể tích lúc sau trong quá trình đẳng nhiệt.",
        "formulaSummary": "P2 = P1 · V1 / V2",
        "traps": "⚠️ Đồng nhất đơn vị áp suất và thể tích ở 2 vế phương trình (ví dụ cùng dùng cm³ và kPa)."
      },
      {
        "id": "type2",
        "name": "Dạng 2: Phương trình trạng thái khí lý tưởng & Số mol / Số phân tử (Vận dụng)",
        "description": "Tính áp suất P, khối lượng m, hoặc số hạt phân tử N bằng phương trình P·V = n·R·T.",
        "formulaSummary": "P · V = (N / N_A) · R · T | N = P·V / (k_B · T)",
        "traps": "⚠️ Nhiệt độ T BẮT BUỘC PHẢI TÍNH THEO KELVIN (K = °C + 273). Dùng độ Celsius sẽ dẫn đến sai toàn bộ bài toán."
      },
      {
        "id": "type3",
        "name": "Dạng 3: Tốc độ căn quân phương c_rms & Năng lượng nhiệt (Vận dụng cao)",
        "description": "Tính tốc độ phân tử khí ở nhiệt độ tuyệt đối T.",
        "formulaSummary": "c_rms = √(3·R·T / M_kg) | E_tong = (3/2) · n · R · T",
        "traps": "⚠️ Khối lượng mol M BẮT BUỘC tính bằng kg/mol (ví dụ Heli M = 4 g/mol = 4 · 10⁻³ kg/mol)."
      }
    ],
    "workedExample": {
      "question": "Một xilanh chứa 0.050 m³ khí lý tưởng ở áp suất 2.0 · 10⁵ Pa và nhiệt độ 27°C. Khí bị nén đẳng nhiệt (nhiệt độ không đổi) cho đến khi thể tích giảm còn 0.020 m³. (a) Tính áp suất cuối cùng của khối khí. (b) Tính số mol khí n chứa trong xilanh.",
      "thinkingAnalysis": "1) Vì nhiệt độ không đổi, áp dụng định luật Boyle: P1 · V1 = P2 · V2.\n   P2 = (P1 · V1) / V2 = (2.0 · 10⁵ · 0.050) / 0.020 = 5.0 · 10⁵ Pa.\n2) Đổi nhiệt độ sang Kelvin: T = 27 + 273 = 300 K.\n3) Áp dụng phương trình khí lý tưởng: P1 · V1 = n · R · T => n = (P1 · V1) / (R · T).\n   n = (2.0 · 10⁵ · 0.050) / (8.314 · 300) = 10000 / 2494.2 = 4.01 mol.",
      "solution": "1. Áp suất cuối cùng P2 theo định luật Boyle:\n   P1 · V1 = P2 · V2\n   P2 = (2.0 · 10⁵ Pa · 0.050 m³) / 0.020 m³ = 5.0 · 10⁵ Pa (500 kPa).\n2. Nhiệt độ tuyệt đối theo thang Kelvin:\n   T = 27 + 273.15 = 300.15 K ≈ 300 K.\n3. Số mol khí n trong xilanh:\n   P · V = n · R · T\n   => n = (P · V) / (R · T) = (2.0 · 10⁵ · 0.050) / (8.314 · 300) = 4.01 mol.",
      "examTrapWarning": "⚠️ Bẫy phòng thi: Quên đổi nhiệt độ sang Kelvin (lấy 27 thay vào mẫu số sẽ tính ra n = 44.5 mol, sai hoàn toàn)."
    },
    "practiceQuiz": {
      "question": "Một lượng khí lý tưởng có áp suất P ở thể tích V. Nếu thể tích của khối khí giảm đi 25% ở nhiệt độ không đổi, áp suất mới của khối khí là bao nhiêu?",
      "options": [
        "1.33 P (4/3 P)",
        "1.25 P",
        "0.75 P",
        "1.50 P"
      ],
      "correctIndex": 0,
      "hint1": "Thể tích giảm 25% nghĩa là thể tích mới V' = V - 0.25V = 0.75V = (3/4)V.",
      "hint2": "Theo định luật Boyle: P' · V' = P · V => P' = P · V / (0.75V) = P / 0.75 = 4/3 P ≈ 1.33 P.",
      "explanation": "V' = 0.75 V => P' = P · V / (0.75 V) = 1 / 0.75 P = 4/3 P ≈ 1.33 P."
    }
  },
  "alevel-resonance-tube": {
    "topic": "Cambridge A Level 9702: Air Column Resonance Tube, End Correction & Speed of Sound",
    "mindset": {
      "steps": [
        "Bước 1: Ống cộng hưởng một đầu kín (mặt nước) một đầu hở hình thành sóng âm dừng có Nút (Node) tại mặt nước và Bụng (Antinode) ở ngay phía ngoài miệng ống.",
        "Bước 2: Hiệu chỉnh miệng ống (End correction c ≈ 0.6 · r với r là bán kính trong của ống):\n   - Cực đại cộng hưởng 1 (1st resonance): L1 + c = λ / 4.\n   - Cực đại cộng hưởng 2 (2nd resonance): L2 + c = 3λ / 4.",
        "Bước 3: Triệt tiêu hiệu chỉnh miệng ống bằng phép trừ: (L2 + c) - (L1 + c) = (3λ/4) - (λ/4) = λ / 2 => λ = 2 · (L2 - L1).",
        "Bước 4: Tính tốc độ âm trong không khí: v = f · λ = 2 · f · (L2 - L1). Hiệu chỉnh miệng ống: c = (L2 - 3L1) / 2."
      ],
      "coreLaw": "v = 2 · f · (L2 - L1) | λ = 2 · (L2 - L1) | c = (L2 - 3·L1) / 2",
      "shortcuts": [
        "Nếu bỏ qua hiệu chỉnh miệng ống c: L2 ≈ 3 · L1",
        "Nếu L2 > 3L1: Hiệu chỉnh miệng ống c > 0 (bụng sóng nằm ngoài miệng ống một đoạn c)",
        "Tốc độ âm trong không khí phụ thuộc vào nhiệt độ: v(T) ≈ 331.3 · √(1 + t/273) ≈ 331.3 + 0.6 · t (°C)"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Dạng 1: Xác định Tốc độ truyền âm v từ 2 vị trí cộng hưởng liên tiếp L1 và L2 (Paper 3)",
        "description": "Áp dụng công thức v = 2f(L2 - L1) để triệt tiêu hiệu chỉnh miệng ống c.",
        "formulaSummary": "v = 2 · f · (L2 - L1)",
        "traps": "⚠️ Đổi chiều dài L1, L2 từ cm sang MÉT (m) trước khi tính tốc độ âm v theo m/s."
      },
      {
        "id": "type2",
        "name": "Dạng 2: Tính Hiệu chỉnh miệng ống c & Bán kính trong của ống r",
        "description": "Tìm độ dịch chuyển của bụng sóng ra phía ngoài miệng ống.",
        "formulaSummary": "c = (L2 - 3·L1) / 2 | r = c / 0.6",
        "traps": "⚠️ Bụng sóng không hình thành chính xác ngay tại miệng ống mà hơi nhô ra ngoài một đoạn c."
      }
    ],
    "workedExample": {
      "question": "Trong một thí nghiệm đo tốc độ âm thanh bằng ống cộng hưởng dùng âm thoa có tần số f = 512 Hz, vị trí cộng hưởng thứ nhất xảy ra khi cột khí dài L1 = 15.5 cm và vị trí cộng hưởng thứ hai xảy ra khi L2 = 49.0 cm. (a) Tính tốc độ truyền âm trong không khí. (b) Tính hiệu chỉnh miệng ống c của ống nghiệm.",
      "thinkingAnalysis": "1) Tính bước sóng âm không phụ thuộc vào hiệu chỉnh miệng ống: λ = 2 · (L2 - L1) = 2 · (49.0 - 15.5) = 2 · 33.5 cm = 67.0 cm = 0.670 m.\n2) Tốc độ truyền âm: v = f · λ = 512 · 0.670 = 343.04 m/s.\n3) Hiệu chỉnh miệng ống: c = (L2 - 3·L1) / 2 = (49.0 - 3 · 15.5) / 2 = (49.0 - 46.5) / 2 = 2.5 / 2 = 1.25 cm = 0.0125 m.",
      "solution": "1. Bước sóng của sóng âm λ:\n   λ = 2 · (L2 - L1) = 2 · (0.490 m - 0.155 m) = 2 · (0.335 m) = 0.670 m.\n2. Tốc độ truyền âm trong không khí v:\n   v = f · λ = 512 Hz · 0.670 m = 343.0 m/s.\n3. Hiệu chỉnh miệng ống c của ống cộng hưởng:\n   c = (L2 - 3 · L1) / 2 = (49.0 cm - 3 · 15.5 cm) / 2 = (49.0 - 46.5) / 2 = 1.25 cm.",
      "examTrapWarning": "⚠️ Bẫy thi thực hành: Dùng trực tiếp v = 4 · f · L1 coi như c = 0 sẽ cho v = 4 · 512 · 0.155 = 317.4 m/s (sai số ~8% do bỏ qua hiệu chỉnh miệng ống). Luôn dùng phép trừ 2 lần cộng hưởng v = 2f(L2 - L1)!"
    },
    "practiceQuiz": {
      "question": "Một âm thoa có tần số 400 Hz gây ra cộng hưởng trong một ống khí ở 2 vị trí L1 = 20 cm và L2 = 62.5 cm. Tốc độ truyền âm đo được trong thí nghiệm là bao nhiêu?",
      "options": [
        "340 m/s",
        "320 m/s",
        "360 m/s",
        "300 m/s"
      ],
      "correctIndex": 0,
      "hint1": "Áp dụng công thức: v = 2 · f · (L2 - L1).",
      "hint2": "L2 - L1 = 62.5 cm - 20 cm = 42.5 cm = 0.425 m. v = 2 · 400 · 0.425 = 340 m/s.",
      "explanation": "v = 2 · 400 · (0.625 - 0.200) = 800 · 0.425 = 340 m/s."
    }
  },
  "g8-pulley": {
    "topic": "Ròng Rọc Cố Định, Ròng Rọc Động, Hệ Pa-lăng & Hiệu Suất Cơ Học",
    "mindset": {
      "steps": [
        "Bước 1: Phân loại cơ chế ròng rọc:\n   - Ròng rọc cố định: Chỉ đổi hướng của lực kéo, KHÔNG ĐƯỢC LỢI VỀ LỰC (F = P, s = h).\n   - Ròng rọc động: Cho lợi 2 lần về lực (F = P / 2), nhưng thiệt 2 lần về quãng đường kéo (s = 2h).\n   - Hệ Pa-lăng gồm n ròng rọc động: Cho lợi 2n lần về lực (F = P / 2n), nhưng quãng đường kéo tăng 2n lần (s = 2n · h).",
        "Bước 2: Định luật về công (Golden Rule of Mechanics): Không một máy cơ đơn giản nào cho lợi về công. Công có ích nâng vật lên cao h: A_ich = P · h = m · g · h.",
        "Bước 3: Công toàn phần kéo dây: A_tp = F_thuc_te · s.",
        "Bước 4: Hiệu suất ròng rọc: H = (A_ich / A_tp) · 100% = (P · h) / (F_thuc_te · s) · 100%."
      ],
      "coreLaw": "F_ly_tuong = P / (2n) | s = 2n · h | H = (P · h) / (F · s)",
      "shortcuts": [
        "Lực kéo thực tế có tính ma sát và trọng lượng ròng rọc P_rr: F_thuc = (P_vat + P_rr) / 2 + F_ms",
        "Công hao phí thắng ma sát và nâng ròng rọc: A_hp = A_tp - A_ich = (1 - H) · A_tp",
        "Tốc độ kéo dây v_day = 2n · v_vat (Dây di chuyển nhanh gấp 2n lần tốc độ nâng vật)"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Dạng 1: Tính lực kéo và quãng đường kéo dây qua ròng rọc (Nhận biết - Thông hiểu)",
        "description": "Áp dụng F = P/2 và s = 2h cho ròng rọc động đơn giản.",
        "formulaSummary": "F = P/2 | s = 2h",
        "traps": "⚠️ Ròng rọc cố định không làm giảm lực kéo F, chỉ có ròng rọc ĐỘNG mới làm giảm lực F."
      },
      {
        "id": "type2",
        "name": "Dạng 2: Tính Hiệu suất Pa-lăng có ma sát và trọng lượng ròng rọc (Vận dụng)",
        "description": "Hệ Pa-lăng có khối lượng ròng rọc m_rr và lực ma sát F_ms.",
        "formulaSummary": "H = (P · h) / (F_keo · s)",
        "traps": "⚠️ Chú ý đếm đúng số nhánh dây chịu tải n đỡ vật nặng."
      }
    ],
    "workedExample": {
      "question": "Một người dùng hệ thống gồm 1 ròng rọc cố định và 1 ròng rọc động (pa-lăng) để nâng một vật nặng có khối lượng m = 50 kg lên cao h = 3 m. Lấy g = 10 m/s². Lực kéo thực tế đo được ở đầu dây là F = 280 N. Tính: (a) Công có ích. (b) Quãng đường kéo dây s và công toàn phần. (c) Hiệu suất của hệ pa-lăng?",
      "thinkingAnalysis": "1) Trọng lượng của vật: P = m · g = 50 · 10 = 500 N.\n2) Công có ích: A_ich = P · h = 500 · 3 = 1500 J.\n3) Vì có 1 ròng rọc động nên quãng đường kéo dây s = 2 · h = 2 · 3 = 6 m.\n4) Công toàn phần: A_tp = F · s = 280 · 6 = 1680 J.\n5) Hiệu suất: H = (A_ich / A_tp) · 100% = (1500 / 1680) · 100% = 89.29%.",
      "solution": "1. Trọng lượng vật nâng:\n   P = m · g = 50 · 10 = 500 N.\n2. Công có ích nâng vật:\n   A_ich = P · h = 500 N · 3 m = 1500 J.\n3. Quãng đường kéo dây và công toàn phần:\n   s = 2 · h = 2 · 3 m = 6.0 m.\n   A_tp = F · s = 280 N · 6.0 m = 1680 J.\n4. Hiệu suất của hệ thống ròng rọc:\n   H = (A_ich / A_tp) · 100% = (1500 / 1680) · 100% = 89.29%.",
      "examTrapWarning": "⚠️ Bẫy thi: Quên nhân đôi độ cao h (s = 2h) khi tính công toàn phần của ròng rọc động."
    },
    "practiceQuiz": {
      "question": "Dùng 1 ròng rọc động lý tưởng (bỏ qua ma sát và khối lượng ròng rọc) để nâng vật nặng P = 400 N lên cao 4 m. Công thực hiện là bao nhiêu?",
      "options": [
        "1600 J",
        "800 J",
        "3200 J",
        "400 J"
      ],
      "correctIndex": 0,
      "hint1": "Theo định luật về công: Công thực hiện không đổi A = P · h.",
      "hint2": "Lực kéo F = P/2 = 200 N, quãng đường s = 2h = 8 m => A = F · s = 200 · 8 = 1600 J.",
      "explanation": "A = P · h = 400 · 4 = 1600 J (hoặc A = F · s = 200 · 8 = 1600 J)."
    }
  },
  "g10-newton2": {
    "topic": "Định Luật II Newton, Lực Ma Sát Trượt & Động Lực Học Vật Rắn",
    "mindset": {
      "steps": [
        "Bước 1: Phương pháp Động lực học (Free-Body Diagram):\n   - Phân tích tất cả các ngoại lực tác dụng lên vật: Trọng lực P, Phản lực pháp tuyến N, Lực kéo F_k, Lực ma sát F_ms, Lực căng dây T.\n   - Viết phương trình Định luật II Newton dạng vectơ: m · a_vec = Tổng F_vec = P_vec + N_vec + F_k_vec + F_ms_vec.",
        "Bước 2: Chọn hệ trục tọa độ Descartes vuông góc Oxy (trục Ox dọc theo chiều chuyển động, trục Oy vuông góc với mặt tiếp xúc).",
        "Bước 3: Chiếu phương trình lên 2 trục:\n   - Trục Oy (vật không chuyển động theo phương đứng): N - P_y = 0 => N = P_y.\n   - Tính Lực ma sát trượt: F_ms = μ · N.\n   - Trục Ox: F_kx - F_ms = m · a => Gia tốc a = (F_kx - F_ms) / m.",
        "Bước 4: Kết hợp các phương trình động học biến đổi đều: v = v_0 + a · t; s = v_0 · t + (1/2) · a · t²; v² - v_0² = 2 · a · s."
      ],
      "coreLaw": "a = F_net / m = (F_kéo - F_ms) / m | F_ms = μ · N",
      "shortcuts": [
        "Lực kéo F hợp góc α với phương ngang hướng chếch lên: N = P - F · sin α => F_ms = μ · (P - F · sin α)",
        "Quãng đường phanh xe an toàn đến khi dừng hẳn (v = 0): s_ham = v_0² / (2 · μ · g)",
        "Thời gian hãm phanh: t_ham = v_0 / (μ · g)"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Dạng 1: Kéo vật trên mặt phẳng ngang có ma sát (Nhận biết - Thông hiểu)",
        "description": "Tìm gia tốc a và quãng đường s khi lực F song song mặt ngang.",
        "formulaSummary": "a = (F - μ · m · g) / m",
        "traps": "⚠️ Điều kiện để vật chuyển động: Lực kéo F phải lớn hơn lực ma sát nghỉ cực đại F > F_ms."
      },
      {
        "id": "type2",
        "name": "Dạng 2: Lực kéo chếch góc α so với phương ngang (Vận dụng)",
        "description": "Phân tích F thành F·cos α và F·sin α ảnh hưởng đến áp lực N.",
        "formulaSummary": "N = m·g - F·sin α | a = (F·cos α - μ·N) / m",
        "traps": "⚠️ Khi kéo chếch lên, áp lực N GIẢM (N = mg - F sin α); khi đẩy chếch xuống, áp lực N TĂNG (N = mg + F sin α)."
      }
    ],
    "workedExample": {
      "question": "Một chiếc xe con có khối lượng m = 1200 kg đang chạy với vận tốc v_0 = 72 km/h thì tài xế hãm phanh khẩn cấp. Hệ số ma sát trượt giữa bánh xe và mặt đường nhựa khô là μ = 0.8. Lấy g = 10 m/s². Tính: (a) Gia tốc hãm phanh của xe. (b) Quãng đường phanh an toàn và thời gian xe dừng lại hẳn?",
      "thinkingAnalysis": "1) Đổi đơn vị vận tốc: v_0 = 72 km/h = 72 / 3.6 = 20 m/s.\n2) Khi hãm phanh trượt bánh, lực duy nhất gây gia tốc cản trở theo phương ngang là Lực ma sát: F_ms = μ · m · g.\n3) Theo Định luật II Newton: -F_ms = m · a => a = -μ · g = -0.8 · 10 = -8.0 m/s² (gia tốc âm vì chuyển động chậm dần đều).\n4) Quãng đường phanh đến khi dừng hẳn (v = 0): s = (v² - v_0²) / (2a) = (0 - 20²) / (2 · (-8)) = -400 / -16 = 25 m.\n5) Thời gian hãm phanh: t = (v - v_0) / a = (0 - 20) / (-8) = 2.5 s.",
      "solution": "1. Đổi đơn vị:\n   v_0 = 72 km/h = 20 m/s; vận tốc khi dừng v = 0.\n2. Gia tốc hãm của xe:\n   -F_ms = m · a <=> -μ · m · g = m · a\n   => a = -μ · g = -0.8 · 10 = -8.0 m/s².\n3. Quãng đường phanh an toàn:\n   v² - v_0² = 2 · a · s\n   => s = (0² - 20²) / (2 · (-8.0)) = -400 / -16 = 25.0 mét.\n4. Thời gian từ lúc phanh đến khi dừng hẳn:\n   t = (v - v_0) / a = (0 - 20) / (-8.0) = 2.5 giây.",
      "examTrapWarning": "⚠️ Bẫy đơn vị kinh điển: Quên đổi 72 km/h sang 20 m/s mà lấy 72 thay vào công thức sẽ dẫn đến kết quả sai hoàn toàn."
    },
    "practiceQuiz": {
      "question": "Một lực F = 30 N tác dụng lên vật m = 5 kg làm vật chuyển động từ trạng thái nghỉ trên sàn có hệ số ma sát μ = 0.2 (g = 10 m/s²). Vận tốc của vật sau t = 4 s là bao nhiêu?",
      "options": [
        "16 m/s",
        "24 m/s",
        "8 m/s",
        "12 m/s"
      ],
      "correctIndex": 0,
      "hint1": "Tính lực ma sát F_ms = μ · m · g = 0.2 · 5 · 10 = 10 N.",
      "hint2": "Gia tốc a = (F - F_ms) / m = (30 - 10) / 5 = 4 m/s². Vận tốc v = a · t = 4 · 4 = 16 m/s.",
      "explanation": "a = (30 - 0.2 · 5 · 10) / 5 = 20 / 5 = 4 m/s² => v = v_0 + at = 0 + 4 · 4 = 16 m/s."
    }
  },
  "igcse-sound": {
    "topic": "Cambridge IGCSE: Speed of Sound, Echo Method & Oscilloscope (CRO)",
    "mindset": {
      "steps": [
        "Bước 1: Sóng âm là sóng cơ học (sóng dọc trong chất khí và chất lỏng) cần môi trường vật chất để lan truyền (hoàn toàn KHÔNG truyền được trong chân không).",
        "Bước 2: Phương pháp đo tốc độ âm thanh bằng Tiếng Vang (Echo method):\n   - Âm thanh phát ra truyền đến vách núi cách d rồi phản xạ quay trở lại máy thu mất tổng thời gian t.\n   - Tổng quãng đường âm thanh đi và về là 2d => Tốc độ âm thanh: v = 2 · d / t.",
        "Bước 3: Phương pháp Máy hiện sóng tia điện tử (Cathode-Ray Oscilloscope - CRO):\n   - Đọc số ô ngang giữa 2 đỉnh sóng liên tiếp trên màn hình: n ô (divisions).\n   - Đọc cài đặt thang đo thời gian Timebase (ms/div hoặc μs/div): T = n · (Timebase).\n   - Tính tần số âm thanh: f = 1 / T. Tính bước sóng: λ = v / f.",
        "Bước 4: Tốc độ âm trong các môi trường: v_rắn > v_lỏng > v_khí (Thép ~ 5000 m/s > Nước ~ 1500 m/s > Không khí ~ 340 m/s)."
      ],
      "coreLaw": "v = 2 · d / t | T = n · Timebase | f = 1 / T",
      "shortcuts": [
        "Quy tắc sấm sét: Đếm số giây từ khi thấy tia chớp đến khi nghe tiếng sấm, chia cho 3 là ra khoảng cách tính bằng km (d ≈ t / 3 km vì v ≈ 340 m/s ≈ 1/3 km/s)",
        "Độ to của âm phụ thuộc vào BIÊN ĐỘ dao động (Amplitude)",
        "Độ cao của âm phụ thuộc vào TẦN SỐ dao động (Frequency)"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Dạng 1: Phản xạ Tiếng Vang & Đo Khoảng Cách / Độ Sâu Biển (Thông hiểu)",
        "description": "Áp dụng v = 2d / t để tìm khoảng cách tới vách đá hoặc độ sâu đáy biển (máy Sonar).",
        "formulaSummary": "d = (v · t) / 2",
        "traps": "⚠️ Nhớ CHIA 2 vì xung âm thanh phải đi tới đáy rồi dội ngược lại (quãng đường 2 chiều = 2d)."
      },
      {
        "id": "type2",
        "name": "Dạng 2: Đọc Tín Hiệu Sóng Âm Trên Màn Dao Động Ký CRO (Vận dụng)",
        "description": "Tính chu kỳ T và tần số f từ cài đặt thang đo thời gian Timebase.",
        "formulaSummary": "T = số ô ngang · Giá trị Timebase | f = 1 / T",
        "traps": "⚠️ Đổi đơn vị Timebase (ví dụ 5 ms/div = 5 · 10⁻³ s/div; 200 μs/div = 200 · 10⁻⁶ s/div) trước khi tính tần số f theo Hz."
      }
    ],
    "workedExample": {
      "question": "Một con tàu dùng máy phát siêu âm (Sonar) để đo độ sâu đáy biển. Một xung sóng siêu âm được phát thẳng xuống nước biển và thu được tín hiệu phản xạ sau 0.60 giây. Biết tốc độ truyền âm trong nước biển là 1500 m/s. (a) Tính độ sâu của đáy biển tại vị trí đó. (b) Nếu tần số của sóng siêu âm là 50 kHz, hãy tính bước sóng của nó trong nước biển.",
      "thinkingAnalysis": "1) Sóng truyền xuống đáy rồi phản xạ lên, nên quãng đường tổng cộng = 2 · độ sâu = v · t.\n   Độ sâu d = (v · t) / 2 = (1500 · 0.60) / 2 = 900 / 2 = 450 m.\n2) Tần số f = 50 kHz = 50,000 Hz = 5.0 · 10⁴ Hz.\n3) Bước sóng λ = v / f = 1500 / 50,000 = 0.030 m = 3.0 cm.",
      "solution": "1. Độ sâu đáy biển d:\n   Tổng quãng đường sóng đi = 2 · d = v · t\n   => d = (v · t) / 2 = (1500 m/s · 0.60 s) / 2 = 900 / 2 = 450 mét.\n2. Bước sóng trong nước biển λ:\n   λ = v / f = 1500 m/s / 50000 Hz = 0.030 m = 3.0 cm.",
      "examTrapWarning": "⚠️ Bẫy thi kinh điển: Quên chia đôi thời gian trong bài toán phản xạ tiếng vang dẫn đến tính ra độ sâu 900 m (SAI gấp đôi!)."
    },
    "practiceQuiz": {
      "question": "Trên màn hình dao động ký, một chu kỳ hoàn chỉnh của sóng âm chiếm 4 ô theo phương ngang. Cài đặt thang đo thời gian là 2.5 ms/ô. Tần số của sóng âm này là bao nhiêu?",
      "options": [
        "100 Hz",
        "250 Hz",
        "50 Hz",
        "400 Hz"
      ],
      "correctIndex": 0,
      "hint1": "Tính chu kỳ T = 4 ô · 2.5 ms/ô = 10 ms = 0.010 s.",
      "hint2": "Tần số f = 1 / T = 1 / 0.010 s = 100 Hz.",
      "explanation": "T = 4 · 2.5 ms = 10 ms = 0.01 s => f = 1 / 0.01 = 100 Hz."
    }
  },
  "g10-circular-motion": {
    "topic": "Chuyển Động Tròn Đều, Gia Tốc & Lực Hướng Tâm (Centripetal Force)",
    "mindset": {
      "steps": [
        "Bước 1: Các đại lượng động học chuyển động tròn đều:\n   - Chu kỳ T (thời gian quay 1 vòng): T = 2π / ω = 1 / f (s).\n   - Tần số f (số vòng quay trong 1s): f = 1 / T = ω / 2π (Hz hoặc vòng/s).\n   - Tốc độ góc ω (rad/s), Tốc độ dài v (m/s): v = ω · r.",
        "Bước 2: Gia tốc hướng tâm: Luôn hướng vào tâm quỹ đạo tròn (vuông góc với vectơ vận tốc tức thời v), đặc trưng cho sự biến đổi về HƯỚNG của vận tốc: a_ht = v² / r = ω² · r = (4π² / T²) · r.",
        "Bước 3: Lực hướng tâm (Centripetal force): Không phải là một loại lực mới trong tự nhiên, mà là HỢP LỰC của các lực tác dụng lên vật gây ra gia tốc hướng tâm: F_ht = m · a_ht = m · (v² / r) = m · ω² · r.",
        "Bước 4: Nhận diện lực hướng tâm trong các hiện tượng thực tế:\n   - Vệ tinh bay quanh Trái Đất: Lực hấp dẫn đóng vai trò lực hướng tâm (F_hd = F_ht).\n   - Xe chạy qua khúc cua nghiêng góc θ: Thành phần nằm ngang của phản lực N_x = N · sin θ đóng vai trò lực hướng tâm.\n   - Con lắc nón / Dây quay vật nặng: Thành phần lực căng dây T · sin θ đóng vai trò lực hướng tâm."
      ],
      "coreLaw": "F_ht = m · (v² / r) = m · ω² · r | v = ω · r | a_ht = v² / r",
      "shortcuts": [
        "Vận tốc vệ tinh trên quỹ đạo tròn bán kính r: v = √(G·M / r)",
        "Góc nghiêng tối ưu của mặt đường cua để xe không bị trượt khi không có ma sát: tan θ = v² / (g · r)",
        "Lực căng dây ở điểm cao nhất của vòng lượn tròn đứng: T_top = m · (v_top² / r) - m · g (Điều kiện không bị rơi: v_top ≥ √(g · r))",
        "Lực căng dây ở điểm thấp nhất: T_bottom = m · (v_bottom² / r) + m · g"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Dạng 1: Mối liên hệ chu kỳ T, tần số f, tốc độ góc ω và tốc độ dài v (Thông hiểu)",
        "description": "Chuyển đổi giữa các đại lượng động học tròn đều.",
        "formulaSummary": "v = ω · r = (2π / T) · r = 2π · f · r",
        "traps": "⚠️ Đổi đơn vị bán kính r từ cm sang mét (m), đổi tần số quay từ rpm (vòng/phút) sang vòng/giây (chia 60)."
      },
      {
        "id": "type2",
        "name": "Dạng 2: Xe qua cầu cong lồi / cầu cong lõm (Vận dụng)",
        "description": "Tính áp lực N của xe đè lên mặt cầu bán kính cong R.",
        "formulaSummary": "Cầu vồng (lồi): N = m(g - v²/R) | Cầu võng (lõm): N = m(g + v²/R)",
        "traps": "⚠️ Khi qua đỉnh cầu lồi với tốc độ quá lớn v ≥ √(gR), xe sẽ bị nhấc bổng khỏi mặt cầu (mất tiếp xúc N = 0)."
      }
    ],
    "workedExample": {
      "question": "Một ô tô có khối lượng m = 1500 kg đi qua đỉnh một cây cầu cong lồi có bán kính cong R = 40 m với vận tốc không đổi v = 36 km/h. Lấy g = 10 m/s². (a) Tính áp lực của ô tô đè lên mặt cầu tại điểm cao nhất. (b) Xe phải chạy với vận tốc tối thiểu bằng bao nhiêu để bắt đầu bị nhấc bổng khỏi mặt cầu?",
      "thinkingAnalysis": "1) Đổi đơn vị: v = 36 km/h = 10 m/s.\n2) Tại đỉnh cầu cong lồi, trọng lực P hướng xuống, phản lực N hướng lên. Trục hướng tâm hướng xuống tâm cầu: P - N = F_ht = m · (v² / R) => N = m · (g - v² / R).\n3) N = 1500 · (10 - 10² / 40) = 1500 · (10 - 2.5) = 1500 · 7.5 = 11,250 N.\n4) Để xe bị nhấc bổng: N = 0 => v_max = √(g · R) = √(10 · 40) = √400 = 20 m/s = 72 km/h.",
      "solution": "1. Đổi đơn vị: v = 36 km/h = 10 m/s.\n2. Phương trình lực hướng tâm tại đỉnh cầu:\n   P - N = m · (v² / R)\n   => N = m · [g - (v² / R)] = 1500 kg · [10 - (10² / 40)] = 1500 · 7.5 = 11,250 N (11.25 kN).\n3. Vận tốc để xe bị bay khỏi mặt cầu (N = 0):\n   v_bay = √(g · R) = √(10 · 40) = 20 m/s = 72 km/h.",
      "examTrapWarning": "⚠️ Chú ý: Áp lực lên cầu lồi luôn NHỎ HƠN trọng lượng thực của xe (N < mg), tạo cảm giác lâng lâng nhẹ người."
    },
    "practiceQuiz": {
      "question": "Một đĩa tròn có bán kính r = 20 cm quay đều với tốc độ 120 vòng/phút. Tốc độ dài của một điểm nằm ở mép đĩa là bao nhiêu?",
      "options": [
        "2.51 m/s (0.8π)",
        "1.26 m/s",
        "5.02 m/s",
        "0.40 m/s"
      ],
      "correctIndex": 0,
      "hint1": "Đổi 120 rpm sang tần số: f = 120 / 60 = 2 Hz => Tốc độ góc ω = 2π · f = 4π rad/s.",
      "hint2": "Tốc độ dài v = ω · r = 4π · 0.20 m = 0.8π ≈ 2.513 m/s.",
      "explanation": "f = 2 Hz => ω = 4π rad/s. v = ω · r = 4π · 0.2 = 0.8π ≈ 2.51 m/s."
    }
  },
  "g11-lorentz-force": {
    "topic": "Lực Lo-ren-xơ (Lorentz Force) & Quỹ Đạo Hạt Tích Điện Trong Từ Trường",
    "mindset": {
      "steps": [
        "Bước 1: Lực từ tác dụng lên hạt mang điện tích q chuyển động với vận tốc v trong từ trường B:\n   - Độ lớn: f_L = |q| · v · B · sin α (với α là góc giữa vectơ vận tốc v_vec và vectơ cảm ứng từ B_vec).\n   - Chiều lực Lorentz: Xác định bằng Quy tắc Bàn tay trái (Đặt bàn tay trái duỗi thẳng sao cho đường sức từ B đâm xuyên vào lòng bàn tay, chiều từ cổ tay đến các ngón tay chỉ chiều của vectơ v. Nếu q > 0 thì ngón cái choãi 90° chỉ chiều f_L; nếu q < 0 thì ngón cái chỉ chiều ngược lại).",
        "Bước 2: Chuyển động của hạt điện tích khi bắn VUÔNG GÓC vào từ trường đều (α = 90°):\n   - Vì lực Lorentz luôn vuông góc với vận tốc (f_L ⊥ v_vec) nên lực Lorentz KHÔNG SINH CÔNG (A = 0) => Động năng và độ lớn vận tốc của hạt KHÔNG ĐỔI.\n   - Lực Lorentz đóng vai trò lực hướng tâm: f_L = F_ht <=> |q| · v · B = m · (v² / r).\n   - Bán kính quỹ đạo tròn: r = (m · v) / (|q| · B).\n   - Chu kỳ quay trên đường tròn: T = 2π · r / v = (2π · m) / (|q| · B) (Hoàn toàn KHÔNG PHỤ THUỘC vào vận tốc v!).",
        "Bước 3: Bộ chọn lọc vận tốc (Velocity Selector): Điện trường E và Từ trường B vuông góc đôi một. Hạt đi thẳng không bị lệch khi lực điện cân bằng lực từ: F_đ = F_t <=> |q| · E = |q| · v · B => Vận tốc chọn lọc: v = E / B."
      ],
      "coreLaw": "f_L = |q| · v · B · sin α | r = (m · v) / (|q| · B) | T = (2π · m) / (|q| · B)",
      "shortcuts": [
        "Hai hạt cùng điện tích bay vào từ trường: Tỉ số bán kính r1 / r2 = (m1 · v1) / (m2 · v2) = p1 / p2 (tỉ lệ thuận với động lượng)",
        "Hạt được tăng tốc bởi hiệu điện thế U: Động năng (1/2)mv² = |q|·U => v = √(2|q|U/m) => r = (1/B) · √(2mU / |q|)",
        "Khối phổ kế (Mass Spectrometer) tách các đồng vị: Đo bán kính vết đập r => Tính được khối lượng nguyên tử m = (|q| · B · r) / v"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Dạng 1: Tính Độ lớn Lực Lorentz & Bán kính Quỹ đạo r (Thông hiểu)",
        "description": "Áp dụng r = mv / (|q|B) cho electron, proton hoặc hạt alpha trong từ trường đều.",
        "formulaSummary": "r = (m · v) / (|q| · B) | T = 2πm / (|q| · B)",
        "traps": "⚠️ Electron mang điện tích âm (q = -1.6 · 10⁻¹⁹ C), lực Lorentz có chiều NGƯỢC LẠI với chiều ngón cái trong quy tắc bàn tay trái."
      },
      {
        "id": "type2",
        "name": "Dạng 2: Bộ chọn lọc vận tốc & Khối phổ kế (Vận dụng cao)",
        "description": "Hạt mang điện đi thẳng không bị lệch khi lực điện và lực từ cân bằng nhau.",
        "formulaSummary": "v = E / B | m = (|q| · B · r) / v",
        "traps": "⚠️ Trong bộ chọn lọc vận tốc, điều kiện v = E/B hoàn toàn không phụ thuộc vào khối lượng m và điện tích q của hạt (tất cả các hạt có cùng tốc độ v đều bay thẳng)."
      }
    ],
    "workedExample": {
      "question": "Một electron (khối lượng m = 9.11 · 10⁻³¹ kg, điện tích q = -1.60 · 10⁻¹⁹ C) bay vào một từ trường đều B = 2.0 · 10⁻³ T theo phương vuông góc với các đường sức từ với vận tốc v = 4.0 · 10⁶ m/s. Tính: (a) Độ lớn lực từ Lorentz tác dụng lên electron. (b) Bán kính quỹ đạo tròn của electron. (c) Chu kỳ quay của electron trong từ trường.",
      "thinkingAnalysis": "1) Độ lớn lực từ Lorentz: f_L = |q| · v · B · sin(90°) = 1.6 · 10⁻¹⁹ · 4.0 · 10⁶ · 2.0 · 10⁻³ = 1.28 · 10⁻¹⁵ N.\n2) Bán kính quỹ đạo: r = (m · v) / (|q| · B) = (9.11 · 10⁻³¹ · 4.0 · 10⁶) / (1.6 · 10⁻¹⁹ · 2.0 · 10⁻³) = 3.644 · 10⁻²⁴ / 3.2 · 10⁻²² = 0.0114 m = 1.14 cm.\n3) Chu kỳ quay: T = 2π · r / v = (2π · m) / (|q| · B) = (2 · 3.14159 · 9.11 · 10⁻³¹) / (3.2 · 10⁻²²) = 1.79 · 10⁻⁸ s = 17.9 ns.",
      "solution": "1. Độ lớn lực từ Lorentz f_L:\n   f_L = |q| · v · B · sin 90° = (1.60 · 10⁻¹⁹ C) · (4.0 · 10⁶ m/s) · (2.0 · 10⁻³ T) = 1.28 · 10⁻¹⁵ N.\n2. Bán kính quỹ đạo tròn r:\n   r = (m · v) / (|q| · B) = (9.11 · 10⁻³¹ kg · 4.0 · 10⁶ m/s) / (1.60 · 10⁻¹⁹ C · 2.0 · 10⁻³ T) = 0.0114 m = 1.14 cm.\n3. Chu kỳ quay T:\n   T = (2π · m) / (|q| · B) = (2 · 3.14159 · 9.11 · 10⁻³¹) / (3.20 · 10⁻²²) = 1.79 · 10⁻⁸ s = 17.9 ns.",
      "examTrapWarning": "⚠️ Bẫy bản chất vật lý: Lực từ Lorentz chỉ làm đổi HƯỚNG của vận tốc, KHÔNG BAO GIỜ làm thay đổi TỐC ĐỘ hay ĐỘNG NĂNG của hạt vì lực luôn vuông góc với vận tốc (Công của lực Lorentz A = 0)."
    },
    "practiceQuiz": {
      "question": "Một hạt proton (điện tích +e) và một hạt alpha (điện tích +2e, khối lượng 4m) cùng bay vào một từ trường đều với cùng vận tốc theo phương vuông góc với B. Tỉ số bán kính quỹ đạo r_alpha / r_proton là bao nhiêu?",
      "options": [
        "2",
        "1",
        "4",
        "0.5"
      ],
      "correctIndex": 0,
      "hint1": "Công thức bán kính quỹ đạo: r = (m · v) / (q · B).",
      "hint2": "r_alpha / r_proton = (m_alpha / m_proton) · (q_proton / q_alpha) = (4 / 1) · (1 / 2) = 2.",
      "explanation": "r_alpha / r_proton = (4m · v / 2eB) / (m · v / eB) = 4 / 2 = 2."
    }
  },
  "g12-lc-oscillator": {
    "topic": "Mạch Dao Động LC, Năng Lượng Điện Từ & Sóng Điện Từ",
    "mindset": {
      "steps": [
        "Bước 1: Phương trình dao động điện từ tự do trong mạch LC lý tưởng:\n   - Điện tích trên bản tụ điện: q(t) = Q_0 · cos(ωt + φ).\n   - Hiệu điện thế giữa 2 bản tụ: u(t) = q(t) / C = U_0 · cos(ωt + φ) (cùng pha với q).\n   - Cường độ dòng điện trong mạch: i(t) = q'(t) = -ω · Q_0 · sin(ωt + φ) = I_0 · cos(ωt + φ + π/2) (sớm pha π/2 so với q và u).",
        "Bước 2: Tần số góc, chu kỳ và tần số dao động riêng (Công thức Thomson):\n   - Tần số góc: ω = 1 / √(L · C).\n   - Chu kỳ: T = 2π √(L · C).\n   - Tần số: f = 1 / [2π √(L · C)].\n   - Mối liên hệ các biên độ cực đại: I_0 = ω · Q_0 = Q_0 / √(LC) = U_0 · √(C / L).",
        "Bước 3: Bảo toàn Năng lượng Điện từ:\n   - Năng lượng điện trường trong tụ: W_C = (1/2) · (q² / C) = (1/2) · C · u².\n   - Năng lượng từ trường trong cuộn cảm: W_L = (1/2) · L · i².\n   - Năng lượng điện từ toàn phần KHÔNG ĐỔI: W = W_C + W_L = (1/2) · (Q_0² / C) = (1/2) · C · U_0² = (1/2) · L · I_0².",
        "Bước 4: Thu phát sóng điện từ:\n   - Bước sóng điện từ mạch LC thu được trong không khí: λ = c · T = 2π · c · √(L · C) (với c = 3 · 10⁸ m/s)."
      ],
      "coreLaw": "T = 2π √(LC) | W = (1/2) C U_0² = (1/2) L I_0² | λ = 2π c √(LC)",
      "shortcuts": [
        "Công thức độc lập thời gian giữa q và i (vuông pha): (q / Q_0)² + (i / I_0)² = 1",
        "Khi năng lượng từ trường bằng n lần năng lượng điện trường (W_L = n · W_C):\n   |q| = Q_0 / √(n + 1); |i| = I_0 · √(n / (n + 1))",
        "Khoảng thời gian giữa 2 lần liên tiếp năng lượng điện trường bằng năng lượng từ trường: Δt = T / 4",
        "Tụ xoay biến thiên từ C_min đến C_max: Dải bước sóng thu được λ_min = 2π c √(L C_min) đến λ_max = 2π c √(L C_max)"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Dạng 1: Tính chu kỳ T, tần số f và bước sóng thu sóng λ (Nhận biết - Thông hiểu)",
        "description": "Áp dụng T = 2π√(LC) và λ = c · 2π√(LC).",
        "formulaSummary": "λ = 3·10⁸ · 2π · √(L · C)",
        "traps": "⚠️ Đổi L từ mH/μH ra H (1 mH = 10⁻³ H), đổi C từ pF/nF/μF ra F (1 pF = 10⁻¹² F)."
      },
      {
        "id": "type2",
        "name": "Dạng 2: Biến thiên năng lượng điện từ & Hệ thức độc lập (Vận dụng cao)",
        "description": "Tìm i khi biết u hoặc tìm q khi biết i.",
        "formulaSummary": "i = ± √(C/L · (U_0² - u²))",
        "traps": "⚠️ Năng lượng điện trường W_C và từ trường W_L biến thiên tuần hoàn với chu kỳ T' = T/2 và tần số f' = 2f (gấp đôi tần số mạch dao động)."
      }
    ],
    "workedExample": {
      "question": "Một mạch dao động LC lý tưởng gồm cuộn cảm thuần L = 4 μH và tụ điện C = 9 nF. Điện áp cực đại giữa hai bản tụ là U_0 = 6.0 V. (a) Tính chu kỳ dao động riêng T và bước sóng λ của sóng điện từ mà mạch có thể thu được. (b) Tính cường độ dòng điện cực đại I_0 trong mạch. (c) Khi điện áp tức thời u = 3.0 V thì cường độ dòng điện i bằng bao nhiêu?",
      "thinkingAnalysis": "1) Chu kỳ T = 2π √(LC) = 2π √(4 · 10⁻⁶ · 9 · 10⁻⁹) = 2π √(36 · 10⁻¹⁵) = 2π · 6 · 10⁻⁷.5 = 1.2π · 10⁻⁶ ≈ 3.77 · 10⁻⁷ s.\n2) Bước sóng λ = c · T = 3 · 10⁸ · (1.2π · 10⁻⁶) = 360π ≈ 1131 m.\n3) Dòng cực đại: (1/2) L I_0² = (1/2) C U_0² => I_0 = U_0 · √(C / L) = 6 · √(9·10⁻⁹ / 4·10⁻⁶) = 6 · √(2.25 · 10⁻³) = 6 · 0.04743 = 0.285 A = 285 mA.\n4) Khi u = 3V = U_0 / 2: Áp dụng độc lập (u/U_0)² + (i/I_0)² = 1 => (3/6)² + (i/I_0)² = 1 => (i/I_0)² = 3/4 => |i| = I_0 · √3 / 2 = 285 · 0.866 = 246.5 mA.",
      "solution": "1. Chu kỳ dao động riêng và bước sóng:\n   T = 2π · √(L · C) = 2π · √(4 · 10⁻⁶ H · 9 · 10⁻⁹ F) = 2π · (6 · 10⁻⁷.5) = 3.77 · 10⁻⁷ s.\n   Bước sóng: λ = c · T = (3 · 10⁸ m/s) · (3.77 · 10⁻⁷ s) = 113.1 m.\n2. Cường độ dòng điện cực đại I_0:\n   (1/2) · L · I_0² = (1/2) · C · U_0²\n   => I_0 = U_0 · √(C / L) = 6.0 · √(9 · 10⁻⁹ / 4 · 10⁻⁶) = 6.0 · 0.04743 A = 0.285 A = 285 mA.\n3. Khi u = 3 V = U_0 / 2:\n   (u / U_0)² + (i / I_0)² = 1\n   => (3 / 6)² + (i / I_0)² = 1 => |i| = I_0 · (√3 / 2) = 0.285 · 0.866 = 0.247 A = 247 mA.",
      "examTrapWarning": "⚠️ Bẫy đề thi THPTQG: 'Năng lượng từ trường biến thiên với tần số f_W'. Đáp án phải là f_W = 2f_mach (chứ không phải f_mach)."
    },
    "practiceQuiz": {
      "question": "Mạch chọn sóng của một máy thu vô tuyến gồm cuộn cảm L = 2 μH và tụ điện C biến thiên từ 10 pF đến 490 pF. Dải bước sóng điện từ máy thu được có giới hạn từ bao nhiêu đến bao nhiêu?",
      "options": [
        "8.4 m đến 59.0 m",
        "2.6 m đến 18.5 m",
        "12.0 m đến 84.0 m",
        "1.5 m đến 10.5 m"
      ],
      "correctIndex": 0,
      "hint1": "λ_min = 2π c √(L · C_min) = 2π · 3·10⁸ · √(2·10⁻⁶ · 10·10⁻¹²).",
      "hint2": "λ_min = 6π · 10⁸ · √(20·10⁻¹⁸) = 6π · 10⁸ · 4.472·10⁻⁹ ≈ 8.43 m. λ_max = λ_min · √(490 / 10) = 8.43 · 7 = 59.0 m.",
      "explanation": "λ_min = 2π · 3·10⁸ · √(2·10⁻⁶ · 10·10⁻¹²) ≈ 8.4 m. λ_max = 8.4 · √49 = 8.4 · 7 = 59.0 m."
    }
  },
  "g12-nuclear-energy": {
    "topic": "Độ Hụt Khối, Năng Lượng Liên Kết Hạt Nhân & Năng Lượng Phản Ứng",
    "mindset": {
      "steps": [
        "Bước 1: Hệ thức Anh-xtanh giữa khối lượng và năng lượng: E = m · c² (với 1 u = 931.5 MeV/c² hay 1 u · c² = 931.5 MeV; 1 eV = 1.6 · 10⁻¹⁹ J; 1 MeV = 10⁶ eV = 1.6 · 10⁻¹³ J).",
        "Bước 2: Độ hụt khối của hạt nhân (Mass defect) X (A, Z):\n   - Khối lượng của các nucleon riêng rẽ: m_tong = Z · m_p + (A - Z) · m_n.\n   - Luôn có: m_tong > m_hat_nhan do một phần khối lượng chuyển thành năng lượng liên kết.\n   - Độ hụt khối: Δm = [Z · m_p + (A - Z) · m_n] - m_X.",
        "Bước 3: Năng lượng liên kết & Năng lượng liên kết riêng:\n   - Năng lượng liên kết (Binding energy): W_lk = Δm · c² = Δm (u) · 931.5 (MeV).\n   - Năng lượng liên kết riêng (Binding energy per nucleon): ε = W_lk / A (MeV/nucleon).\n   - Ý nghĩa: Đại lượng đặc trưng cho MỨC ĐỘ BỀN VỮNG của hạt nhân (ε càng lớn thì hạt nhân càng bền vững). Các hạt nhân bền vững nhất có số khối A từ 50 đến 80 (đỉnh cao nhất là Fe-56 với ε ≈ 8.8 MeV/nucleon).",
        "Bước 4: Năng lượng tỏa ra hoặc thu vào trong phản ứng hạt nhân A + B -> C + D:\n   - Theo khối lượng nghỉ: ΔE = (m_truoc - m_sau) · c² = (m_A + m_B - m_C - m_D) · c².\n     + Nếu ΔE > 0 (m_truoc > m_sau): Phản ứng TỎA NĂNG LƯỢNG.\n     + Nếu ΔE < 0 (m_truoc < m_sau): Phản ứng THU NĂNG LƯỢNG |ΔE|.\n   - Theo độ hụt khối: ΔE = (Δm_sau - Δm_truoc) · c² = (Δm_C + Δm_D - Δm_A - Δm_B) · c².\n   - Theo năng lượng liên kết: ΔE = W_lk_sau - W_lk_truoc."
      ],
      "coreLaw": "Δm = Z·m_p + (A-Z)·m_n - m_X | W_lk = Δm · c² | ε = W_lk / A",
      "shortcuts": [
        "Phản ứng phân hạch U-235: Tỏa năng lượng ~ 200 MeV trên mỗi phân hạch",
        "Phản ứng nhiệt hạch (Tổng hợp hạt nhân nhẹ D + T -> He + n): Tỏa năng lượng ~ 17.6 MeV (Tính trên 1 đơn vị khối lượng thì nhiệt hạch tỏa nhiều năng lượng hơn phân hạch gấp ~4 lần!)",
        "Bảo toàn trong phản ứng hạt nhân: Bảo toàn số khối A, Bảo toàn điện tích Z, Bảo toàn động lượng p, Bảo toàn năng lượng toàn phần (KHÔNG CÓ bảo toàn khối lượng nghỉ và KHÔNG CÓ bảo toàn số proton/neutron riêng lẻ!)"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Dạng 1: Năng lượng Liên kết riêng & Độ bền vững Hạt nhân (Thông hiểu)",
        "description": "Tính độ hụt khối Δm và năng lượng liên kết riêng ε để so sánh độ bền vững giữa các hạt nhân.",
        "formulaSummary": "ε = [Z·m_p + (A-Z)·m_n - m_X] · 931.5 / A",
        "traps": "⚠️ Năng lượng liên kết W_lk lớn hơn KHÔNG CÓ NGHĨA là hạt nhân bền vững hơn! Độ bền vững chỉ được quyết định bởi NĂNG LƯỢNG LIÊN KẾT RIÊNG ε = W_lk / A."
      },
      {
        "id": "type2",
        "name": "Dạng 2: Năng lượng Tỏa ra / Thu vào trong Phản ứng Hạt nhân (Vận dụng cao)",
        "description": "Tính năng lượng phản ứng Q bằng độ hụt khối hoặc năng lượng liên kết.",
        "formulaSummary": "Q = (m_truoc - m_sau) · c² = W_lk_sau - W_lk_truoc",
        "traps": "⚠️ Chú ý thứ tự tính ngược nhau: Nếu dùng khối lượng nghỉ: Q = m_trước - m_sau. Nếu dùng năng lượng liên kết: Q = W_lk_sau - W_lk_trước."
      }
    ],
    "workedExample": {
      "question": "Cho khối lượng của proton m_p = 1.007276 u, neutron m_n = 1.008665 u và hạt nhân Heli He-4 có m_He = 4.001506 u. Lấy 1 u = 931.5 MeV/c². (a) Tính độ hụt khối và năng lượng liên kết của hạt nhân He-4. (b) Tính năng lượng liên kết riêng của He-4.",
      "thinkingAnalysis": "1) Hạt nhân He-4 có Z = 2 proton và A - Z = 4 - 2 = 2 neutron.\n2) Tổng khối lượng các nucleon rải rác: m_tong = 2 · 1.007276 + 2 · 1.008665 = 2.014552 + 2.017330 = 4.031882 u.\n3) Độ hụt khối: Δm = 4.031882 - 4.001506 = 0.030376 u.\n4) Năng lượng liên kết: W_lk = 0.030376 · 931.5 = 28.295 MeV.\n5) Năng lượng liên kết riêng: ε = 28.295 / 4 = 7.074 MeV/nucleon.",
      "solution": "1. Độ hụt khối của hạt nhân He-4:\n   Δm = 2 · m_p + 2 · m_n - m_He\n   Δm = 2 · (1.007276 u) + 2 · (1.008665 u) - 4.001506 u\n   Δm = 4.031882 u - 4.001506 u = 0.030376 u.\n2. Năng lượng liên kết W_lk:\n   W_lk = Δm · c² = 0.030376 u · (931.5 MeV/u) = 28.30 MeV.\n3. Năng lượng liên kết riêng ε:\n   ε = W_lk / A = 28.295 MeV / 4 = 7.07 MeV/nucleon.",
      "examTrapWarning": "⚠️ Bẫy làm tròn số: Trong vật lý hạt nhân, độ hụt khối rất nhỏ (phần mười nghìn u), bắt buộc phải giữ lại tối thiểu 5 đến 6 chữ số thập phân khi trừ khối lượng."
    },
    "practiceQuiz": {
      "question": "Trong phản ứng hạt nhân: D (2,1) + T (3,1) -> He (4,2) + n (1,0) + 17.6 MeV. Năng lượng tỏa ra khi tổng hợp hoàn toàn 1 gam khí Heli là bao nhiêu?",
      "options": [
        "4.24 · 10¹¹ J (424 GJ)",
        "1.06 · 10¹¹ J",
        "2.12 · 10¹¹ J",
        "8.48 · 10¹¹ J"
      ],
      "correctIndex": 0,
      "hint1": "1 mol Heli (4 gam) có N_A = 6.022 · 10²³ nguyên tử. Số hạt nhân Heli trong 1 gam: N = (1 / 4) · N_A.",
      "hint2": "Tổng năng lượng: E = N · 17.6 MeV = 0.25 · 6.022·10²³ · 17.6 · 1.6·10⁻¹³ J = 4.24 · 10¹¹ J.",
      "explanation": "N = 1/4 · 6.022·10²³ = 1.5055·10²³ hạt. E = 1.5055·10²³ · 17.6 MeV · 1.6·10⁻¹³ J/MeV = 4.24 · 10¹¹ J = 424 GJ."
    }
  },
  "g12-bohr-atom": {
    "topic": "Mẫu Nguyên Tử Bohr, Các Mức Năng Lượng & Quang Phổ Phát Xạ Hydro",
    "mindset": {
      "steps": [
        "Bước 1: Tiên đề 1 về Trạng thái dừng của Bohr:\n   - Nguyên tử chỉ tồn tại trong những trạng thái có năng lượng xác định gọi là trạng thái dừng. Khi ở trạng thái dừng, nguyên tử KHÔNG BỨC XẠ năng lượng.\n   - Bán kính quỹ đạo dừng của electron trong nguyên tử hydro: r_n = n² · r_0 (với r_0 = 5.3 · 10⁻¹¹ m = 0.53 Å là bán kính Bohr; n = 1: K, n = 2: L, n = 3: M, n = 4: N, n = 5: O, n = 6: P...).",
        "Bước 2: Năng lượng của nguyên tử hydro ở trạng thái dừng n: E_n = -13.6 / n² (eV) (với n = 1 là trạng thái cơ bản bền vững nhất E_1 = -13.6 eV; n ≥ 2 là các trạng thái kích thích).",
        "Bước 3: Tiên đề 2 về Sự bức xạ và hấp thụ photon:\n   - Khi nguyên tử chuyển từ trạng thái dừng có mức năng lượng cao E_cao (m) xuống mức thấp hơn E_thap (n), nó phát ra 1 photon có năng lượng: ε = h · f = (h · c) / λ = E_cao - E_thap.\n   - Ngược lại, nếu đang ở mức thấp E_thap mà hấp thụ đúng 1 photon có năng lượng ε = E_cao - E_thap thì nguyên tử sẽ nhảy lên mức E_cao.",
        "Bước 4: Các dãy quang phổ vạch phát xạ của nguyên tử Hydro:\n   - Dãy Lyman (chuyển về mức n = 1): Nằm hoàn toàn trong vùng TỬ NGOẠI.\n   - Dãy Balmer (chuyển về mức n = 2): Gồm 4 vạch sáng nhìn thấy (Đỏ H_alpha 3->2, Lam H_beta 4->2, Chàm H_gamma 5->2, Tím H_delta 6->2) và các vạch còn lại trong vùng tử ngoại.\n   - Dãy Paschen (chuyển về mức n = 3): Nằm hoàn toàn trong vùng HỒNG NGOẠI."
      ],
      "coreLaw": "r_n = n² · r_0 | E_n = -13.6 / n² (eV) | h · f = h c / λ = E_m - E_n",
      "shortcuts": [
        "Số vạch quang phổ phát xạ tối đa khi một đám nguyên tử hydro bị kích thích lên mức n: N_max = n · (n - 1) / 2 = C_n²",
        "Bước sóng dài nhất (tần số nhỏ nhất) trong một dãy: Chuyển giữa 2 mức kề nhau (n+1 -> n) => λ_max",
        "Bước sóng ngắn nhất (giới hạn quang phổ, năng lượng lớn nhất) trong một dãy: Chuyển từ vô cực về mức n (∞ -> n) => λ_min = hc / |E_n|"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Dạng 1: Tính bán kính quỹ đạo r_n và mức năng lượng E_n (Nhận biết - Thông hiểu)",
        "description": "Áp dụng r_n = n² · r_0 và E_n = -13.6 / n² eV.",
        "formulaSummary": "r_n = n² · 0.53 Å | E_n = -13.6 / n² eV",
        "traps": "⚠️ Bán kính quỹ đạo tỉ lệ thuận với BÌNH PHƯƠNG số nguyên n (r_L = 4 r_0; r_M = 9 r_0; r_N = 16 r_0)."
      },
      {
        "id": "type2",
        "name": "Dạng 2: Tính bước sóng photon phát xạ λ khi chuyển mức năng lượng (Vận dụng)",
        "description": "Tính λ = hc / (E_m - E_n).",
        "formulaSummary": "λ = (1.9864 · 10⁻²⁵ J·m) / [(E_m - E_n) · 1.6 · 10⁻¹⁹ J]",
        "traps": "⚠️ Đổi hiệu năng lượng từ eV sang Joule (J) bằng cách nhân với 1.6 · 10⁻¹⁹ trước khi chia cho hc."
      }
    ],
    "workedExample": {
      "question": "Nguyên tử hydro ở trạng thái kích thích M (n = 3) chuyển về trạng thái kích thích L (n = 2), phát ra vạch quang phổ đỏ H_alpha. Cho biết h = 6.626 · 10⁻³⁴ J·s, c = 3 · 10⁸ m/s, 1 eV = 1.6 · 10⁻¹⁹ J. Tính bước sóng λ của vạch đỏ H_alpha.",
      "thinkingAnalysis": "1) Mức năng lượng n = 3 (M): E_3 = -13.6 / 3² = -13.6 / 9 = -1.511 eV.\n2) Mức năng lượng n = 2 (L): E_2 = -13.6 / 2² = -13.6 / 4 = -3.400 eV.\n3) Năng lượng photon phát ra: ΔE = E_3 - E_2 = -1.511 - (-3.400) = 1.889 eV.\n4) Đổi sang Joule: ΔE = 1.889 · 1.6 · 10⁻¹⁹ = 3.0224 · 10⁻¹⁹ J.\n5) Bước sóng: λ = h · c / ΔE = (6.626 · 10⁻³⁴ · 3 · 10⁸) / (3.0224 · 10⁻¹⁹) = 1.9878 · 10⁻²⁵ / 3.0224 · 10⁻¹⁹ = 6.577 · 10⁻⁷ m = 657.7 nm = 0.658 μm.",
      "solution": "1. Năng lượng ở các mức dừng n = 3 và n = 2:\n   E_3 = -13.6 / 3² = -1.511 eV.\n   E_2 = -13.6 / 2² = -3.400 eV.\n2. Năng lượng photon phát xạ:\n   ΔE = E_3 - E_2 = -1.511 eV - (-3.400 eV) = 1.889 eV = 3.0224 · 10⁻¹⁹ J.\n3. Bước sóng của vạch phát xạ H_alpha:\n   λ = (h · c) / ΔE = (6.626 · 10⁻³⁴ J·s · 3.0 · 10⁸ m/s) / (3.0224 · 10⁻¹⁹ J) = 6.58 · 10⁻⁷ m = 658 nm.",
      "examTrapWarning": "⚠️ Bẫy quên đổi eV ra Joule: Nếu lấy trực tiếp hc / 1.889 sẽ ra kết quả sai lệch 10¹⁹ lần."
    },
    "practiceQuiz": {
      "question": "Một đám nguyên tử Hydro đang ở trạng thái kích thích N (n = 4). Khi chuyển về các mức thấp hơn, đám nguyên tử này có thể phát ra tối đa bao nhiêu vạch quang phổ có bước sóng khác nhau?",
      "options": [
        "6 vạch",
        "4 vạch",
        "3 vạch",
        "12 vạch"
      ],
      "correctIndex": 0,
      "hint1": "Áp dụng công thức số vạch phát xạ tối đa: N = n · (n - 1) / 2.",
      "hint2": "Với n = 4: N = 4 · 3 / 2 = 6 vạch (gồm: 4->3, 4->2, 4->1, 3->2, 3->1, 2->1).",
      "explanation": "N = n(n - 1) / 2 = 4 · 3 / 2 = 6 vạch quang phổ."
    }
  },
  "g12-thermodynamics-1st": {
    "topic": "Định Luật I Nhiệt Động Lực Học, Nhiệt Dung Riêng & Nhiệt Chuyển Thể",
    "mindset": {
      "steps": [
        "Bước 1: Nhiệt lượng làm thay đổi nhiệt độ vật thể: Q = m · c · ΔT = m · c · (T_sau - T_truoc) (với c là nhiệt dung riêng J/(kg·K)).",
        "Bước 2: Nhiệt lượng trong quá trình chuyển thể (ở nhiệt độ không đổi):\n   - Nóng chảy / Đông đặc: Q = λ_nc · m (với λ_nc là nhiệt nóng chảy riêng J/kg).\n   - Hóa hơi / Ngưng tụ: Q = L · m (với L là nhiệt hóa hơi riêng J/kg).",
        "Bước 3: Định luật I Nhiệt động lực học: Độ biến thiên nội năng của hệ bằng tổng công và nhiệt lượng mà hệ nhận được: ΔU = A + Q.",
        "Bước 4: Quy ước dấu quan trọng bậc nhất trong Nhiệt học:\n   - Q > 0: Hệ NHẬN nhiệt lượng từ môi trường.\n   - Q < 0: Hệ TRUYỀN (tỏa) nhiệt lượng ra môi trường.\n   - A > 0: Hệ NHẬN công từ ngoại lực (khí bị nén, thể tích giảm V_sau < V_truoc).\n   - A < 0: Hệ SINH công tác dụng lên môi trường (khí dãn nở, đẩy piston ra ngoài, A = -P · ΔV < 0)."
      ],
      "coreLaw": "ΔU = A + Q | Q = m · c · ΔT | Q = L · m | A = -P · ΔV",
      "shortcuts": [
        "Quá trình Đẳng tích (V = const): Khí không dãn nở nên A = 0 => ΔU = Q_V (toàn bộ nhiệt lượng nhận vào dùng để tăng nội năng)",
        "Quá trình Đẳng nhiệt (T = const): Nội năng khí lý tưởng không đổi ΔU = 0 => Q = -A (nhiệt lượng nhận vào chuyển hoàn toàn thành công sinh ra)",
        "Quá trình Đoạn nhiệt (cách nhiệt hoàn toàn Q = 0): ΔU = A (khi nén đoạn nhiệt A > 0 => nội năng tăng, nhiệt độ tăng vọt)"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Dạng 1: Áp dụng biểu thức Định luật I Nhiệt động lực học ΔU = A + Q (Thông hiểu)",
        "description": "Xác định dấu của A, Q và tính độ biến thiên nội năng ΔU.",
        "formulaSummary": "ΔU = A + Q (chú ý xét đúng dấu)",
        "traps": "⚠️ 'Khí dãn nở sinh công 50 J và nhận nhiệt 80 J' => A = -50 J, Q = +80 J => ΔU = -50 + 80 = +30 J."
      },
      {
        "id": "type2",
        "name": "Dạng 2: Phương trình cân bằng nhiệt & Đồ thị chuyển thể (Vận dụng)",
        "description": "Tổng nhiệt lượng tỏa ra = Tổng nhiệt lượng thu vào.",
        "formulaSummary": "Q_toa = Q_thu <=> m1·c1·(t1 - t_cb) = m2·c2·(t_cb - t2)",
        "traps": "⚠️ Khi đá tan ở 0°C, phải cộng thêm nhiệt nóng chảy Q_nc = λ · m trước khi tính nhiệt làm nước ấm lên."
      }
    ],
    "workedExample": {
      "question": "Người ta truyền cho chất khí trong xilanh một nhiệt lượng Q = 150 J. Chất khí nở ra đẩy pit-tông lên sinh một công A' = 90 J chống lại ngoại lực. (a) Xác định độ biến thiên nội năng ΔU của khối khí. (b) Nội năng của khí tăng hay giảm?",
      "thinkingAnalysis": "1) Khí 'nhận nhiệt' nên Q = +150 J.\n2) Khí 'sinh công' đẩy piston nên công mà khí nhận được là A = -A' = -90 J.\n3) Theo Định luật I Nhiệt động lực học: ΔU = A + Q = -90 + 150 = +60 J.\n4) Vì ΔU = +60 J > 0 nên nội năng của khối khí TĂNG thêm 60 J (nhiệt độ chất khí tăng lên).",
      "solution": "1. Xác định giá trị đại số của các đại lượng:\n   Q = +150 J (Khí nhận nhiệt lượng).\n   A = -90 J (Khí sinh công đẩy pit-tông dãn nở).\n2. Độ biến thiên nội năng của khối khí:\n   ΔU = A + Q = (-90 J) + (+150 J) = +60 J.\n3. Kết luận: Nội năng của khối khí tăng thêm 60 Joules.",
      "examTrapWarning": "⚠️ Bẫy dấu: Nhầm A = +90 J sẽ dẫn đến ΔU = 90 + 150 = 240 J (SAI vì khí sinh công tiêu tốn nội năng, không thể cộng vào)."
    },
    "practiceQuiz": {
      "question": "Nén một khối khí trong xilanh bằng một công 120 J. Trong quá trình đó, khối khí tỏa ra môi trường một nhiệt lượng 40 J. Độ biến thiên nội năng của khối khí là bao nhiêu?",
      "options": [
        "+80 J (tăng 80 J)",
        "+160 J",
        "-80 J",
        "-160 J"
      ],
      "correctIndex": 0,
      "hint1": "Khí nhận công do bị nén: A = +120 J. Khí tỏa nhiệt: Q = -40 J.",
      "hint2": "Độ biến thiên nội năng: ΔU = A + Q = 120 + (-40) = +80 J.",
      "explanation": "ΔU = A + Q = (+120) + (-40) = +80 J (nội năng tăng 80 J)."
    }
  }
};

export const EXAM_METHODOLOGY_DATA_EN = {
  "g6-archimedes": {
    "topic": "Archimedes' Principle, Buoyancy & Flotation of Objects",
    "mindset": {
      "steps": [
        "Step 1: Identify object state (Completely submerged, Neutrally buoyant, or Partially floating on liquid surface).",
        "Step 2: Determine submerged volume V_sub (Only count the volume portion submerged within the liquid).",
        "Step 3: Establish force equilibrium for floating/submerged object: Weight P = Buoyant Force F_A (where P = ρ_obj · g · V_total, F_A = ρ_liq · g · V_sub).",
        "Step 4: Apparent weight measurement with spring balance: F_A = P_air - P_liquid = ΔP."
      ],
      "coreLaw": "F_A = ρ_liquid · g · V_submerged = d_liquid · V_submerged",
      "shortcuts": [
        "Submerged volume ratio for floating object: V_sub / V_total = ρ_obj / ρ_liquid = d_obj / d_liquid",
        "Apparent loss of weight: F_A = P_air - P_apparent",
        "Density of object from two weight measurements: ρ_obj = ρ_liquid · P_air / (P_air - P_apparent)"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Type 1: Calculating Buoyant Force F_A & Submerged Volume (Core Understanding)",
        "description": "Direct application of F_A = d · V when submerged volume or liquid displacement is given.",
        "formulaSummary": "F_A = d_liquid · V_sub = 10 · ρ · V_sub",
        "traps": "⚠️ Unit conversion: Convert cm³ to m³ (1 cm³ = 10⁻⁶ m³; 1 dm³ = 1 litre = 10⁻³ m³). Do not confuse mass density ρ (kg/m³) with weight density d = ρ·g (N/m³)."
      },
      {
        "id": "type2",
        "name": "Type 2: Flotation Investigation - Submerged vs Floating Fractions (Application)",
        "description": "Object released in liquid, determine percentage of volume emerging above surface.",
        "formulaSummary": "%V_sub = (ρ_obj / ρ_liquid) · 100% | %V_emerged = 100% - %V_sub",
        "traps": "⚠️ Questions frequently ask for 'EMERGED volume above surface', but students mistakenly calculate submerged volume."
      },
      {
        "id": "type3",
        "name": "Type 3: Determining Material Density via Two Spring Balance Readings (Advanced Practical)",
        "description": "Measure weight P1 in air and P2 submerged in reference liquid of known density.",
        "formulaSummary": "ρ_obj = [P_1 / (P_1 - P_2)] · ρ_liquid",
        "traps": "⚠️ Object must be completely submerged in the liquid without touching the container bottom or sides."
      }
    ],
    "workedExample": {
      "question": "A wooden block of volume V = 500 cm³ is placed in water (water density ρ_w = 1000 kg/m³, wood density ρ_wood = 600 kg/m³). Take g = 10 m/s². Calculate the volume of the wood that floats above the water surface.",
      "thinkingAnalysis": "1) Since wood density (600 kg/m³) is less than water (1000 kg/m³), the wood floats partially submerged.\\n2) At equilibrium: Weight P = Buoyant force F_A.\\n3) Submerged volume: V_sub = (ρ_wood / ρ_w) · V_total = (600/1000) · 500 = 300 cm³.\\n4) Floating volume above surface: V_emerged = V_total - V_sub = 500 - 300 = 200 cm³.",
      "solution": "1. Unit conversion: V = 500 cm³ = 5 · 10⁻⁴ m³.\\n2. Weight of wooden block: P = 10 · ρ_wood · V = 10 · 600 · 5·10⁻⁴ = 3.0 N.\\n3. Flotation equilibrium: F_A = P\\n   <=> 10 · ρ_w · V_sub = 3.0 N\\n   <=> V_sub = 3.0 / (10 · 1000) = 3 · 10⁻⁴ m³ = 300 cm³.\\n4. Volume floating above water surface:\\n   V_emerged = V - V_sub = 500 - 300 = 200 cm³.",
      "examTrapWarning": "⚠️ Exam trap: Many students quickly circle 300 cm³ (submerged volume) and forget that the question explicitly asked for the volume FLOATING ABOVE the surface (200 cm³)."
    },
    "practiceQuiz": {
      "question": "A metal cylinder hung on a spring balance reads 8.9 N in air. When completely immersed in water (d = 10,000 N/m³), the balance reads 7.9 N. What is the volume of the cylinder?",
      "options": [
        "100 cm³",
        "79 cm³",
        "89 cm³",
        "10 cm³"
      ],
      "correctIndex": 0,
      "hint1": "Buoyant force equals apparent weight loss: F_A = P_air - P_sub = 8.9 N - 7.9 N = 1.0 N.",
      "hint2": "Apply F_A = d · V => V = F_A / d = 1.0 / 10,000 m³ = 10⁻⁴ m³ = 100 cm³.",
      "explanation": "F_A = 8.9 - 7.9 = 1.0 N => V = 1.0 / 10,000 = 10⁻⁴ m³ = 100 cm³."
    }
  },
  "g7-reflection": {
    "topic": "Law of Reflection & Plane Mirrors",
    "mindset": {
      "steps": [
        "Step 1: Draw the normal line NN' perpendicular to the plane mirror surface at point of incidence I.",
        "Step 2: Identify angle of incidence i = (SI, IN) and angle of reflection i' = (IR, IN). Always remember i' = i.",
        "Step 3: The angle between incident ray and reflected ray is θ = i + i' = 2i.",
        "Step 4: Mirror rotation theorem: When the mirror rotates by an angle α, the reflected ray rotates by 2α in the same direction."
      ],
      "coreLaw": "i' = i; The reflected ray lies in the plane of incidence",
      "shortcuts": [
        "Angle between incident and reflected rays: θ = 2i",
        "Angle between incident ray and mirror surface: α = 90° - i => Angle between rays = 180° - 2α",
        "Mirror rotates by angle α => Reflected ray rotates by 2α"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Type 1: Calculating Angles of Incidence, Reflection & Ray Deviations (Core Understanding)",
        "description": "Determine angle of incidence i from glancing angle or angle between rays.",
        "formulaSummary": "i = angle(SI, NN') | i' = i | angle(SI, IR) = 2i",
        "traps": "⚠️ Problem traps: Questions often give the 'glancing angle with MIRROR SURFACE' (α = 90° - i), which students confuse with angle of incidence i."
      },
      {
        "id": "type2",
        "name": "Type 2: Rotating Mirror Problems (Application)",
        "description": "Keep incident ray fixed, rotate mirror by angle α. Find angular deviation of reflected ray.",
        "formulaSummary": "Δi' = 2α",
        "traps": "⚠️ The reflected ray rotates in the same direction as the mirror with twice the angular displacement (2α)."
      },
      {
        "id": "type3",
        "name": "Type 3: Field of View & Relative Image Speed in Plane Mirrors (Advanced)",
        "description": "Object and observer moving in front of plane mirror, find relative speed of image.",
        "formulaSummary": "Object approaches mirror with speed v => Image approaches object with relative speed 2v.",
        "traps": "⚠️ Speed of image relative to mirror is v, but relative to real object is 2v."
      }
    ],
    "workedExample": {
      "question": "A light ray SI strikes a plane mirror such that the ray makes an angle of 35° with the mirror surface. (a) Calculate the angle of incidence and angle of reflection. (b) Calculate the angle between the incident and reflected rays. (c) Keeping the incident ray fixed, if the mirror rotates by 10° clockwise, by what angle does the reflected ray rotate?",
      "thinkingAnalysis": "1) Glancing angle with mirror is 35°. The normal is perpendicular (90°), so angle of incidence i = 90° - 35° = 55°.\\n2) By law of reflection: i' = i = 55°.\\n3) Angle between rays: θ = i + i' = 55° + 55° = 110°.\\n4) By rotating mirror theorem: Δθ = 2 · 10° = 20°.",
      "solution": "1. Angles of incidence and reflection:\\n   Angle of incidence: i = 90° - 35° = 55°.\\n   Angle of reflection: i' = i = 55°.\\n2. Angle between incident and reflected rays:\\n   angle(SIR) = i + i' = 55° + 55° = 110°.\\n3. When mirror rotates by α = 10°:\\n   Reflected ray rotates by Δθ = 2 · α = 2 · 10° = 20°.",
      "examTrapWarning": "⚠️ Common mistake: Mistaking 35° as the angle of incidence (giving i' = 35°, which is WRONG). Angle of incidence is ALWAYS measured to the NORMAL line."
    },
    "practiceQuiz": {
      "question": "A light ray strikes a plane mirror at an angle of incidence of 40°. If the mirror is rotated by 15° about an axis parallel to the mirror surface (with fixed incident ray), by how much does the reflected ray rotate?",
      "options": [
        "30°",
        "15°",
        "45°",
        "60°"
      ],
      "correctIndex": 0,
      "hint1": "Apply mirror rotation theorem: Angle of rotation of reflected ray = 2 · α.",
      "hint2": "2 · 15° = 30°.",
      "explanation": "Rotation of reflected ray: Δi' = 2 · α = 2 · 15° = 30°."
    }
  },
  "g7-spherical-mirror": {
    "topic": "Concave & Convex Spherical Mirrors, Focus F & Ray Tracing",
    "mindset": {
      "steps": [
        "Step 1: Identify mirror focal length: Focal length f = R / 2. Sign convention: Concave mirror f > 0; Convex mirror f < 0.",
        "Step 2: Apply mirror formula: 1/f = 1/d + 1/d' <=> d' = (d · f) / (d - f) (with real object d > 0; real image d' > 0, virtual image d' < 0).",
        "Step 3: Linear magnification: k = -d' / d = f / (f - d) (k > 0: upright virtual image; k < 0: inverted real image).",
        "Step 4: Special principal rays: Ray parallel to axis reflects through F; Ray through center C reflects back along itself; Ray through pole O reflects symmetrically across principal axis."
      ],
      "coreLaw": "1/f = 1/d + 1/d' | k = -d' / d = h' / h | f = R / 2",
      "shortcuts": [
        "Concave mirror with real object at d = 2f (Center C): Real, inverted image of equal size (d' = 2f, k = -1)",
        "Concave mirror with object inside focus (d < f): Magnified upright virtual image (makeup mirror)",
        "Convex mirror: ALWAYS forms diminished upright virtual image (wide rear-view safety mirror)"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Type 1: Calculating Image Position d' & Magnification k (Core Understanding)",
        "description": "Apply mirror equation to find image location and nature.",
        "formulaSummary": "d' = (d · f) / (d - f) | k = -d' / d",
        "traps": "⚠️ Sign conventions: Convex mirror has negative focal length f = -R/2."
      },
      {
        "id": "type2",
        "name": "Type 2: Object and Image Separation Distance L = |d + d'| (Application)",
        "description": "Distance between object and screen on optical bench.",
        "formulaSummary": "L = d + d' (for real image on screen)",
        "traps": "⚠️ Screen only captures REAL images (d' > 0). Virtual images cannot be caught on a screen."
      }
    ],
    "workedExample": {
      "question": "An object of height h = 2.0 cm is placed 30 cm in front of a concave spherical mirror with radius of curvature R = 40 cm. (a) Calculate the focal length f. (b) Find the position and height of the image formed. (c) State whether the image is real or virtual.",
      "thinkingAnalysis": "1) Concave mirror focal length: f = +R / 2 = +40 / 2 = +20 cm.\\n2) Object distance: d = +30 cm.\\n3) Mirror equation: 1/d' = 1/f - 1/d = 1/20 - 1/30 = 1/60 => d' = +60 cm.\\n4) Magnification: k = -d' / d = -60 / 30 = -2.0.\\n5) Height of image: h' = |k| · h = 2.0 · 2.0 = 4.0 cm (inverted, real).",
      "solution": "1. Focal length:\\n   f = R / 2 = 40 / 2 = +20 cm.\\n2. Image position d':\\n   1/f = 1/d + 1/d' => d' = (d · f) / (d - f) = (30 · 20) / (30 - 20) = 600 / 10 = +60 cm.\\n3. Magnification and image height:\\n   k = -d' / d = -60 / 30 = -2.0.\\n   h' = |k| · h = 2.0 · 2.0 cm = 4.0 cm.\\n4. Nature: Since d' > 0 and k < 0, the image is REAL, INVERTED, and MAGNIFIED (twice object size).",
      "examTrapWarning": "⚠️ Trap: Forgetting negative sign for convex mirror focal length (f = -R/2)."
    },
    "practiceQuiz": {
      "question": "An object is placed 15 cm in front of a convex mirror of focal length f = -15 cm. What is the image position d'?",
      "options": [
        "-7.5 cm (Virtual image)",
        "+7.5 cm",
        "-30 cm",
        "+30 cm"
      ],
      "correctIndex": 0,
      "hint1": "Apply mirror formula: 1/d' = 1/f - 1/d with f = -15 cm and d = +15 cm.",
      "hint2": "1/d' = 1/(-15) - 1/15 = -2/15 => d' = -15 / 2 = -7.5 cm.",
      "explanation": "d' = (d · f) / (d - f) = (15 · (-15)) / (15 - (-15)) = -225 / 30 = -7.5 cm (virtual image)."
    }
  },
  "g8-lever": {
    "topic": "Levers, Rigid Body Equilibrium & Principle of Moments",
    "mindset": {
      "steps": [
        "Step 1: Identify the pivot point (fulcrum O) of the lever.",
        "Step 2: Determine perpendicular distances (lever arms d1, d2) from pivot O to the lines of action of forces F1, F2.",
        "Step 3: Apply Principle of Moments: For rotational equilibrium, total clockwise moments equal total counter-clockwise moments: Σ M_cw = Σ M_ccw <=> F1 · d1 = F2 · d2.",
        "Step 4: Mechanical advantage: F2 = F1 · (d1 / d2). Lever provides force magnification when d1 > d2 (effort arm longer than load arm)."
      ],
      "coreLaw": "Moment M = F · d | F1 · d1 = F2 · d2 (Principle of Moments)",
      "shortcuts": [
        "Class 1 Lever: Fulcrum between effort and load (scissors, seesaw, crowbar)",
        "Class 2 Lever: Load between fulcrum and effort (wheelbarrow, nutcracker, bottle opener - always force multiplying since d_effort > d_load)",
        "Class 3 Lever: Effort between fulcrum and load (fishing rod, tweezers, human arm - force sacrificing but speed/distance multiplying)"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Type 1: Applying Principle of Moments to Find Balancing Force (Core Understanding)",
        "description": "Find balancing force F2 given load F1 and moment arms d1, d2.",
        "formulaSummary": "F1 · d1 = F2 · d2 => F2 = F1 · d1 / d2",
        "traps": "⚠️ Lever arm d is the PERPENDICULAR distance from pivot to line of action of force, not the length of rod if force is inclined."
      },
      {
        "id": "type2",
        "name": "Type 2: Lever with Non-negligible Weight of Beam (Application)",
        "description": "Beam weight W_beam acts at center of gravity G (midpoint of uniform beam).",
        "formulaSummary": "F1 · d1 + W_beam · d_G = F2 · d2",
        "traps": "⚠️ Forgetting to include the moment created by the weight of the lever beam itself."
      }
    ],
    "workedExample": {
      "question": "A lever has a fulcrum at O. A load of weight P = 200 N is placed at point A, located 20 cm from O. What minimum perpendicular effort force F must be applied at point B, located 80 cm from O, to lift the load?",
      "thinkingAnalysis": "1) Pivot is at O.\\n2) Load arm d1 = OA = 20 cm = 0.2 m.\\n3) Effort arm d2 = OB = 80 cm = 0.8 m.\\n4) By Principle of Moments: F · OB = P · OA => F = P · (OA / OB) = 200 · (20 / 80) = 50 N.",
      "solution": "1. By Principle of Moments for rotational balance:\\n   M_P = M_F\\n   <=> P · OA = F · OB\\n2. Minimum effort force F at B:\\n   F = P · (OA / OB) = 200 N · (20 cm / 80 cm) = 200 · (1 / 4) = 50 N.",
      "examTrapWarning": "⚠️ Force is reduced by factor of 4 (OB = 4 OA), but by the Golden Rule of Mechanics, effort distance is increased by factor of 4."
    },
    "practiceQuiz": {
      "question": "A light uniform beam of length 1.0 m is balanced horizontally on a pivot at its center (0.5 m from each end). A mass m1 = 6 kg is hung at the left end. What mass m2 must be hung 0.3 m to the right of the pivot to maintain equilibrium?",
      "options": [
        "10 kg",
        "8 kg",
        "12 kg",
        "4 kg"
      ],
      "correctIndex": 0,
      "hint1": "Apply moment equation: m1 · g · d1 = m2 · g · d2 => m1 · d1 = m2 · d2.",
      "hint2": "m2 = m1 · d1 / d2 = 6 · 0.5 / 0.3 = 3.0 / 0.3 = 10 kg.",
      "explanation": "6 kg · 0.5 m = m2 · 0.3 m => m2 = 3.0 / 0.3 = 10 kg."
    }
  },
  "g8-inclined-plane": {
    "topic": "Inclined Plane, Friction & Mechanical Advantage",
    "mindset": {
      "steps": [
        "Step 1: Resolve weight vector P into two perpendicular components: P_parallel = P · sin α (along incline) and P_perpendicular = P · cos α (perpendicular to incline).",
        "Step 2: Normal reaction force: N = P · cos α = m · g · cos α.",
        "Step 3: Maximum static friction / kinetic friction force: F_friction = μ · N = μ · m · g · cos α.",
        "Step 4: Equation of motion along incline: F_effort - P · sin α - F_friction = m · a."
      ],
      "coreLaw": "F_ideal = P · (h / L) = P · sin α | Efficiency H = (A_useful / A_total) · 100%",
      "shortcuts": [
        "Minimum pulling force up smooth incline: F_min = P · (h / L)",
        "Minimum pulling force with friction: F = P · sin α + μ · P · cos α",
        "Mechanical efficiency: H = (P · h) / (F · L) · 100%"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Type 1: Ideal Frictionless Inclined Plane Calculations (Core Understanding)",
        "description": "Apply Golden Rule of Mechanics F = P · h / L.",
        "formulaSummary": "F · L = P · h",
        "traps": "⚠️ Incline length L is the hypotenuse, height h is the vertical side (L > h)."
      },
      {
        "id": "type2",
        "name": "Type 2: Inclined Plane with Friction & Efficiency (Application)",
        "description": "Calculate friction work and mechanical efficiency H.",
        "formulaSummary": "W_total = F · L = P · h + F_friction · L | H = P·h / (F·L)",
        "traps": "⚠️ Friction force F_friction = μ · m · g · cos α, NOT μ · m · g."
      }
    ],
    "workedExample": {
      "question": "A crate of weight P = 600 N is pulled up a smooth inclined plane of length L = 4.0 m and height h = 1.2 m at constant speed. (a) Calculate the ideal pulling force F. (b) If friction force is 30 N, what is the actual pulling force and the mechanical efficiency?",
      "thinkingAnalysis": "1) Ideal pulling force: F_ideal = P · (h / L) = 600 · (1.2 / 4.0) = 180 N.\\n2) Actual pulling force: F_actual = F_ideal + F_friction = 180 + 30 = 210 N.\\n3) Useful work: W_useful = P · h = 600 · 1.2 = 720 J.\\n4) Total work: W_total = F_actual · L = 210 · 4.0 = 840 J.\\n5) Efficiency: H = (720 / 840) · 100% = 85.7%.",
      "solution": "1. Ideal pulling force:\\n   F_ideal = P · (h / L) = 600 N · (1.2 m / 4.0 m) = 180 N.\\n2. Actual pulling force with friction:\\n   F_actual = F_ideal + F_friction = 180 N + 30 N = 210 N.\\n3. Mechanical efficiency:\\n   H = (P · h) / (F_actual · L) · 100% = (600 · 1.2) / (210 · 4.0) · 100% = (720 / 840) · 100% = 85.71%.",
      "examTrapWarning": "⚠️ Common error: Forgetting to add friction force to ideal force when computing actual effort."
    },
    "practiceQuiz": {
      "question": "A box weighing 500 N is dragged up a 5.0 m ramp onto a 1.0 m high truck bed with an effort force of 125 N. What is the efficiency of the ramp?",
      "options": [
        "80%",
        "100%",
        "75%",
        "85%"
      ],
      "correctIndex": 0,
      "hint1": "Useful work W_useful = P · h = 500 · 1 = 500 J.",
      "hint2": "Total work W_total = F · L = 125 · 5 = 625 J. Efficiency H = (500 / 625) · 100%.",
      "explanation": "H = (500 · 1.0) / (125 · 5.0) · 100% = (500 / 625) · 100% = 80%."
    }
  },
  "g8-pulley": {
    "topic": "Pulleys, Block & Tackle Systems and Mechanical Efficiency",
    "mindset": {
      "steps": [
        "Step 1: Identify pulley types: Fixed pulley (changes force direction only, no force multiplication: F = P, s = h); Movable pulley (halves effort force F = P/2, doubles pull distance s = 2h).",
        "Step 2: Block & tackle system with n movable pulleys (or n load-supporting rope strands): Ideal effort F = P / n, Rope distance s = n · h.",
        "Step 3: Golden Rule of Mechanics: No simple machine saves energy. Useful work W_useful = P · h.",
        "Step 4: Total input work W_total = F_actual · s. Efficiency H = (W_useful / W_total) · 100%."
      ],
      "coreLaw": "F_ideal = P / n | s = n · h | H = (P · h) / (F · s)",
      "shortcuts": [
        "Actual effort including pulley weight P_pulley and friction: F_actual = (P_load + P_pulley) / n + F_friction",
        "Wasted energy: W_loss = W_total - W_useful = (1 - H) · W_total",
        "Rope pulling speed: v_rope = n · v_load"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Type 1: Ideal Pulley Force and Distance Calculations (Core Understanding)",
        "description": "Apply F = P/2 and s = 2h for single movable pulley.",
        "formulaSummary": "F = P / 2 | s = 2h",
        "traps": "⚠️ Fixed pulley does NOT reduce effort force F, only movable pulley halves force."
      },
      {
        "id": "type2",
        "name": "Type 2: Pulley System Efficiency with Friction & Weight (Application)",
        "description": "Calculate system efficiency given pulley mass and rope tension.",
        "formulaSummary": "H = (P · h) / (F_actual · s)",
        "traps": "⚠️ Count only the ROPE STRANDS directly supporting the moving load."
      }
    ],
    "workedExample": {
      "question": "A worker uses a block-and-tackle system with 1 fixed and 1 movable pulley (2 supporting strands) to lift a mass m = 50 kg by a height h = 3.0 m. Take g = 10 m/s². The actual pulling force measured on the rope is F = 280 N. Calculate: (a) Useful work. (b) Rope distance pulled and total work. (c) Efficiency of the pulley system.",
      "thinkingAnalysis": "1) Load weight: P = m · g = 50 · 10 = 500 N.\\n2) Useful work: W_useful = P · h = 500 · 3 = 1500 J.\\n3) Since 1 movable pulley is used (n = 2), rope distance s = 2 · h = 6.0 m.\\n4) Total work: W_total = F · s = 280 · 6.0 = 1680 J.\\n5) Efficiency: H = (1500 / 1680) · 100% = 89.29%.",
      "solution": "1. Load weight:\\n   P = m · g = 50 kg · 10 m/s² = 500 N.\\n2. Useful work:\\n   W_useful = P · h = 500 N · 3.0 m = 1500 J.\\n3. Rope pull distance and total work:\\n   s = 2 · h = 2 · 3.0 m = 6.0 m.\\n   W_total = F · s = 280 N · 6.0 m = 1680 J.\\n4. Efficiency:\\n   H = (W_useful / W_total) · 100% = (1500 / 1680) · 100% = 89.29%.",
      "examTrapWarning": "⚠️ Exam trap: Forgetting to double height (s = 2h) when computing total work for a movable pulley."
    },
    "practiceQuiz": {
      "question": "An ideal movable pulley (frictionless and massless) lifts a load P = 400 N by 4.0 m. What is the work done?",
      "options": [
        "1600 J",
        "800 J",
        "3200 J",
        "400 J"
      ],
      "correctIndex": 0,
      "hint1": "By Golden Rule of Mechanics, work done remains constant: W = P · h.",
      "hint2": "Effort F = 200 N, distance s = 8 m => W = F · s = 200 · 8 = 1600 J.",
      "explanation": "W = P · h = 400 · 4 = 1600 J."
    }
  },
  "g9-circuit": {
    "topic": "Ohm's Law, Series & Parallel Resistor Networks",
    "mindset": {
      "steps": [
        "Step 1: Identify circuit wiring topology: Series (same current I_total = I1 = I2) or Parallel (same voltage U_total = U1 = U2).",
        "Step 2: Equivalent resistance: Series R_eq = R1 + R2; Parallel 1/R_eq = 1/R1 + 1/R2 <=> R_eq = (R1·R2) / (R1 + R2).",
        "Step 3: Ohm's Law for entire circuit and individual branches: I = U / R <=> U = I · R <=> R = U / I.",
        "Step 4: Electrical power and Joule heating: P = U · I = I² · R = U² / R; Heat energy Q = I² · R · t (Joule's Law)."
      ],
      "coreLaw": "I = U / R | R_series = R1 + R2 | 1/R_parallel = 1/R1 + 1/R2",
      "shortcuts": [
        "Two equal resistors R in parallel: R_eq = R / 2; n equal resistors: R_eq = R / n",
        "Voltage divider in series: U1 / U2 = R1 / R2 (Voltage divides proportionally to resistance)",
        "Current divider in parallel: I1 / I2 = R2 / R1 (Current divides inversely to resistance)"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Type 1: Calculating Equivalent Resistance R_eq, Current I and Voltage U (Core Understanding)",
        "description": "Analyze combined series-parallel circuits to determine ammeter and voltmeter readings.",
        "formulaSummary": "I_main = U_total / R_eq",
        "traps": "⚠️ Ideal ammeter has zero resistance (short circuit R_A = 0); Ideal voltmeter has infinite resistance (open circuit R_V = ∞)."
      },
      {
        "id": "type2",
        "name": "Type 2: Power Dissipation & Joule Heating (Application)",
        "description": "Calculate power consumed across branches and bulb brightness.",
        "formulaSummary": "P = I² · R = U² / R",
        "traps": "⚠️ Bulb brightness depends strictly on ACTUAL CONSUMED POWER P, not rated power label."
      }
    ],
    "workedExample": {
      "question": "Given a circuit with supply voltage U = 12 V connected to R1 = 6 Ω in parallel with R2 = 12 Ω, which is then connected in series with R3 = 4 Ω. (a) Calculate the total equivalent resistance of the circuit. (b) Find the main circuit current and the current flowing through R1.",
      "thinkingAnalysis": "1) Parallel combination of R1 and R2: R12 = (R1 · R2) / (R1 + R2) = (6 · 12) / (6 + 12) = 72 / 18 = 4 Ω.\\n2) Total equivalent resistance: R_eq = R12 + R3 = 4 + 4 = 8 Ω.\\n3) Main current: I_main = U / R_eq = 12 / 8 = 1.5 A.\\n4) Voltage across parallel branch: U12 = I_main · R12 = 1.5 · 4 = 6.0 V.\\n5) Current through R1: I1 = U12 / R1 = 6.0 / 6 = 1.0 A.",
      "solution": "1. Equivalent resistance of parallel branch R12:\\n   R12 = (R1 · R2) / (R1 + R2) = (6 · 12) / (6 + 12) = 4.0 Ω.\\n2. Total circuit resistance:\\n   R_eq = R12 + R3 = 4.0 + 4.0 = 8.0 Ω.\\n3. Main circuit current:\\n   I_main = U / R_eq = 12 V / 8.0 Ω = 1.5 A.\\n4. Current through resistor R1:\\n   U12 = I_main · R12 = 1.5 A · 4.0 Ω = 6.0 V.\\n   I1 = U12 / R1 = 6.0 V / 6.0 Ω = 1.0 A.",
      "examTrapWarning": "⚠️ Common error: Calculating I1 by dividing total voltage 12 V by R1 (giving 2.0 A, which is wrong because R3 creates a 6 V potential drop!)."
    },
    "practiceQuiz": {
      "question": "Two resistors R1 = 10 Ω and R2 = 40 Ω are connected in parallel across a 24 V power supply. What is the total power consumed by the circuit?",
      "options": [
        "72 W",
        "57.6 W",
        "14.4 W",
        "120 W"
      ],
      "correctIndex": 0,
      "hint1": "Calculate parallel equivalent resistance: R_eq = (10 · 40) / (10 + 40) = 400 / 50 = 8 Ω.",
      "hint2": "Total power P = U² / R_eq = 24² / 8 = 576 / 8 = 72 W.",
      "explanation": "R_eq = 8 Ω => P = 24² / 8 = 72 W (or P = U²/R1 + U²/R2 = 24²/10 + 24²/40 = 57.6 + 14.4 = 72 W)."
    }
  },
  "g10-free-fall": {
    "topic": "Free Fall Kinematics & Experimental Determination of g",
    "mindset": {
      "steps": [
        "Step 1: Understand Free Fall: Uniformly accelerated linear motion under gravity with zero initial velocity (v_0 = 0, a = g).",
        "Step 2: Kinematic equations: Velocity v(t) = g · t; Fall distance s(t) = h = (1/2) · g · t²; Time-independent relation: v² = 2 · g · h.",
        "Step 3: Distance fallen in the n-th second: Δs_n = s(n) - s(n - 1) = (1/2) · g · (2n - 1).",
        "Step 4: Photogate timer measurement of g: Two photogates separated by height h record transit time t => g = 2h / t²."
      ],
      "coreLaw": "h = (1/2) · g · t² | v = g · t | v² = 2 · g · h",
      "shortcuts": [
        "Time of fall from height h: t = √(2h / g)",
        "Impact velocity with ground: v_impact = √(2 · g · h)",
        "Ratio of distances in consecutive 1-second intervals: 1 : 3 : 5 : 7 : ... (Galileo's odd number law)"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Type 1: Calculating Fall Time t, Height h & Impact Speed v (Core Understanding)",
        "description": "Direct application of free fall formulas with g = 9.8 m/s² or 10 m/s².",
        "formulaSummary": "t = √(2h/g) | v = √(2gh)",
        "traps": "⚠️ Check whether initial velocity is zero (v_0 = 0). If thrown downwards with v_0 > 0, use h = v_0·t + 0.5gt²."
      },
      {
        "id": "type2",
        "name": "Type 2: Distance Fallen in the Last Second / n-th Second (Application)",
        "description": "Calculate distance during specific second interval Δt = 1 s.",
        "formulaSummary": "Δh_last = h_total - h(t - 1) | Δs_n = 0.5·g·(2n - 1)",
        "traps": "⚠️ Distinguish carefully between 'distance in n seconds' (total h = 0.5gn²) and 'distance in the n-th second' (Δs_n)."
      }
    ],
    "workedExample": {
      "question": "An object is released from rest from a height h = 45 m. Take g = 10 m/s². (a) Calculate the time taken for the object to reach the ground. (b) Find the impact velocity. (c) What is the distance fallen in the final second before impact?",
      "thinkingAnalysis": "1) Fall time: t = √(2h / g) = √(2 · 45 / 10) = √9 = 3.0 s.\\n2) Impact velocity: v = g · t = 10 · 3.0 = 30 m/s.\\n3) Distance fallen in first 2 seconds: h(2) = 0.5 · 10 · 2² = 20 m.\\n4) Distance in final (3rd) second: Δh_3 = h_total - h(2) = 45 - 20 = 25 m.",
      "solution": "1. Time to reach ground:\\n   h = (1/2) · g · t² => t = √(2 · 45 / 10) = 3.0 s.\\n2. Velocity at ground impact:\\n   v = g · t = 10 m/s² · 3.0 s = 30 m/s.\\n3. Distance fallen in the 3rd (last) second:\\n   h(2 s) = (1/2) · 10 · 2² = 20 m.\\n   Δh_last = h(3 s) - h(2 s) = 45 m - 20 m = 25 m.",
      "examTrapWarning": "⚠️ Exam trap: Using Δh = v·1s = 30 m (WRONG because velocity is continuously increasing during the last second)."
    },
    "practiceQuiz": {
      "question": "An apple falls from a tree branch and hits the ground after 1.4 seconds. Taking g = 10 m/s², what is the height of the branch?",
      "options": [
        "9.8 m",
        "14.0 m",
        "4.9 m",
        "19.6 m"
      ],
      "correctIndex": 0,
      "hint1": "Apply h = (1/2) · g · t².",
      "hint2": "h = 0.5 · 10 · (1.4)² = 5 · 1.96 = 9.8 m.",
      "explanation": "h = 0.5 · 10 · 1.4² = 5 · 1.96 = 9.8 m."
    }
  },
  "g10-projectile": {
    "topic": "Horizontal & Angled Projectile Motion - Parabolic Trajectories",
    "mindset": {
      "steps": [
        "Step 1: Coordinate method - Resolve 2D motion into two independent 1D motions:\\n   - Horizontal Ox: No forces => Uniform motion with constant velocity v_x = v_0 · cos θ; x(t) = (v_0 · cos θ) · t.\\n   - Vertical Oy (upward): Gravity acts => Uniformly accelerated motion with a_y = -g; v_y(t) = v_0 · sin θ - g · t; y(t) = (v_0 · sin θ) · t - (1/2) · g · t².",
        "Step 2: Time to reach peak (when v_y = 0): t_peak = (v_0 · sin θ) / g.",
        "Step 3: Maximum height: H_max = (v_0² · sin² θ) / (2g).",
        "Step 4: Total flight time: T = 2 · t_peak = (2 · v_0 · sin θ) / g. Range: R = v_x · T = (v_0² · sin 2θ) / g (Max range at θ = 45°: R_max = v_0² / g)."
      ],
      "coreLaw": "x = (v_0 cos θ)·t | y = (v_0 sin θ)·t - 0.5gt² | R = (v_0² sin 2θ) / g",
      "shortcuts": [
        "Parabolic trajectory equation: y = (tan θ) · x - [g / (2 v_0² cos² θ)] · x²",
        "Horizontal projection (θ = 0°): Fall time t = √(2h/g); Range L = v_0 · √(2h/g)",
        "Complementary launch angles (θ1 + θ2 = 90°) give the EXACT SAME RANGE R"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Type 1: Horizontal Launch from Height h (Core Understanding)",
        "description": "Calculate fall time t, range L and impact velocity v = √(v_0² + 2gh).",
        "formulaSummary": "t = √(2h/g) | L = v_0 · √(2h/g)",
        "traps": "⚠️ Fall time of horizontal projection does NOT depend on horizontal launch speed v_0, only on height h."
      },
      {
        "id": "type2",
        "name": "Type 2: Angled Projectile Launch - Max Height & Range (Application)",
        "description": "Calculate H_max and Range R given launch speed v_0 and angle θ.",
        "formulaSummary": "H_max = (v_0 sin θ)² / (2g) | R = (v_0² sin 2θ) / g",
        "traps": "⚠️ Distinguish sin² θ = (sin θ)² in H_max from sin(2θ) in Range R."
      }
    ],
    "workedExample": {
      "question": "A football is kicked from ground level with an initial velocity v_0 = 20 m/s at an angle θ = 30° to the horizontal. Take g = 10 m/s². Neglecting air resistance, calculate: (a) The maximum height H_max reached. (b) The total flight range R when it hits the ground.",
      "thinkingAnalysis": "1) Velocity components: v_0x = 20 · cos(30°) = 10√3 m/s; v_0y = 20 · sin(30°) = 10 m/s.\\n2) Maximum height: H_max = v_0y² / (2g) = 10² / (2 · 10) = 100 / 20 = 5.0 m.\\n3) Flight time: T = 2 · v_0y / g = 2 · 10 / 10 = 2.0 s.\\n4) Range: R = v_0x · T = 10√3 · 2.0 = 20√3 ≈ 34.64 m.",
      "solution": "1. Maximum height H_max:\\n   H_max = (v_0 · sin θ)² / (2g) = (20 · sin 30°)² / (2 · 10) = 10² / 20 = 5.0 m.\\n2. Total range R:\\n   R = (v_0² · sin 2θ) / g = (20² · sin 60°) / 10 = (400 · √3 / 2) / 10 = 20√3 ≈ 34.64 m.",
      "examTrapWarning": "⚠️ Exam trap: Using 30° instead of 2θ = 60° when evaluating sin(2θ) in range formula."
    },
    "practiceQuiz": {
      "question": "From a height h = 20 m, an object is thrown horizontally with v_0 = 15 m/s. Take g = 10 m/s². What is the horizontal range when it hits the ground?",
      "options": [
        "30 m",
        "20 m",
        "15 m",
        "45 m"
      ],
      "correctIndex": 0,
      "hint1": "Fall time: t = √(2h / g) = √(2 · 20 / 10) = √4 = 2.0 s.",
      "hint2": "Range L = v_0 · t = 15 · 2.0 = 30 m.",
      "explanation": "t = √(2 · 20 / 10) = 2 s => Range L = v_0 · t = 15 · 2 = 30 m."
    }
  },
  "g10-momentum": {
    "topic": "Conservation of Momentum, Impulse and Collision Dynamics",
    "mindset": {
      "steps": [
        "Step 1: Momentum vector: p = m · v (Units: kg·m/s or N·s).",
        "Step 2: Impulse-Momentum Theorem: Δp = F_net · Δt.",
        "Step 3: Law of Conservation of Linear Momentum for isolated systems: Σ p_before = Σ p_after <=> m1 · v1 + m2 · v2 = m1 · v1' + m2 · v2'.",
        "Step 4: Classification of collisions:\\n   - Perfectly Elastic collision: Both momentum AND kinetic energy are conserved (coefficient of restitution e = 1).\\n   - Inelastic / Plastic collision: Objects stick together and move with common velocity V (momentum conserved, mechanical energy converted to heat Q)."
      ],
      "coreLaw": "m1·v1 + m2·v2 = (m1 + m2)·V_common | F · Δt = Δp",
      "shortcuts": [
        "Inelastic sticking collision: V_common = (m1·v1 + m2·v2) / (m1 + m2)",
        "Kinetic energy dissipated in inelastic collision: Q = ΔE_k = (1/2) · [m1·m2 / (m1 + m2)] · (v1 - v2)²",
        "Head-on elastic collision with target at rest (v2 = 0): v1' = (m1 - m2)·v1 / (m1 + m2); v2' = 2m1·v1 / (m1 + m2) (If m1 = m2: v1'=0, v2'=v1 - Newton's Cradle!)"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Type 1: Inelastic Collisions & Recoil Propulsion (Core Understanding)",
        "description": "Objects stick together or gun recoil after firing a bullet.",
        "formulaSummary": "V_common = (m1·v1 + m2·v2) / (m1 + m2)",
        "traps": "⚠️ Velocity is a VECTOR quantity. Choose a positive direction and assign negative signs (-) for opposite motion."
      },
      {
        "id": "type2",
        "name": "Type 2: Perfectly Elastic Head-on Collisions (Application / Advanced)",
        "description": "System conserves both momentum and kinetic energy.",
        "formulaSummary": "v1 - v2 = v2' - v1' (Relative velocity reverses direction)",
        "traps": "⚠️ Do not apply conservation of kinetic energy unless collision is explicitly stated as elastic."
      }
    ],
    "workedExample": {
      "question": "A bullet of mass m = 20 g moving horizontally with velocity v = 400 m/s embeds into a sandbag of mass M = 3.98 kg initially resting on a frictionless surface. What is the common velocity V of the sandbag with bullet immediately after impact?",
      "thinkingAnalysis": "1) Perfectly inelastic collision (bullet lodges inside sandbag).\\n2) System (bullet + sandbag) is isolated horizontally.\\n3) Conservation of momentum: m · v = (m + M) · V => V = (m · v) / (m + M).\\n4) Unit conversion: m = 20 g = 0.02 kg; M = 3.98 kg => m + M = 4.0 kg.",
      "solution": "1. Convert units: m = 20 g = 0.02 kg.\\n2. Conservation of linear momentum:\\n   p_before = p_after\\n   <=> m · v + M · 0 = (m + M) · V\\n3. Common velocity V:\\n   V = (m · v) / (m + M) = (0.02 kg · 400 m/s) / (0.02 + 3.98) = 8.0 / 4.0 = 2.0 m/s.",
      "examTrapWarning": "⚠️ Forgetting to convert 20 g into kg (0.02 kg) will make calculation wrong by a factor of 1000x."
    },
    "practiceQuiz": {
      "question": "A cannon of mass M = 1000 kg fires a cannonball of mass m = 10 kg horizontally with speed v = 500 m/s. What is the recoil velocity of the cannon?",
      "options": [
        "-5.0 m/s (recoil)",
        "50 m/s",
        "5.0 m/s (forward)",
        "-0.5 m/s"
      ],
      "correctIndex": 0,
      "hint1": "Before firing, system is at rest => Total initial momentum is zero.",
      "hint2": "0 = M · V_recoil + m · v => V_recoil = -(m · v) / M.",
      "explanation": "V_recoil = -(10 · 500) / 1000 = -5.0 m/s (negative sign indicates recoil opposite to bullet direction)."
    }
  },
  "g10-newton2": {
    "topic": "Newton's Second Law of Motion, Friction & Particle Dynamics",
    "mindset": {
      "steps": [
        "Step 1: Free-Body Diagram (FBD):\\n   - Identify all external forces: Weight P, Normal reaction N, Pulling force F, Friction F_friction, Tension T.\\n   - Write Newton's 2nd Law vector equation: m · a = Σ F = P + N + F + F_friction.",
        "Step 2: Choose Cartesian coordinate axes Oxy (Ox along acceleration, Oy perpendicular to surface).",
        "Step 3: Project onto axes:\\n   - Oy (no vertical motion): N - P_y = 0 => N = P_y.\\n   - Kinetic friction: F_friction = μ · N.\\n   - Ox: F_x - F_friction = m · a => a = (F_x - F_friction) / m.",
        "Step 4: Combine with kinematics equations: v = v_0 + at; s = v_0·t + 0.5at²; v² - v_0² = 2as."
      ],
      "coreLaw": "a = F_net / m = (F_pull - F_friction) / m | F_friction = μ · N",
      "shortcuts": [
        "Pulling force angled upward at angle α: N = P - F · sin α => F_friction = μ · (mg - F sin α)",
        "Braking distance to full stop (v = 0): s_stop = v_0² / (2 · μ · g)",
        "Braking time: t_stop = v_0 / (μ · g)"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Type 1: Motion on Horizontal Rough Surface (Core Understanding)",
        "description": "Find acceleration a and distance s with horizontal pulling force.",
        "formulaSummary": "a = (F - μ · m · g) / m",
        "traps": "⚠️ Motion condition: Applied force F must overcome maximum static friction F > F_friction."
      },
      {
        "id": "type2",
        "name": "Type 2: Inclined Pulling Force at Angle α (Application)",
        "description": "Resolve force F into F·cos α and F·sin α affecting normal reaction N.",
        "formulaSummary": "N = m·g - F·sin α | a = (F·cos α - μ·N) / m",
        "traps": "⚠️ Upward pull REDUCES normal force N (N = mg - F sin α); Downward push INCREASES normal force N (N = mg + F sin α)."
      }
    ],
    "workedExample": {
      "question": "A car of mass m = 1200 kg is traveling at speed v_0 = 72 km/h when the driver slams the emergency brakes. The friction coefficient between tires and dry road is μ = 0.8. Take g = 10 m/s². Calculate: (a) The braking deceleration. (b) The safe stopping distance and time taken to come to a complete stop.",
      "thinkingAnalysis": "1) Unit conversion: v_0 = 72 km/h = 72 / 3.6 = 20 m/s.\\n2) Retarding friction force: F_friction = μ · m · g.\\n3) Deceleration: -F_friction = m · a => a = -μ · g = -0.8 · 10 = -8.0 m/s².\\n4) Stopping distance: s = (0 - v_0²) / (2a) = (-400) / (-16) = 25 m.\\n5) Braking time: t = (0 - v_0) / a = (-20) / (-8) = 2.5 s.",
      "solution": "1. Convert units:\\n   v_0 = 72 km/h = 20 m/s; final speed v = 0.\\n2. Braking deceleration:\\n   a = -μ · g = -0.8 · 10 m/s² = -8.0 m/s².\\n3. Safe stopping distance:\\n   v² - v_0² = 2 · a · s\\n   => s = (0² - 20²) / (2 · (-8.0)) = -400 / -16 = 25.0 m.\\n4. Stopping duration:\\n   t = (v - v_0) / a = (0 - 20) / (-8.0) = 2.5 seconds.",
      "examTrapWarning": "⚠️ Unit conversion trap: Forgetting to convert 72 km/h to 20 m/s will cause massive calculation errors."
    },
    "practiceQuiz": {
      "question": "A force F = 30 N acts on a mass m = 5 kg initially at rest on a floor with friction coefficient μ = 0.2 (g = 10 m/s²). What is the speed of the mass after t = 4 s?",
      "options": [
        "16 m/s",
        "24 m/s",
        "8 m/s",
        "12 m/s"
      ],
      "correctIndex": 0,
      "hint1": "Calculate friction force F_friction = μ · m · g = 0.2 · 5 · 10 = 10 N.",
      "hint2": "Acceleration a = (30 - 10) / 5 = 4 m/s². Speed v = a · t = 4 · 4 = 16 m/s.",
      "explanation": "a = (30 - 10) / 5 = 4 m/s² => v = v_0 + at = 0 + 4 · 4 = 16 m/s."
    }
  },
  "g10-circular-motion": {
    "topic": "Uniform Circular Motion, Centripetal Acceleration & Centripetal Force",
    "mindset": {
      "steps": [
        "Step 1: Kinematics of uniform circular motion:\\n   - Period T (time for 1 revolution): T = 2π / ω = 1 / f (s).\\n   - Frequency f (revolutions per second): f = 1 / T = ω / 2π (Hz or rev/s).\\n   - Angular speed ω (rad/s), Linear speed v (m/s): v = ω · r.",
        "Step 2: Centripetal acceleration: Directed toward center of circular path, perpendicular to instantaneous velocity: a_c = v² / r = ω² · r = (4π² / T²) · r.",
        "Step 3: Centripetal force: Resultant net force acting on the body that produces centripetal acceleration: F_c = m · a_c = m · (v² / r) = m · ω² · r.",
        "Step 4: Physical manifestations:\\n   - Satellite orbiting Earth: Gravitational force provides centripetal force (F_grav = F_c).\\n   - Banked curve without friction: Horizontal normal component N_x = N · sin θ provides centripetal force.\\n   - Conical pendulum / String whirl: String tension component T · sin θ provides centripetal force."
      ],
      "coreLaw": "F_c = m · (v² / r) = m · ω² · r | v = ω · r | a_c = v² / r",
      "shortcuts": [
        "Orbital satellite velocity: v = √(G·M / r)",
        "Optimum banking angle without friction: tan θ = v² / (g · r)",
        "Tension at highest point of vertical circular loop: T_top = m · (v_top² / r) - mg (Condition to not fall: v_top ≥ √(gr))",
        "Tension at lowest point: T_bottom = m · (v_bottom² / r) + mg"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Type 1: Relationships between Period T, Frequency f, Angular Speed ω and Linear Speed v",
        "description": "Interconversion between circular kinematics quantities.",
        "formulaSummary": "v = ω · r = (2π / T) · r = 2π · f · r",
        "traps": "⚠️ Convert radius r from cm to METRES (m), convert rotational speed from rpm (rev/min) to rev/s (divide by 60)."
      },
      {
        "id": "type2",
        "name": "Type 2: Vehicle Crossing Convex / Concave Bridges (Application)",
        "description": "Calculate normal reaction force N on bridge of radius R.",
        "formulaSummary": "Convex bridge: N = m(g - v²/R) | Concave bridge: N = m(g + v²/R)",
        "traps": "⚠️ On a convex bridge, if vehicle exceeds speed v ≥ √(gR), it loses contact with road (N = 0, becomes airborne)."
      }
    ],
    "workedExample": {
      "question": "A car of mass m = 1500 kg drives over the crest of a convex circular bridge of radius R = 40 m at a constant speed v = 36 km/h. Take g = 10 m/s². (a) Calculate the normal force exerted by the bridge on the car at the highest point. (b) What is the minimum speed for the car to lose contact with the road at the crest?",
      "thinkingAnalysis": "1) Convert speed: v = 36 km/h = 10 m/s.\\n2) At crest of convex bridge, weight acts downward, normal force upward: P - N = F_c = m · (v² / R) => N = m · (g - v² / R).\\n3) N = 1500 · (10 - 10² / 40) = 1500 · (10 - 2.5) = 1500 · 7.5 = 11,250 N.\\n4) Loss of contact (N = 0): v_launch = √(g · R) = √(10 · 40) = 20 m/s = 72 km/h.",
      "solution": "1. Convert units: v = 36 km/h = 10 m/s.\\n2. Normal force at crest:\\n   P - N = m · (v² / R)\\n   => N = m · [g - (v² / R)] = 1500 kg · [10 - (10² / 40)] = 11,250 N (11.25 kN).\\n3. Maximum speed before launching off road (N = 0):\\n   v_max = √(g · R) = √(10 · 40) = 20 m/s = 72 km/h.",
      "examTrapWarning": "⚠️ Normal force on convex bridge is always LESS than gravity weight (N < mg), producing a feeling of apparent weightlessness."
    },
    "practiceQuiz": {
      "question": "A disc of radius r = 20 cm rotates uniformly at 120 rpm. What is the linear speed of a point on the outer edge of the disc?",
      "options": [
        "2.51 m/s (0.8π)",
        "1.26 m/s",
        "5.02 m/s",
        "0.40 m/s"
      ],
      "correctIndex": 0,
      "hint1": "Convert 120 rpm to frequency: f = 120 / 60 = 2 Hz => Angular speed ω = 2π · f = 4π rad/s.",
      "hint2": "Linear speed v = ω · r = 4π · 0.20 m = 0.8π ≈ 2.513 m/s.",
      "explanation": "f = 2 Hz => ω = 4π rad/s. v = ω · r = 4π · 0.2 = 0.8π ≈ 2.51 m/s."
    }
  },
  "g10-vertical-spring": {
    "topic": "Vertical Spring Oscillators, Equilibrium Extension & Extreme Elastic Forces",
    "mindset": {
      "steps": [
        "Step 1: Equilibrium extension due to gravity: Δl_0 = (m · g) / k.",
        "Step 2: Natural period of vertical spring oscillator: T = 2π √(m / k) = 2π √(Δl_0 / g).",
        "Step 3: Maximum and minimum lengths during oscillation with amplitude A (Ox pointing downward, origin at equilibrium):\\n   - Equilibrium length: l_eq = l_0 + Δl_0.\\n   - Maximum length: l_max = l_0 + Δl_0 + A.\\n   - Minimum length: l_min = l_0 + Δl_0 - A.",
        "Step 4: Elastic forces in vertical spring:\\n   - Maximum elastic force (at lowest position x = +A): F_elastic_max = k · (Δl_0 + A).\\n   - Minimum elastic force:\\n     + If A ≤ Δl_0 (spring remains stretched throughout): F_elastic_min = k · (Δl_0 - A) > 0 at highest point x = -A.\\n     + If A > Δl_0 (spring compresses in upper path): F_elastic_min = 0 at unstretched position x = -Δl_0."
      ],
      "coreLaw": "Δl_0 = (m · g) / k | T = 2π √(Δl_0 / g) | F_elastic_max = k · (Δl_0 + A)",
      "shortcuts": [
        "Compression duration per cycle (when A > Δl_0): t_comp = (2 · α / 360°) · T with cos α = Δl_0 / A",
        "Extension duration per cycle: t_ext = T - t_comp",
        "Restoring force: F_restoring = -k · x (always points toward equilibrium, max value F_max = k · A)"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Type 1: Calculating Equilibrium Extension Δl0 & Period T (Core Understanding)",
        "description": "Apply Δl0 = mg/k and T = 2π√(Δl0/g).",
        "formulaSummary": "Δl0 = mg / k | T = 2π√(Δl0 / g)",
        "traps": "⚠️ Convert Δl0 from cm to METRES (m) when substituting into T = 2π√(Δl0/g)."
      },
      {
        "id": "type2",
        "name": "Type 2: Finding Extreme Elastic Forces F_max and F_min (Advanced Solving)",
        "description": "Compare amplitude A with equilibrium extension Δl0 to determine F_min.",
        "formulaSummary": "F_max = k(Δl0 + A) | F_min = k(Δl0 - A) [if A ≤ Δl0] or 0 [if A > Δl0]",
        "traps": "⚠️ Many students write F_min = k(Δl0 - A) even when A > Δl0, yielding a negative force (WRONG, because when spring passes unstretched point, elastic force is zero)."
      }
    ],
    "workedExample": {
      "question": "A vertical spring oscillator has spring constant k = 100 N/m and suspended mass m = 250 g. Take g = 10 m/s² and π² = 10. The mass is pulled down 5 cm from equilibrium and released from rest to oscillate. Calculate: (a) Equilibrium extension Δl0. (b) Period T. (c) Maximum and minimum elastic forces during oscillation.",
      "thinkingAnalysis": "1) Convert units: m = 0.25 kg; A = 0.05 m.\\n2) Equilibrium extension: Δl0 = mg / k = (0.25 · 10) / 100 = 0.025 m = 2.5 cm.\\n3) Period: T = 2π √(m/k) = 2π √(0.25 / 100) = 0.1π ≈ 0.314 s.\\n4) Compare: A = 5 cm > Δl0 = 2.5 cm => Spring undergoes compression in upper part of path.\\n5) Max elastic force: F_max = k · (Δl0 + A) = 100 · (0.025 + 0.05) = 7.5 N.\\n6) Min elastic force: Since A > Δl0, F_min = 0 (at unstretched natural position).",
      "solution": "1. Equilibrium extension:\\n   Δl0 = (m · g) / k = (0.25 kg · 10 m/s²) / 100 N/m = 0.025 m = 2.5 cm.\\n2. Oscillation period:\\n   T = 2π · √(0.25 / 100) = 0.314 s.\\n3. Maximum elastic force:\\n   F_max = k · (Δl0 + A) = 100 · (0.025 + 0.05) = 7.5 N.\\n4. Minimum elastic force:\\n   Because A = 5.0 cm > Δl0 = 2.5 cm, the spring passes its unstretched natural length => F_min = 0 N.",
      "examTrapWarning": "⚠️ Exam trap: Evaluating F_min = k(Δl0 - A) = 100(0.025 - 0.05) = -2.5 N is completely WRONG. The magnitude of spring force cannot be negative; its minimum is 0 N."
    },
    "practiceQuiz": {
      "question": "A vertical spring oscillator oscillates with amplitude A = 2 cm. At equilibrium, the spring is stretched by Δl0 = 4 cm. What is the ratio of maximum to minimum elastic force F_max / F_min?",
      "options": [
        "3",
        "2",
        "4",
        "1.5"
      ],
      "correctIndex": 0,
      "hint1": "Since A = 2 cm < Δl0 = 4 cm, the spring is always stretched: F_max = k(Δl0 + A) and F_min = k(Δl0 - A).",
      "hint2": "F_max / F_min = (Δl0 + A) / (Δl0 - A) = (4 + 2) / (4 - 2) = 6 / 2 = 3.",
      "explanation": "F_max / F_min = (4 + 2) / (4 - 2) = 6 / 2 = 3."
    }
  },
  "g11-lens": {
    "topic": "Convex & Concave Thin Lenses, Optical Bench & Lens Formula",
    "mindset": {
      "steps": [
        "Step 1: Sign conventions: Convex lens f > 0; Concave lens f < 0; Real object d > 0; Real image d' > 0 (behind lens), Virtual image d' < 0 (in front of lens).",
        "Step 2: Thin lens equation: 1/f = 1/d + 1/d' <=> d' = (d · f) / (d - f) <=> d = (d' · f) / (d' - f).",
        "Step 3: Linear magnification: k = -d' / d = f / (f - d) = (f - d') / f (k > 0: upright virtual image; k < 0: inverted real image).",
        "Step 4: Distance between object and screen on optical bench: L = d + d' (For real image on screen: L_min = 4f at d = d' = 2f)."
      ],
      "coreLaw": "1/f = 1/d + 1/d' | k = -d' / d | D = 1 / f (Dioptre)",
      "shortcuts": [
        "Silbermann method (1:1 real image): d = d' = 2f => Screen distance L = 4f, k = -1",
        "Bessel method: Displace lens by distance a between two sharp image positions on fixed screen L: f = (L² - a²) / (4L)",
        "Image size geometric mean: h = √(h1 · h2)"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Type 1: Calculating Image Distance d', Magnification k and Nature (Core Understanding)",
        "description": "Apply thin lens formula to find image position and size.",
        "formulaSummary": "d' = (d · f) / (d - f) | k = -d' / d",
        "traps": "⚠️ Concave lens has negative focal length f < 0 and ALWAYS forms upright, diminished virtual images."
      },
      {
        "id": "type2",
        "name": "Type 2: Object-Screen Fixed Distance L & Bessel Method (Advanced Practical)",
        "description": "Determine lens focal length using two image positions on a screen.",
        "formulaSummary": "f = (L² - a²) / (4L) | L ≥ 4f",
        "traps": "⚠️ To form a real image on a screen, the object-screen distance L must satisfy L ≥ 4f."
      }
    ],
    "workedExample": {
      "question": "An illuminated object AB of height 2.0 cm is placed 30 cm in front of a converging convex lens of focal length f = 20 cm. (a) Determine the position, nature, and height of the image formed. (b) Find the distance between the object and the image.",
      "thinkingAnalysis": "1) Convex lens: f = +20 cm, d = +30 cm.\\n2) Image distance: d' = (d · f) / (d - f) = (30 · 20) / (30 - 20) = 600 / 10 = +60 cm.\\n3) Magnification: k = -d' / d = -60 / 30 = -2.0.\\n4) Height: h' = |k| · h = 2.0 · 2.0 = 4.0 cm.\\n5) Object-image separation: L = d + d' = 30 + 60 = 90 cm.",
      "solution": "1. Position of image d':\\n   d' = (d · f) / (d - f) = (30 · 20) / (30 - 20) = +60 cm.\\n2. Magnification and image height:\\n   k = -d' / d = -60 / 30 = -2.0.\\n   h' = |k| · h = 2.0 · 2.0 cm = 4.0 cm.\\n3. Nature: REAL, INVERTED image, twice object size (h' = 4.0 cm).\\n4. Distance between object and image:\\n   L = d + d' = 30 cm + 60 cm = 90 cm.",
      "examTrapWarning": "⚠️ Do not forget negative sign in formula k = -d'/d."
    },
    "practiceQuiz": {
      "question": "A converging lens of focal length f = 15 cm forms a real image on a screen that is 3 times the size of the object (|k| = 3). What is the object distance d?",
      "options": [
        "20 cm",
        "45 cm",
        "60 cm",
        "10 cm"
      ],
      "correctIndex": 0,
      "hint1": "For a real image, k = -3. Apply k = f / (f - d).",
      "hint2": "-3 = 15 / (15 - d) => -3(15 - d) = 15 => -45 + 3d = 15 => 3d = 60 => d = 20 cm.",
      "explanation": "k = -d'/d = -3 => d' = 3d. 1/15 = 1/d + 1/3d = 4/3d => 3d = 60 => d = 20 cm."
    }
  },
  "g11-faraday": {
    "topic": "Electromagnetic Induction, Faraday's Law & Lenz's Law",
    "mindset": {
      "steps": [
        "Step 1: Magnetic flux through N-turn coil of area S: Φ = N · B · S · cos α (where α is angle between magnetic field vector B and normal vector n to coil plane).",
        "Step 2: Electromagnetic induction occurs ONLY when magnetic flux changes over time (ΔΦ ≠ 0).",
        "Step 3: Induced EMF magnitude (Faraday's Law): e_ind = -N · (ΔΦ / Δt). Magnitude: |e_ind| = N · |ΔΦ / Δt|.",
        "Step 4: Direction of induced current (Lenz's Law):\\n   - Induced magnetic field B_ind OPPOSES the change in original magnetic flux.\\n   - Flux INCREASING (ΔΦ > 0): B_ind opposes original B.\\n   - Flux DECREASING (ΔΦ < 0): B_ind reinforces original B.\\n   - Right-Hand Grip Rule: Thumb along B_ind, curled fingers indicate induced current I_ind."
      ],
      "coreLaw": "Φ = B · S · cos α | e_ind = -N · (ΔΦ / Δt) | e_motional = B · v · L · sin θ",
      "shortcuts": [
        "Motional EMF in conducting rod of length L moving at speed v: e = B · v · L (when B, v, L mutually perpendicular)",
        "Angle α in flux formula: If problem specifies 'angle between B and PLANE of coil' is β, then α = 90° - β",
        "Self-induced EMF in solenoid: e_self = -L · (Δi / Δt) with L = 4π·10⁻⁷ · (N² / l) · S"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Type 1: Calculating Magnetic Flux Φ & Induced EMF e_ind (Core Understanding)",
        "description": "Time-varying B(t) or rotating coil in magnetic field.",
        "formulaSummary": "|e_ind| = S · |ΔB / Δt| | I_ind = |e_ind| / R",
        "traps": "⚠️ Normal vector n is perpendicular to coil surface. If field B is parallel to coil plane, α = 90° => Φ = 0."
      },
      {
        "id": "type2",
        "name": "Type 2: Determining Direction of Induced Current using Lenz's Law (Application)",
        "description": "Moving magnet towards or away from coil (Approaching REPELS, Withdrawing ATTRACTS).",
        "formulaSummary": "B_induced opposes relative motion",
        "traps": "⚠️ General rule: Near face of coil develops like pole when magnet approaches (repulsion) and opposite pole when receding (attraction)."
      }
    ],
    "workedExample": {
      "question": "A flat coil of area S = 50 cm² with N = 100 turns is placed in a uniform magnetic field B = 0.2 T perpendicular to the plane of the coil. Over a time interval Δt = 0.05 s, the magnetic field is reduced steadily to 0. Calculate: (a) The change in magnetic flux ΔΦ. (b) The magnitude of induced EMF generated in the coil.",
      "thinkingAnalysis": "1) Field is perpendicular to coil plane => angle with normal is α = 0° => cos α = 1.\\n2) Initial flux per turn: Φ1 = B · S = 0.2 · (50 · 10⁻⁴) = 1.0 · 10⁻³ Wb.\\n3) Final flux: Φ2 = 0 => ΔΦ = 0 - 1.0 · 10⁻³ = -1.0 · 10⁻³ Wb.\\n4) Induced EMF: |e_ind| = N · |ΔΦ / Δt| = 100 · (1.0 · 10⁻³ / 0.05) = 2.0 V.",
      "solution": "1. Convert units: S = 50 cm² = 5.0 · 10⁻³ m².\\n2. Initial magnetic flux per turn:\\n   Φ1 = B · S · cos 0° = 0.2 · 5.0 · 10⁻³ · 1 = 1.0 · 10⁻³ Wb.\\n3. Change in magnetic flux:\\n   ΔΦ = Φ2 - Φ1 = -1.0 · 10⁻³ Wb.\\n4. Magnitude of induced EMF across N = 100 turns:\\n   |e_ind| = N · (|ΔΦ| / Δt) = 100 · (1.0 · 10⁻³ / 0.05) = 2.0 V.",
      "examTrapWarning": "⚠️ Forgetting to multiply by number of turns N = 100 is the most common exam error."
    },
    "practiceQuiz": {
      "question": "A conducting rod of length L = 0.5 m moves at constant speed v = 4 m/s perpendicular to magnetic field lines of a uniform field B = 0.5 T. What is the induced EMF across the rod?",
      "options": [
        "1.0 V",
        "0.5 V",
        "2.0 V",
        "0.25 V"
      ],
      "correctIndex": 0,
      "hint1": "Apply motional EMF formula: e = B · v · L · sin θ.",
      "hint2": "Since motion is perpendicular, sin 90° = 1. e = 0.5 · 4 · 0.5 = 1.0 V.",
      "explanation": "e = B · v · L = 0.5 · 4 · 0.5 = 1.0 V."
    }
  },
  "g11-capacitor": {
    "topic": "Parallel Plate Capacitors, Capacitance C, Dielectrics & Electric Field Energy",
    "mindset": {
      "steps": [
        "Step 1: Capacitance of parallel plate capacitor: C = (ε · ε_0 · A) / d (where ε_0 = 8.85·10⁻¹² F/m, A is plate area, d is plate separation, ε is dielectric constant).",
        "Step 2: Charge, Voltage and Capacitance relationship: Q = C · U.",
        "Step 3: Two fundamental capacitor states when modifying parameters (changing d, inserting dielectric ε):\\n   - State 1: REMAIN CONNECTED TO BATTERY => Voltage is CONSTANT: U = const. As C increases, charge Q = C·U increases.\\n   - State 2: DISCONNECTED FROM BATTERY => Charge is CONSTANT: Q = const. As C increases, voltage U = Q / C decreases!",
        "Step 4: Electric field energy stored in capacitor: W = (1/2) · C · U² = (1/2) · Q · U = Q² / (2C)."
      ],
      "coreLaw": "C = (ε · ε_0 · A) / d | Q = C · U | W = (1/2) · C · U²",
      "shortcuts": [
        "Capacitors in series: 1/C_eq = 1/C1 + 1/C2; Q_total = Q1 = Q2; U_total = U1 + U2",
        "Capacitors in parallel: C_eq = C1 + C2; U_total = U1 = U2; Q_total = Q1 + Q2",
        "Electrostatic attractive force between plates: F = Q² / (2 · ε · ε_0 · A) = (1/2) · Q · E"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Type 1: Calculating Capacitance C, Charge Q and Stored Energy W (Core Understanding)",
        "description": "Apply Q = CU and W = 0.5 CU².",
        "formulaSummary": "Q = C·U | W = 0.5·C·U² = 0.5·Q²/C",
        "traps": "⚠️ Convert plate separation d from mm to metres (m). Convert capacitance from μF, nF, pF to Farads (1 μF = 10⁻⁶ F; 1 pF = 10⁻¹² F)."
      },
      {
        "id": "type2",
        "name": "Type 2: Changing Separation d or Inserting Dielectric ε (Advanced Solving)",
        "description": "Distinguish between 'Battery Connected' (U = const) and 'Battery Disconnected' (Q = const).",
        "formulaSummary": "Connected: U=const => W ∝ C | Disconnected: Q=const => W ∝ 1/C",
        "traps": "⚠️ When disconnected from battery, inserting dielectric ε > 1 increases C => Stored energy W = Q²/(2C) DECREASES because electric field does positive work drawing dielectric in."
      }
    ],
    "workedExample": {
      "question": "An air-filled parallel plate capacitor of capacitance C = 20 pF is charged to a potential difference U = 100 V. After disconnecting from the power source, the plate separation is doubled (2d). Calculate: (a) Initial charge Q. (b) The new potential difference U' between the plates.",
      "thinkingAnalysis": "1) Initial charge: Q = C · U = 20 · 10⁻¹² · 100 = 2.0 · 10⁻⁹ C = 2.0 nC.\\n2) Since 'DISCONNECTED FROM SOURCE', charge is conserved: Q' = Q = 2.0 nC.\\n3) Separation doubled d' = 2d => Capacitance halved: C' = C / 2 = 10 pF.\\n4) New voltage: U' = Q' / C' = 2.0 nC / 10 pF = 200 V.",
      "solution": "1. Initial stored charge:\\n   Q = C · U = (20 · 10⁻¹² F) · 100 V = 2.0 · 10⁻⁹ C = 2.0 nC.\\n2. Disconnected state conserves charge: Q' = Q = 2.0 nC.\\n3. New capacitance when separation doubles (d' = 2d):\\n   C' = (ε · ε_0 · A) / d' = C / 2 = 20 / 2 = 10 pF.\\n4. New potential difference:\\n   U' = Q' / C' = (2.0 · 10⁻⁹ C) / (10 · 10⁻¹² F) = 200 V.",
      "examTrapWarning": "⚠️ If the problem states 'REMAINS CONNECTED TO BATTERY', then U' remains 100 V and charge Q decreases by half."
    },
    "practiceQuiz": {
      "question": "A capacitor of capacitance C = 10 μF is charged to potential difference U = 20 V. What is the electric field energy stored in the capacitor?",
      "options": [
        "2.0 · 10⁻³ J (2 mJ)",
        "4.0 · 10⁻³ J",
        "1.0 · 10⁻³ J",
        "0.2 J"
      ],
      "correctIndex": 0,
      "hint1": "Apply electric field energy equation: W = (1/2) · C · U².",
      "hint2": "W = 0.5 · (10 · 10⁻⁶ F) · (20 V)² = 5 · 10⁻⁶ · 400 = 2 · 10⁻³ J = 2 mJ.",
      "explanation": "W = 0.5 · 10 · 10⁻⁶ · 20² = 2 · 10⁻³ J = 2 mJ."
    }
  },
  "g11-lorentz-force": {
    "topic": "Lorentz Magnetic Force & Charged Particle Trajectories in Magnetic Fields",
    "mindset": {
      "steps": [
        "Step 1: Magnetic force on charge q moving with velocity v in magnetic field B:\\n   - Magnitude: f_L = |q| · v · B · sin α (where α is angle between velocity v and magnetic field B).\\n   - Direction: Determined by Left-Hand Rule (Place left hand open so magnetic field lines B enter palm, fingers point along velocity v for q > 0; thumb at 90° points along force f_L. For negative charge q < 0, force is opposite to thumb).",
        "Step 2: Circular motion for perpendicular entry (α = 90°):\\n   - Because Lorentz force is always perpendicular to velocity (f_L ⊥ v), it DOES NO WORK (W = 0) => Speed and kinetic energy remain CONSTANT.\\n   - Lorentz force acts as centripetal force: |q| · v · B = m · (v² / r).\\n   - Orbit radius: r = (m · v) / (|q| · B).\\n   - Period of revolution: T = 2π · r / v = (2π · m) / (|q| · B) (Independent of velocity v!).",
        "Step 3: Velocity Selector: Perpendicular E and B fields. Particles pass undeflected when electric and magnetic forces balance: |q| · E = |q| · v · B => v = E / B."
      ],
      "coreLaw": "f_L = |q| · v · B · sin α | r = (m · v) / (|q| · B) | T = (2π · m) / (|q| · B)",
      "shortcuts": [
        "Two particles with same charge in magnetic field: Ratio of radii r1 / r2 = (m1 · v1) / (m2 · v2) = p1 / p2 (proportional to momentum)",
        "Accelerated through voltage U: Kinetic energy (1/2)mv² = |q|·U => v = √(2|q|U/m) => r = (1/B) · √(2mU / |q|)",
        "Mass Spectrometer: Measure deflection radius r => Calculate atomic mass m = (|q| · B · r) / v"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Type 1: Calculating Lorentz Force & Orbit Radius r (Core Understanding)",
        "description": "Apply r = mv / (|q|B) for electron, proton or alpha particle in magnetic field.",
        "formulaSummary": "r = (m · v) / (|q| · B) | T = 2πm / (|q| · B)",
        "traps": "⚠️ Electron has negative charge (q = -1.6 · 10⁻¹⁹ C), force direction is OPPOSITE to thumb of left-hand rule."
      },
      {
        "id": "type2",
        "name": "Type 2: Velocity Selector & Mass Spectrometry (Advanced Solving)",
        "description": "Charged particles travel straight when electric and magnetic forces balance.",
        "formulaSummary": "v = E / B | m = (|q| · B · r) / v",
        "traps": "⚠️ In a velocity selector, the condition v = E/B is completely independent of the mass m and charge q of the particle."
      }
    ],
    "workedExample": {
      "question": "An electron (mass m = 9.11 · 10⁻³¹ kg, charge q = -1.60 · 10⁻¹⁹ C) enters a uniform magnetic field B = 2.0 · 10⁻³ T perpendicular to the field lines with speed v = 4.0 · 10⁶ m/s. Calculate: (a) The magnitude of the Lorentz force acting on the electron. (b) The radius of the circular path. (c) The period of one revolution.",
      "thinkingAnalysis": "1) Lorentz force: f_L = |q| · v · B · sin(90°) = 1.6 · 10⁻¹⁹ · 4.0 · 10⁶ · 2.0 · 10⁻³ = 1.28 · 10⁻¹⁵ N.\\n2) Radius: r = (m · v) / (|q| · B) = (9.11 · 10⁻³¹ · 4.0 · 10⁶) / (1.6 · 10⁻¹⁹ · 2.0 · 10⁻³) = 3.644 · 10⁻²⁴ / 3.2 · 10⁻²² = 0.0114 m = 1.14 cm.\\n3) Period: T = (2π · m) / (|q| · B) = (2 · 3.14159 · 9.11 · 10⁻³¹) / (3.20 · 10⁻²²) = 1.79 · 10⁻⁸ s = 17.9 ns.",
      "solution": "1. Magnitude of Lorentz force f_L:\\n   f_L = |q| · v · B · sin 90° = (1.60 · 10⁻¹⁹ C) · (4.0 · 10⁶ m/s) · (2.0 · 10⁻³ T) = 1.28 · 10⁻¹⁵ N.\\n2. Circular orbit radius r:\\n   r = (m · v) / (|q| · B) = (9.11 · 10⁻³¹ kg · 4.0 · 10⁶ m/s) / (1.60 · 10⁻¹⁹ C · 2.0 · 10⁻³ T) = 0.0114 m = 1.14 cm.\\n3. Revolution period T:\\n   T = (2π · m) / (|q| · B) = (2 · 3.14159 · 9.11 · 10⁻³¹) / (3.20 · 10⁻²²) = 1.79 · 10⁻⁸ s = 17.9 ns.",
      "examTrapWarning": "⚠️ Fundamental physics: Magnetic force changes DIRECTION of velocity, NEVER changes SPEED or KINETIC ENERGY because force is perpendicular to motion (Work done W = 0)."
    },
    "practiceQuiz": {
      "question": "A proton (charge +e) and an alpha particle (charge +2e, mass 4m) enter a uniform magnetic field with the same velocity perpendicular to B. What is the ratio of their orbit radii r_alpha / r_proton?",
      "options": [
        "2",
        "1",
        "4",
        "0.5"
      ],
      "correctIndex": 0,
      "hint1": "Orbit radius formula: r = (m · v) / (q · B).",
      "hint2": "r_alpha / r_proton = (m_alpha / m_proton) · (q_proton / q_alpha) = (4 / 1) · (1 / 2) = 2.",
      "explanation": "r_alpha / r_proton = (4m · v / 2eB) / (m · v / eB) = 4 / 2 = 2."
    }
  },
  "g12-spring": {
    "topic": "Simple Harmonic Motion (SHM) of Horizontal & Vertical Spring Oscillators",
    "mindset": {
      "steps": [
        "Step 1: Write displacement equation: x(t) = A · cos(ωt + φ) (m or cm).",
        "Step 2: Angular frequency ω = √(k/m), Period T = 2π√(m/k), Frequency f = 1/T = (1/2π)√(k/m).",
        "Step 3: Velocity and acceleration: v(t) = x'(t) = -ωA sin(ωt + φ), a(t) = v'(t) = -ω²x. Max speed v_max = ωA, Max acceleration a_max = ω²A.",
        "Step 4: Conservation of Mechanical Energy: E = E_k + E_p = (1/2) m v² + (1/2) k x² = (1/2) k A² = (1/2) m ω² A² = const."
      ],
      "coreLaw": "T = 2π √(m/k) | E = (1/2) k A² = const | a = -ω² x",
      "shortcuts": [
        "Time-independent equation: x² + (v/ω)² = A² <=> (x/A)² + (v/v_max)² = 1",
        "When kinetic energy equals n times potential energy (E_k = n · E_p): x = ± A / √(n + 1)",
        "When potential energy equals n times kinetic energy (E_p = n · E_k): v = ± v_max / √(n + 1)"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Type 1: Fundamental SHM Quantities (Period T, Frequency f, Energy E)",
        "description": "Direct calculation from mass m, spring constant k, and amplitude A.",
        "formulaSummary": "T = 2π√(m/k) | E = (1/2) k A²",
        "traps": "⚠️ Convert mass m to kg (100 g = 0.1 kg) and amplitude A to metres (4 cm = 0.04 m) before computing energy in Joules."
      },
      {
        "id": "type2",
        "name": "Type 2: Instantaneous Position, Velocity and Acceleration Relationships",
        "description": "Find velocity at position x or find position at velocity v using Pythagorean relation.",
        "formulaSummary": "v = ± ω · √(A² - x²)",
        "traps": "⚠️ Note the ± sign for velocity (positive when moving in +x direction, negative when moving in -x direction)."
      }
    ],
    "workedExample": {
      "question": "A spring oscillator with mass m = 200 g and stiffness k = 50 N/m oscillates with amplitude A = 4 cm. (a) Calculate the period T and total mechanical energy E. (b) Calculate the maximum speed v_max. (c) What is the speed of the mass when its displacement is x = 2 cm?",
      "thinkingAnalysis": "1) Convert units: m = 0.2 kg, A = 0.04 m, x = 0.02 m.\\n2) Angular frequency: ω = √(k/m) = √(50/0.2) = 15.81 rad/s.\\n3) Period: T = 2π / 15.81 = 0.40 s.\\n4) Energy: E = (1/2) k A² = 0.5 · 50 · 0.04² = 0.040 J = 40 mJ.\\n5) Max speed: v_max = ω · A = 15.81 · 0.04 = 0.632 m/s.\\n6) Speed at x = 2 cm: |v| = ω · √(A² - x²) = 15.81 · √(0.04² - 0.02²) = 0.548 m/s = 54.8 cm/s.",
      "solution": "1. Period and mechanical energy:\\n   ω = √(50 / 0.2) = 15.81 rad/s => T = 2π / 15.81 = 0.40 s.\\n   E = (1/2) · k · A² = 0.5 · 50 · (0.04)² = 0.040 J (40 mJ).\\n2. Maximum speed:\\n   v_max = ω · A = 15.81 rad/s · 0.04 m = 0.632 m/s (63.2 cm/s).\\n3. Speed at x = 2 cm:\\n   |v| = ω · √(A² - x²) = 15.81 · √(0.04² - 0.02²) = 0.548 m/s (54.8 cm/s).",
      "examTrapWarning": "⚠️ Never use cm when computing energy in Joules (using 4² gives 400 J, which is off by 10,000x!)."
    },
    "practiceQuiz": {
      "question": "An object undergoes SHM with amplitude A. At what displacement x is the potential energy equal to 3 times the kinetic energy (E_p = 3 E_k)?",
      "options": [
        "x = ± A · (√3 / 2)",
        "x = ± A / 2",
        "x = ± A / √3",
        "x = ± A / 4"
      ],
      "correctIndex": 0,
      "hint1": "Total energy E = E_k + E_p = (1/3) E_p + E_p = (4/3) E_p.",
      "hint2": "Substitute (1/2) k A² = (4/3) · (1/2) k x² => x² = (3/4) A² => |x| = A · (√3 / 2).",
      "explanation": "E_p = 3 E_k => E = (4/3) E_p => (1/2) k A² = (4/3) (1/2) k x² => x = ± A · √3 / 2."
    }
  },
  "g12-rlc": {
    "topic": "Series AC RLC Circuits, Phasor Diagrams & Electrical Resonance",
    "mindset": {
      "steps": [
        "Step 1: Calculate inductive reactance Z_L = ωL = 2πfL and capacitive reactance Z_C = 1/(ωC) = 1/(2πfC).",
        "Step 2: Calculate total circuit impedance: Z = √[R² + (Z_L - Z_C)²].",
        "Step 3: Determine RMS and peak currents: I = U / Z; I_0 = U_0 / Z.",
        "Step 4: Phase difference between voltage u and current i: tan φ = (Z_L - Z_C) / R (where φ = φ_u - φ_i)."
      ],
      "coreLaw": "Z = √[R² + (Z_L - Z_C)²] | tan φ = (Z_L - Z_C) / R | P = U · I · cos φ",
      "shortcuts": [
        "Resonance Condition: Z_L = Z_C <=> ω² L C = 1 <=> f = 1 / (2π√LC)",
        "At Resonance: Z_min = R, I_max = U / R, Power factor cos φ = 1, P_max = U² / R",
        "Two frequencies giving equal current: Resonance frequency f_0 = √(f_1 · f_2)"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Type 1: Impedance Z, RMS Current I and Phase Angle φ",
        "description": "Calculate circuit impedance, current magnitude, and phase angle.",
        "formulaSummary": "Z = √[R² + (Z_L - Z_C)²] | cos φ = R / Z",
        "traps": "⚠️ Distinguish peak values (U_0, I_0) from RMS values (U = U_0/√2, I = I_0/√2)."
      },
      {
        "id": "type2",
        "name": "Type 2: Electrical Resonance Phenomena",
        "description": "Adjust frequency f, inductance L, or capacitance C to maximize current I.",
        "formulaSummary": "ω = 1 / √(LC) | P_max = U² / R",
        "traps": "⚠️ At resonance, voltages across L and C (U_L, U_C) can be significantly larger than supply voltage U."
      }
    ],
    "workedExample": {
      "question": "An AC voltage u = 200√2 cos(100πt) (V) is applied to a series RLC circuit with R = 100 Ω, L = 1/π H, and C = 10⁻⁴/(2π) F. Find the expression for instantaneous current i(t).",
      "thinkingAnalysis": "1) U_0 = 200√2 V, ω = 100π rad/s, φ_u = 0.\\n2) Z_L = ωL = 100π · (1/π) = 100 Ω.\\n3) Z_C = 1/(ωC) = 1 / [100π · 10⁻⁴/(2π)] = 200 Ω.\\n4) Z = √[100² + (100 - 200)²] = 100√2 Ω.\\n5) I_0 = U_0 / Z = 200√2 / (100√2) = 2.0 A.\\n6) tan φ = (100 - 200) / 100 = -1 => φ = -π/4 => φ_i = φ_u - φ = +π/4 rad.",
      "solution": "1. Inductive and capacitive reactances:\\n   Z_L = 100 Ω, Z_C = 200 Ω.\\n2. Circuit impedance:\\n   Z = √[100² + (100 - 200)²] = 100√2 Ω (141.4 Ω).\\n3. Peak current:\\n   I_0 = 200√2 / 100√2 = 2.0 A.\\n4. Phase angle:\\n   φ = -π/4 rad => φ_i = +π/4 rad.\\n5. Instantaneous current:\\n   i(t) = 2 cos(100πt + π/4) (A).",
      "examTrapWarning": "⚠️ Note the phase sign: φ = φ_u - φ_i => φ_i = φ_u - φ. Negative φ means current leads voltage by π/4."
    },
    "practiceQuiz": {
      "question": "A series RLC circuit has R = 50 Ω, L = 0.5/π H, and C = 2 · 10⁻⁴/π F with supply frequency f = 50 Hz. What is the power factor cos φ of the circuit?",
      "options": [
        "1.0 (Resonance)",
        "0.50",
        "0.707",
        "0.866"
      ],
      "correctIndex": 0,
      "hint1": "Calculate ω = 2π · 50 = 100π rad/s. Z_L = 50 Ω and Z_C = 50 Ω.",
      "hint2": "Since Z_L = Z_C, the circuit is in resonance and cos φ = R/Z = 50/50 = 1.0.",
      "explanation": "Z_L = 100π · 0.5/π = 50 Ω; Z_C = 1 / (100π · 2·10⁻⁴/π) = 50 Ω => Z_L = Z_C => cos φ = 1.0."
    }
  },
  "g12-standingwave": {
    "topic": "Standing Waves on Strings & Air Columns, Nodes, Antinodes & Harmonics",
    "mindset": {
      "steps": [
        "Step 1: Standing wave conditions on string of length L:\\n   - Both ends fixed (or two closed ends): L = k · (λ / 2) = k · [v / (2f)] (where k is number of antinodes / loops, number of nodes = k + 1).\\n   - One end fixed, one end free (or one closed, one open): L = (2k + 1) · (λ / 4) = (2k + 1) · [v / (4f)] (number of nodes = number of antinodes = k + 1).",
        "Step 2: Distance between 2 consecutive nodes (or 2 antinodes) is half a wavelength: d = λ / 2.\\n   Distance between adjacent node and antinode: d = λ / 4.",
        "Step 3: Wave speed on stretched string with tension T and linear mass density μ (kg/m): v = √(T / μ).",
        "Step 4: Harmonic frequencies:\\n   - Both ends fixed: f_n = n · f_1 (all integer harmonics of fundamental f_1 = v / 2L).\\n   - One end fixed, one open: f_n = (2n - 1) · f_1 (only ODD harmonics 1, 3, 5...)."
      ],
      "coreLaw": "L = k · (λ / 2) | L = (2k + 1) · (λ / 4) | v = f · λ",
      "shortcuts": [
        "Two consecutive standing wave frequencies (both ends fixed): f_(k+1) - f_k = f_1 = v / 2L",
        "Two consecutive standing wave frequencies (one end free): f_(k+1) - f_k = 2 · f_1 = v / 2L",
        "Standing wave amplitude at distance d from node: A_d = 2a · |sin(2πd / λ)|"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Type 1: Calculating Number of Nodes, Antinodes, Wavelength λ and Speed v (Core Understanding)",
        "description": "String fixed at both ends or one end free vibrating at frequency f.",
        "formulaSummary": "λ = 2L / k | v = λ · f",
        "traps": "⚠️ 'String has 5 nodes' (including both ends) => k = 4 loops (not k = 5)."
      },
      {
        "id": "type2",
        "name": "Type 2: Finding Fundamental Frequency f1 from Consecutive Harmonics (Application)",
        "description": "Given two consecutive resonance frequencies f1, f2, find fundamental f_min.",
        "formulaSummary": "Both fixed: f_min = f2 - f1 | One free: f_min = (f2 - f1) / 2",
        "traps": "⚠️ Read carefully whether boundary is 'both ends fixed' or 'one end free'."
      }
    ],
    "workedExample": {
      "question": "An elastic string AB of length L = 1.2 m has both ends fixed. When vibrated at frequency f = 100 Hz, a stable standing wave with 4 antinodes is formed. (a) Calculate the wavelength λ. (b) Calculate the wave speed v on the string.",
      "thinkingAnalysis": "1) String fixed at both ends with 4 antinodes => k = 4 loops.\\n2) Condition: L = k · (λ / 2) => λ = 2L / k = (2 · 1.2) / 4 = 0.60 m = 60 cm.\\n3) Wave speed: v = λ · f = 0.60 · 100 = 60 m/s.",
      "solution": "1. Wavelength λ:\\n   L = k · (λ / 2) with k = 4\\n   => λ = (2 · L) / k = (2 · 1.2 m) / 4 = 0.60 m = 60 cm.\\n2. Wave speed on string:\\n   v = λ · f = 0.60 m · 100 Hz = 60 m/s.",
      "examTrapWarning": "⚠️ Number of nodes on string is k + 1 = 4 + 1 = 5 nodes. Distinguish between number of antinodes (k) and nodes (k+1)."
    },
    "practiceQuiz": {
      "question": "A 90 cm string fixed at both ends supports a standing wave with 3 loops. What is the distance between two consecutive nodes?",
      "options": [
        "30 cm",
        "15 cm",
        "60 cm",
        "45 cm"
      ],
      "correctIndex": 0,
      "hint1": "Distance between two consecutive nodes equals half a wavelength: d = λ / 2.",
      "hint2": "With 3 loops (k = 3): L = 3 · (λ / 2) = 90 cm => λ / 2 = 90 / 3 = 30 cm.",
      "explanation": "L = k · (λ/2) => λ/2 = L / k = 90 cm / 3 = 30 cm."
    }
  },
  "g12-lc-oscillator": {
    "topic": "Electromagnetic LC Oscillations, Energy Conservation & Radio Waves",
    "mindset": {
      "steps": [
        "Step 1: Thomson natural oscillation formula: Angular frequency ω = 1/√(LC), Natural period T = 2π√(LC), Frequency f = 1 / (2π√(LC)).",
        "Step 2: Instantaneous charge and current equations: q(t) = Q_0 cos(ωt + φ), i(t) = q'(t) = -I_0 sin(ωt + φ) = I_0 cos(ωt + φ + π/2) with I_0 = ω · Q_0.",
        "Step 3: Phase relationship: Current i(t) leads charge q(t) and capacitor voltage u(t) by a phase angle of π/2 rad (90°).",
        "Step 4: Total Electromagnetic Energy Conservation: W = W_C + W_L = (1/2) (q²/C) + (1/2) L i² = (1/2) C U_0² = (1/2) L I_0² = const."
      ],
      "coreLaw": "T = 2π √(LC) | W = (1/2) C U_0² = (1/2) L I_0² = const | λ = 2π c √(LC)",
      "shortcuts": [
        "Peak current relation: I_0 = ω · Q_0 = U_0 · √(C / L)",
        "Instantaneous Pythagorean relation: (q / Q_0)² + (i / I_0)² = 1 <=> (u / U_0)² + (i / I_0)² = 1",
        "When electric field energy equals magnetic field energy (W_C = W_L): |q| = Q_0 / √2, |i| = I_0 / √2, |u| = U_0 / √2",
        "Broadcast Wavelength: λ = c · T = 3 · 10⁸ · 2π · √(LC)"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Type 1: Thomson Period T, Frequency f and Wavelength λ (Core Recall & Understanding)",
        "description": "Direct calculation from inductance L and capacitance C.",
        "formulaSummary": "T = 2π√(LC) | f = 1/(2π√(LC)) | λ = c · T",
        "traps": "⚠️ Convert units: L (mH to H by ×10⁻³, µH by ×10⁻⁶), C (µF by ×10⁻⁶, nF by ×10⁻⁹, pF by ×10⁻¹²)."
      },
      {
        "id": "type2",
        "name": "Type 2: Instantaneous Quantities & Pythagorean Phase Relations (Application)",
        "description": "Find current i when charge q (or voltage u) is given using (q/Q_0)² + (i/I_0)² = 1.",
        "formulaSummary": "i = ± I_0 · √[1 - (u / U_0)²] | I_0 = U_0 · √(C / L)",
        "traps": "⚠️ Distinguish between energy frequency (f_energy = 2f) and charge/current frequency f."
      },
      {
        "id": "type3",
        "name": "Type 3: Tuning Variable Capacitors & Radio Receiver Resonance (Advanced)",
        "description": "Variable capacitor C_min to C_max tuning wavelength band λ_min to λ_max.",
        "formulaSummary": "λ_max / λ_min = √(C_max / C_min)",
        "traps": "⚠️ Proportionality relation: λ ∝ √C. Quadrupling C doubles wavelength λ (not 4 times)."
      }
    ],
    "workedExample": {
      "question": "An ideal LC circuit consists of an inductor L = 4.0 µH and capacitor C = 9.0 nF with peak capacitor voltage U_0 = 6.0 V. (a) Calculate the natural period T, frequency f, and electromagnetic wavelength λ. (b) Calculate peak current I_0. (c) When instantaneous voltage u = 3.0 V, what is the instantaneous current i?",
      "thinkingAnalysis": "1) Convert units: L = 4 · 10⁻⁶ H, C = 9 · 10⁻⁹ F, U_0 = 6.0 V.\\n2) Natural period: T = 2π√(LC) = 2π√(4·10⁻⁶ · 9·10⁻⁹) = 2π√(36·10⁻¹⁵) = 3.77 · 10⁻⁷ s.\\n3) Wavelength: λ = c · T = 3 · 10⁸ · 3.77 · 10⁻⁷ = 113.1 m.\\n4) Peak current: I_0 = U_0 · √(C/L) = 6.0 · √(9·10⁻⁹ / 4·10⁻⁶) = 0.285 A = 285 mA.\\n5) When u = 3.0 V = U_0 / 2: |i| = I_0 · (√3 / 2) = 0.285 · 0.866 = 247 mA.",
      "solution": "1. Natural period and wavelength:\\n   T = 2π · √(L · C) = 2π · √(4.0 × 10⁻⁶ × 9.0 × 10⁻⁹) = 3.77 × 10⁻⁷ s.\\n   λ = c · T = 3.0 × 10⁸ m/s × 3.77 × 10⁻⁷ s = 113.1 meters.\\n2. Peak current I_0:\\n   I_0 = U_0 · √(C / L) = 6.0 × √(9.0 × 10⁻⁹ / 4.0 × 10⁻⁶) = 0.285 A (285 mA).\\n3. Current at instantaneous voltage u = 3.0 V:\\n   |i| = I_0 · √[1 - (u / U_0)²] = 0.285 × √[1 - (3.0 / 6.0)²] = 0.247 A (247 mA).",
      "examTrapWarning": "⚠️ Common Exam Trap: Electric and magnetic energies oscillate at twice the frequency: f_energy = 2f and T_energy = T / 2."
    },
    "practiceQuiz": {
      "question": "In an ideal LC circuit with period T = 4.0 µs, what is the minimum time interval for the energy stored in the capacitor to convert completely into magnetic field energy in the inductor?",
      "options": [
        "1.0 µs (T/4)",
        "2.0 µs (T/2)",
        "4.0 µs (T)",
        "0.5 µs (T/8)"
      ],
      "correctIndex": 0,
      "hint1": "Energy starts at W_C = W_max (q = Q_0, i = 0) and reaches W_L = W_max (q = 0, i = I_0).",
      "hint2": "The time to go from peak charge (q = Q_0) to zero charge (q = 0) is a quarter of a period: Δt = T / 4.",
      "explanation": "Δt = T / 4 = 4.0 µs / 4 = 1.0 µs."
    }
  },
  "igcse-hooke": {
    "topic": "Cambridge IGCSE: Hooke's Law, Spring Constant k & Elastic Limit",
    "mindset": {
      "steps": [
        "Step 1: Distinguish between original unstretched length l_0, stretched length l, and extension x = l - l_0.",
        "Step 2: Hooke's Law: Elastic restoring force is directly proportional to extension within the elastic limit: F = k · x (where k is spring constant in N/m or N/cm).",
        "Step 3: Force-Extension graph: Linear section through origin represents Hooke's Law validity. Gradient = k. Limit of proportionality is point where graph curves.",
        "Step 4: Elastic strain energy (Work done in stretching spring) = Area under Force-Extension graph: E_p = (1/2) · F · x = (1/2) · k · x²."
      ],
      "coreLaw": "F = k · Δx | E_p = (1/2) · k · (Δx)²",
      "shortcuts": [
        "Two identical springs in series: k_eq = k / 2 (softer spring system, double extension)",
        "Two identical springs in parallel: k_eq = 2k (stiffer spring system, half extension)",
        "Gradient of Extension (y-axis) vs Load (x-axis) graph: Gradient = 1/k"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Type 1: Calculating Spring Constant k & Extension (Cambridge Core/Extended)",
        "description": "Apply F = k · x to find extension or mass hung on spring.",
        "formulaSummary": "k = F / x = (m · g) / (l - l_0)",
        "traps": "⚠️ Trap: Using total length l instead of extension x = l - l_0 in F = kx."
      },
      {
        "id": "type2",
        "name": "Type 2: Elastic Limit & Work Done / Energy Stored (Extended / A Level)",
        "description": "Calculate elastic strain energy as area under Force-Extension graph.",
        "formulaSummary": "E_p = Area = (1/2) · F · x = (1/2) · k · x²",
        "traps": "⚠️ Beyond the limit of proportionality, spring suffers permanent deformation (plastic deformation) and Hooke's law no longer applies."
      },
      {
        "id": "type3",
        "name": "Type 3: Series & Parallel Combinations of Springs",
        "description": "Determine equivalent spring constant for spring systems.",
        "formulaSummary": "1/k_series = 1/k1 + 1/k2 | k_parallel = k1 + k2",
        "traps": "⚠️ Springs in series share the same tension force F, but total extension x_total = x1 + x2."
      }
    ],
    "workedExample": {
      "question": "A spring of unstretched length 12.0 cm hangs vertically. When a load of 4.0 N is attached, its length becomes 20.0 cm. (a) Calculate the spring constant k. (b) Calculate the elastic strain energy stored in the spring.",
      "thinkingAnalysis": "1) Extension x = length - original length = 20.0 - 12.0 = 8.0 cm = 0.08 m.\\n2) Spring constant: k = F / x = 4.0 / 0.08 = 50 N/m.\\n3) Stored energy: E_p = 0.5 · k · x² = 0.5 · 50 · 0.08² = 0.16 J.",
      "solution": "1. Extension of the spring:\\n   x = l - l_0 = 20.0 cm - 12.0 cm = 8.0 cm = 0.08 m.\\n2. Spring constant k:\\n   k = F / x = 4.0 N / 0.08 m = 50.0 N/m.\\n3. Elastic strain energy stored:\\n   E_p = (1/2) · k · x² = (1/2) · 50.0 · (0.08)² = 0.16 Joules (J).",
      "examTrapWarning": "⚠️ Cambridge Exam Trap: Leaving x in cm (8.0 cm) results in E_p = 0.5 · 50 · 8² = 1600 J (WRONG by factor of 10,000!). Always convert extension to METRES (m)."
    },
    "practiceQuiz": {
      "question": "A spring has spring constant k = 200 N/m. How much work is done in extending the spring from an extension of 0.02 m to 0.04 m?",
      "options": [
        "0.12 J",
        "0.16 J",
        "0.04 J",
        "0.08 J"
      ],
      "correctIndex": 0,
      "hint1": "Work done equals the change in elastic potential energy: W = ΔE_p = (1/2) · k · (x2² - x1²).",
      "hint2": "Do NOT calculate (1/2)·k·(x2 - x1)². You must square the extensions separately: (0.04² - 0.02²) = 0.0016 - 0.0004 = 0.0012 m².",
      "explanation": "W = 0.5 · 200 · (0.04² - 0.02²) = 100 · (0.0016 - 0.0004) = 100 · 0.0012 = 0.12 J."
    }
  },
  "igcse-snell": {
    "topic": "Cambridge IGCSE / A Level: Snell's Law, Refractive Index & Total Internal Reflection (TIR)",
    "mindset": {
      "steps": [
        "Step 1: Snell's Law of Refraction: n1 · sin i = n2 · sin r. For light entering medium from air: n = sin i / sin r.",
        "Step 2: Refractive index and wave speed: n = c / v = λ_0 / λ_medium (with c = 3·10⁸ m/s). Frequency f remains strictly constant.",
        "Step 3: Total Internal Reflection (TIR):\\n   - Condition 1: Light travels from denser medium to less dense medium (n1 > n2).\\n   - Condition 2: Angle of incidence exceeds critical angle: i ≥ c (where sin c = n2 / n1)."
      ],
      "coreLaw": "n1 · sin i = n2 · sin r | n = c / v | sin c = 1 / n",
      "shortcuts": [
        "Critical angle from glass/water to air: sin c = 1 / n => c = arcsin(1/n)",
        "Angular deviation: D = |i - r|",
        "Apparent depth viewed from above: h' = h / n"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Type 1: Calculating Refractive Index n & Angles of Refraction (IGCSE / AS Level)",
        "description": "Apply Snell's law when light enters a glass block or water.",
        "formulaSummary": "n = sin i / sin r | v = c / n",
        "traps": "⚠️ Always measure angles i and r from the NORMAL (perpendicular to surface), not from the boundary surface."
      },
      {
        "id": "type2",
        "name": "Type 2: Total Internal Reflection & Critical Angle c (Optical Fibres & Prisms)",
        "description": "Determine whether light reflects totally or refracts out.",
        "formulaSummary": "sin c = n2 / n1 (where n1 > n2)",
        "traps": "⚠️ TIR can NEVER happen when light travels from air into glass (less dense to more dense). It only occurs from high n to low n."
      },
      {
        "id": "type3",
        "name": "Type 3: Light through Rectangular Block / Triangular Prism",
        "description": "Parallel emergent ray from rectangular block with lateral displacement d.",
        "formulaSummary": "Lateral shift d = t · sin(i - r) / cos(r)",
        "traps": "⚠️ For rectangular block, emergent angle equals incident angle (i_emergent = i_incident)."
      }
    ],
    "workedExample": {
      "question": "A ray of light in air strikes a glass block (refractive index n = 1.50) at an angle of incidence of 45°. (a) Calculate the angle of refraction r in the glass. (b) Calculate the critical angle c for the glass-air boundary.",
      "thinkingAnalysis": "1) Apply Snell's law: 1.0 · sin(45°) = 1.50 · sin(r).\\n2) sin(r) = sin(45°) / 1.50 = 0.7071 / 1.50 = 0.4714 => r = arcsin(0.4714) = 28.1°.\\n3) Critical angle formula: sin c = 1 / n = 1 / 1.50 = 0.6667 => c = arcsin(0.6667) = 41.8°.",
      "solution": "1. Angle of refraction r:\\n   sin i / sin r = n\\n   => sin r = sin(45°) / 1.50 = 0.7071 / 1.50 = 0.4714\\n   => r = 28.1°.\\n2. Critical angle c:\\n   sin c = 1 / n = 1 / 1.50 = 0.6667\\n   => c = 41.8°.",
      "examTrapWarning": "⚠️ Cambridge Marking Scheme Trap: Stating critical angle as a ratio (sin c = 0.667) instead of calculating the actual ANGLE in degrees (c = 41.8°). Always evaluate the inverse sine!"
    },
    "practiceQuiz": {
      "question": "Light travels from diamond (n = 2.42) into water (n = 1.33). What is the critical angle for total internal reflection?",
      "options": [
        "33.3°",
        "41.8°",
        "48.8°",
        "24.4°"
      ],
      "correctIndex": 0,
      "hint1": "Use the general critical angle equation: sin c = n_less / n_dense = n_water / n_diamond.",
      "hint2": "sin c = 1.33 / 2.42 = 0.5496. Take arcsin(0.5496).",
      "explanation": "sin c = 1.33 / 2.42 = 0.5496 => c = arcsin(0.5496) = 33.34° ≈ 33.3°."
    }
  },
  "alevel-pendulumg": {
    "topic": "Cambridge A Level 9702: Simple Pendulum, Harmonic Oscillations & Measuring Gravity g",
    "mindset": {
      "steps": [
        "Step 1: Simple pendulum period equation for small angles (θ ≤ 10° or 0.17 rad): T = 2π √(L / g).",
        "Step 2: Linearization for experimental analysis: Squaring both sides yields T² = (4π² / g) · L.\\n   - Y-axis = T² (s²), X-axis = L (m).\\n   - Linear graph passes through origin with gradient m = 4π² / g.",
        "Step 3: Calculate acceleration of free fall: g = 4π² / Gradient.",
        "Step 4: Error reduction techniques (A Level Paper 3/5): Time 20 complete oscillations (20T), then divide by 20 to minimize human reaction time errors."
      ],
      "coreLaw": "T = 2π √(L / g) | T² = (4π² / g) · L | g = 4π² / Gradient",
      "shortcuts": [
        "Seconds pendulum (T = 2.0 s): Length L ≈ 1.0 m (since g ≈ π²)",
        "Period ratio with varying length: T1 / T2 = √(L1 / L2)",
        "Fractional change in period with temperature / altitude: ΔT / T = (1/2) · α · Δt + h / R_Earth"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Type 1: Calculating Period T & Acceleration of Free Fall g (A Level AS)",
        "description": "Apply T = 2π√(L/g) for pendulum oscillations.",
        "formulaSummary": "T = 2π√(L/g) | g = 4π²·L / T²",
        "traps": "⚠️ Length L must be measured from suspension point to the CENTRE OF GRAVITY of the pendulum bob (L = length of string + radius of bob)."
      },
      {
        "id": "type2",
        "name": "Type 2: Paper 5 Graphical Analysis & Gradient Determination",
        "description": "Plot T² against L, find gradient and calculate percentage uncertainty.",
        "formulaSummary": "Gradient = 4π² / g => g = 4π² / m | %Uncertainty in g = %ΔL + 2·%ΔT",
        "traps": "⚠️ In calculating uncertainty for T², remember to DOUBLE the percentage uncertainty of T (since power is 2)."
      },
      {
        "id": "type3",
        "name": "Type 3: Small-angle Approximation & Energy Transformations",
        "description": "Conservation of energy between highest point and lowest point.",
        "formulaSummary": "v_max = √(2 · g · L · (1 - cos θ_0))",
        "traps": "⚠️ Maximum tension in string occurs at lowest point: T_max = m·g · (3 - 2 cos θ_0)."
      }
    ],
    "workedExample": {
      "question": "In a Cambridge A Level Physics experiment, a student measures the period T for various pendulum lengths L. The gradient of the linear graph of T² (s²) against L (m) is found to be 4.02 s²/m. (a) Calculate experimental value of g. (b) If the percentage uncertainty in T is 1.5% and in L is 1.0%, calculate the percentage uncertainty in g.",
      "thinkingAnalysis": "1) From formula T² = (4π² / g) · L, the gradient m = 4π² / g.\\n2) Therefore, g = 4π² / m = 4π² / 4.02 = 9.82 m/s².\\n3) Percentage uncertainty in g = %ΔL + 2 · %ΔT = 1.0% + 2 · 1.5% = 4.0%.",
      "solution": "1. Acceleration of free fall g:\\n   g = 4 · π² / Gradient = 4 · (3.14159)² / 4.02 = 39.478 / 4.02 = 9.82 m/s².\\n2. Percentage uncertainty in g:\\n   %Δg = %ΔL + 2 · (%ΔT)\\n   %Δg = 1.0% + 2 · (1.5%) = 1.0% + 3.0% = 4.0%.\\n3. Absolute uncertainty:\\n   Δg = 4.0% · 9.82 = 0.39 m/s² => g = (9.8 ± 0.4) m/s².",
      "examTrapWarning": "⚠️ Cambridge Paper 5 Trap: Forgetting to double the uncertainty of T when dealing with T²."
    },
    "practiceQuiz": {
      "question": "A simple pendulum has a period T = 1.60 s on Earth. If the length of the pendulum is quadrupled (4L), what is the new period?",
      "options": [
        "3.20 s",
        "6.40 s",
        "0.80 s",
        "4.00 s"
      ],
      "correctIndex": 0,
      "hint1": "Period is proportional to the square root of length: T ∝ √L.",
      "hint2": "When length increases by factor of 4, period increases by factor of √4 = 2. New T' = 2 · 1.60 s.",
      "explanation": "T' = 2π√(4L / g) = 2 · (2π√(L/g)) = 2 · 1.60 s = 3.20 s."
    }
  },
  "alevel-internalr": {
    "topic": "Cambridge A Level 9702: Electromotive Force (EMF), Internal Resistance r & Potential Dividers",
    "mindset": {
      "steps": [
        "Step 1: Terminal potential difference V and lost volts: E = V + I · r <=> V = E - I · r (where E is EMF, r is internal resistance, V is terminal p.d.).",
        "Step 2: Circuit current with load resistance R: I = E / (R + r). Terminal p.d.: V = I · R = E · [R / (R + r)].",
        "Step 3: V against I linear graph (Paper 3 practical): V = -r · I + E (y-intercept = EMF E; gradient magnitude = internal resistance r; x-intercept = short-circuit current I_sc = E/r).",
        "Step 4: Maximum power transfer theorem: Power delivered to load P_load = I² · R = E² · R / (R + r)² reaches maximum P_max = E² / (4r) when load matches internal resistance: R = r."
      ],
      "coreLaw": "E = I · (R + r) | V = E - I · r | P_max = E² / (4r) (when R = r)",
      "shortcuts": [
        "Efficiency of battery: η = (V / E) · 100% = [R / (R + r)] · 100% (At max power transfer R=r, efficiency is exactly 50%)",
        "Internal resistance from two different loads: r = (I1·R1 - I2·R2) / (I2 - I1) = (V1 - V2) / (I2 - I1)",
        "Short-circuit current (R = 0): I_sc = E / r"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Type 1: Calculating EMF E, Internal Resistance r & Lost Volts (A Level AS)",
        "description": "Apply E = V + Ir for different load resistances R.",
        "formulaSummary": "E = I1·(R1 + r) = I2·(R2 + r) => r = (I1·R1 - I2·R2) / (I2 - I1)",
        "traps": "⚠️ Voltmeter connected directly across battery terminals measures V = E - Ir, NOT EMF E (unless circuit is open I=0)."
      },
      {
        "id": "type2",
        "name": "Type 2: V against I Graphical Analysis (Cambridge Paper 3/5 Core Practical)",
        "description": "Find E from y-intercept and r from magnitude of gradient.",
        "formulaSummary": "V = -r · I + E => y-intercept = E; gradient = -r",
        "traps": "⚠️ Gradient is NEGATIVE (m = -r). The internal resistance r is the magnitude |m| (resistance is always positive)."
      },
      {
        "id": "type3",
        "name": "Type 3: Maximum Power Transfer Theorem",
        "description": "Find load resistance R for maximum power output from battery.",
        "formulaSummary": "P_out_max = E² / (4r) when R_load = r",
        "traps": "⚠️ At maximum power transfer (R = r), the efficiency of the battery is only 50% (half the power is wasted as heat in internal resistance)."
      }
    ],
    "workedExample": {
      "question": "A battery of EMF E and internal resistance r is connected across a variable resistor R. When R = 5.0 Ω, the current is 1.20 A. When R = 11.0 Ω, the current drops to 0.60 A. Calculate (a) the internal resistance r, and (b) the EMF E of the battery.",
      "thinkingAnalysis": "1) Write loop equation E = I · (R + r) for both cases:\\n   Case 1: E = 1.20 · (5.0 + r)\\n   Case 2: E = 0.60 · (11.0 + r)\\n2) Equate the two expressions to solve for r:\\n   1.20 · (5.0 + r) = 0.60 · (11.0 + r)\\n   6.0 + 1.20r = 6.6 + 0.60r => 0.60r = 0.6 => r = 1.0 Ω.\\n3) Substitute r = 1.0 Ω back to find E = 1.20 · (5.0 + 1.0) = 7.2 V.",
      "solution": "1. Setting up simultaneous equations:\\n   E = 1.20 · (5.0 + r)  --- (1)\\n   E = 0.60 · (11.0 + r) --- (2)\\n2. Equating (1) and (2):\\n   1.20 · (5.0 + r) = 0.60 · (11.0 + r)\\n   6.0 + 1.20r = 6.6 + 0.60r\\n   0.60r = 0.60 => r = 1.0 Ω.\\n3. Calculating EMF E:\\n   E = 1.20 · (5.0 + 1.0) = 7.20 V.",
      "examTrapWarning": "⚠️ Common Exam Mistake: Assuming V is constant when R changes. Voltage across terminals V changes as current I changes because lost volts Ir changes."
    },
    "practiceQuiz": {
      "question": "A battery with EMF E = 9.0 V and internal resistance r = 2.0 Ω is connected to a 10.0 Ω resistor. What is the terminal potential difference V across the battery?",
      "options": [
        "7.5 V",
        "9.0 V",
        "1.5 V",
        "6.0 V"
      ],
      "correctIndex": 0,
      "hint1": "Calculate circuit current first: I = E / (R + r) = 9.0 / (10.0 + 2.0).",
      "hint2": "Terminal voltage is V = I · R = E - I · r.",
      "explanation": "I = 9.0 / (10 + 2) = 0.75 A. Terminal p.d. V = I · R = 0.75 · 10.0 = 7.5 V (or V = 9.0 - 0.75 · 2.0 = 7.5 V)."
    }
  },
  "alevel-diffraction": {
    "topic": "Cambridge A Level 9702: Diffraction Grating, Wavelength Measurement & Angular Dispersion",
    "mindset": {
      "steps": [
        "Step 1: Grating spacing d from line density N (lines/mm): d = 1 / N = (1 · 10⁻³ m) / N.",
        "Step 2: Grating Equation for normal incidence: d · sin θ = n · λ (where n = 0, ±1, ±2... is diffraction order; θ is angle of diffraction).",
        "Step 3: Condition for maximum observable order: Since sin θ ≤ 1, highest order is n_max = ⌊d / λ⌋ (round DOWN to nearest integer).",
        "Step 4: Total number of observable bright maxima across all angles: N_total = 2 · n_max + 1."
      ],
      "coreLaw": "d · sin θ = n · λ | d = 1 / N | n_max = ⌊d / λ⌋",
      "shortcuts": [
        "Grating with 300 lines/mm: d = 10⁻³ / 300 = 3.33 · 10⁻⁶ m = 3.33 μm",
        "Angular dispersion D = Δθ / Δλ = n / (d · cos θ) (Higher order n provides wider angular separation between spectral lines)",
        "Spectral overlapping condition: (n + 1) · λ_violet ≤ n · λ_red"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Type 1: Calculating Wavelength λ & Angular Deviation θ (Cambridge AS Level)",
        "description": "Apply d·sin θ = n·λ to find wavelength or grating spacing d.",
        "formulaSummary": "λ = (d · sin θ) / n",
        "traps": "⚠️ Convert lines/mm to spacing d in METRES: e.g. 500 lines/mm => d = 10⁻³ / 500 = 2.0 · 10⁻⁶ m."
      },
      {
        "id": "type2",
        "name": "Type 2: Maximum Observable Order n_max & Total Bright Fringes",
        "description": "Find highest order visible using sin θ ≤ 1.",
        "formulaSummary": "n_max = ⌊d / λ⌋ | Total fringes = 2·n_max + 1",
        "traps": "⚠️ Always ROUND DOWN to the nearest integer. If d/λ = 3.8, then n_max = 3 (order 4 requires sin θ > 1 which is impossible)."
      },
      {
        "id": "type3",
        "name": "Type 3: White Light Continuous Spectra & Spectral Overlapping",
        "description": "Analyze overlapping of 2nd order and 3rd order spectra.",
        "formulaSummary": "θ_overlap when n1 · λ_red = (n1 + 1) · λ_violet",
        "traps": "⚠️ In diffraction grating, RED light is diffracted by a LARGER angle than BLUE light (opposite to prism dispersion where blue bends more!)."
      }
    ],
    "workedExample": {
      "question": "Monochromatic laser light of wavelength λ = 632.8 nm is incident normally on a diffraction grating with 400 lines per millimetre. (a) Calculate the angle of diffraction for the second-order maximum (n = 2). (b) Determine the maximum number of bright maxima that can be observed.",
      "thinkingAnalysis": "1) Calculate grating spacing d = (1 · 10⁻³ m) / 400 = 2.50 · 10⁻⁶ m.\\n2) For n = 2: d · sin θ = 2 · λ => sin θ = (2 · 632.8 · 10⁻⁹) / (2.50 · 10⁻⁶) = 0.50624.\\n   => θ = arcsin(0.50624) = 30.41°.\\n3) For max order: n_max = ⌊d / λ⌋ = ⌊(2.50 · 10⁻⁶) / (632.8 · 10⁻⁹)⌋ = ⌊3.95⌋ = 3.\\n   Total observable maxima = 2 · n_max + 1 = 2 · 3 + 1 = 7.",
      "solution": "1. Grating spacing d:\\n   d = 10⁻³ m / 400 = 2.50 · 10⁻⁶ m.\\n2. Angle for second-order maximum (n = 2):\\n   d · sin θ_2 = 2 · λ\\n   sin θ_2 = (2 · 632.8 · 10⁻⁹ m) / (2.50 · 10⁻⁶ m) = 0.50624\\n   => θ_2 = 30.4°.\\n3. Maximum order visible:\\n   n_max = d / λ = (2.50 · 10⁻⁶) / (632.8 · 10⁻⁹) = 3.95 => n_max = 3.\\n4. Total number of observable bright maxima:\\n   N_total = 2 · n_max + 1 = 2 · 3 + 1 = 7 (n = -3, -2, -1, 0, +1, +2, +3).",
      "examTrapWarning": "⚠️ Cambridge Exam Trap: Stating total maxima as 3 instead of 7 (must include central maximum n=0 and negative order maxima on opposite side!)."
    },
    "practiceQuiz": {
      "question": "A diffraction grating has spacing d = 2.0 μm. A light source produces a first-order maximum at θ = 17.5°. What is the wavelength of the light?",
      "options": [
        "601 nm",
        "500 nm",
        "450 nm",
        "650 nm"
      ],
      "correctIndex": 0,
      "hint1": "Use grating equation for n = 1: λ = d · sin θ.",
      "hint2": "λ = (2.0 · 10⁻⁶ m) · sin(17.5°) = 2.0 · 10⁻⁶ · 0.3007 = 6.01 · 10⁻⁷ m = 601 nm.",
      "explanation": "λ = d · sin θ / 1 = 2.0 · 10⁻⁶ · sin(17.5°) = 6.01 · 10⁻⁷ m = 601 nm."
    }
  },
  "alevel-resistivity": {
    "topic": "Cambridge A Level 9702: Electrical Resistivity ρ, Wire Resistance & Micrometer Screw Gauge",
    "mindset": {
      "steps": [
        "Step 1: Wire resistance formula: R = (ρ · L) / A (where ρ is electrical resistivity in Ω·m, L is wire length in m, A is cross-sectional area in m²).",
        "Step 2: Cross-sectional area of circular wire with diameter d: A = π · r² = π · (d / 2)² = (π · d²) / 4.",
        "Step 3: Combining formulas: R = (4 · ρ · L) / (π · d²) <=> ρ = (R · π · d²) / (4 · L).",
        "Step 4: Experimental graphical method (Paper 3 / Paper 5): Plot R (y-axis) against L (x-axis) => Straight line passing through origin with Gradient m = ρ / A = (4ρ) / (π d²)."
      ],
      "coreLaw": "R = (ρ · L) / A | A = (π · d²) / 4 | ρ = (R · A) / L",
      "shortcuts": [
        "If wire length is multiplied by n (stretched with constant volume V = A·L): Resistance increases by n² times (R' = n² · R)",
        "If wire diameter is doubled (2d): Cross-sectional area quadruples (4A) => Resistance decreases to 1/4",
        "Temperature dependence of metallic conductor resistance: R(T) = R_0 · [1 + α · (T - T_0)] (Resistance increases with temperature)"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Type 1: Calculating Resistivity ρ & Wire Resistance R (A Level AS)",
        "description": "Apply R = ρ·L/A with micrometer diameter measurements.",
        "formulaSummary": "ρ = (R · π · d²) / (4 · L)",
        "traps": "⚠️ Convert wire diameter d from mm to metres (m) before squaring! E.g. d = 0.40 mm = 0.40 · 10⁻³ m."
      },
      {
        "id": "type2",
        "name": "Type 2: Wire Stretching & Re-shaping (Volume Invariance)",
        "description": "When wire is stretched to twice its length, find new resistance.",
        "formulaSummary": "R' = n² · R (since Volume V = A·L is constant)",
        "traps": "⚠️ Do not assume area A remains constant when a wire is stretched. As length increases, area decreases."
      },
      {
        "id": "type3",
        "name": "Type 3: Cambridge Paper 5 Uncertainty Analysis in Resistivity",
        "description": "Evaluate percentage and absolute uncertainty in resistivity ρ.",
        "formulaSummary": "%Δρ = %ΔR + %ΔL + 2·%Δd",
        "traps": "⚠️ The largest source of uncertainty is usually the diameter d measured by micrometer, and its contribution is doubled."
      }
    ],
    "workedExample": {
      "question": "A uniform constantan wire of length L = 1.50 m and diameter d = 0.50 mm has a resistance of R = 3.75 Ω. Calculate (a) the resistivity ρ of constantan, (b) the resistance of another constantan wire of length 3.00 m and diameter 1.00 mm.",
      "thinkingAnalysis": "1) Calculate cross-sectional area A = π · (d/2)² = π · (0.25 · 10⁻³)² = 1.963 · 10⁻⁷ m².\\n2) Calculate resistivity ρ = R · A / L = (3.75 · 1.963 · 10⁻⁷) / 1.50 = 4.91 · 10⁻⁷ Ω·m.\\n3) For second wire: Length doubled (×2), diameter doubled => Area quadrupled (×4) => R2 = R1 · (2 / 4) = 3.75 / 2 = 1.88 Ω.",
      "solution": "1. Cross-sectional area A:\\n   A = π · (d / 2)² = π · (0.50 · 10⁻³ / 2)² = 1.9635 · 10⁻⁷ m².\\n2. Electrical resistivity ρ:\\n   ρ = (R · A) / L = (3.75 · 1.9635 · 10⁻⁷) / 1.50 = 4.91 · 10⁻⁷ Ω·m.\\n3. Resistance of second wire:\\n   R2 = ρ · L2 / A2 = R1 · (L2 / L1) · (d1 / d2)²\\n   R2 = 3.75 · (3.00 / 1.50) · (0.50 / 1.00)² = 3.75 · 2 · (0.25) = 1.88 Ω.",
      "examTrapWarning": "⚠️ Paper 3 Trap: Using diameter d in formula π·r² instead of radius r = d/2. Area A = π·(d/2)² = π·d² / 4."
    },
    "practiceQuiz": {
      "question": "A wire of resistance R is stretched uniformly until its length is tripled (3L). What is its new resistance?",
      "options": [
        "9R",
        "3R",
        "R/3",
        "R/9"
      ],
      "correctIndex": 0,
      "hint1": "Because volume V = A · L remains constant, tripling the length (3L) causes the cross-sectional area to become A/3.",
      "hint2": "New resistance R' = ρ · (3L) / (A/3) = 9 · (ρL/A) = 9R.",
      "explanation": "R' = ρ · (3L) / (A/3) = 3 / (1/3) · (ρL/A) = 9R."
    }
  },
  "alevel-potentiometer": {
    "topic": "Cambridge A Level 9702: Potentiometer Wire, Potential Gradient & Null Balance Method",
    "mindset": {
      "steps": [
        "Step 1: Understand principle of Potentiometer: A uniform wire AB of length L_total has a uniform potential gradient k = V_AB / L_total (V/m or V/cm).",
        "Step 2: Potential drop across length L_x: V_x = k · L_x = V_AB · (L_x / L_total).",
        "Step 3: Null balance condition: When the galvanometer reads zero current (I_G = 0), the test EMF exactly balances wire potential drop: E_test = V_x = V_AB · (L_x / L_total).",
        "Step 4: Advantages over ordinary digital voltmeter: At the balance point, zero current is drawn from the cell (I = 0) => Lost volts Ir = 0 => Measures the TRUE open-circuit EMF E without any loading error."
      ],
      "coreLaw": "E_x = k · L_x | E1 / E2 = L1 / L2 | k = V_wire / L_total",
      "shortcuts": [
        "Comparison of two cell EMFs: E1 / E2 = L1 / L2",
        "Internal resistance measurement: r = R · [(L1 - L2) / L2] (where L1 is balance length on open circuit, L2 on closed circuit across shunt R)",
        "Driver cell requirement: Driver EMF MUST exceed test cell EMF (E_driver > E_test) for balance point to fall on the wire"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Type 1: Finding Unknown EMF E_x from Balance Length L_x (A Level AS)",
        "description": "Apply E_x = E_driver · (L_x / 100) on a 1-metre potentiometer wire.",
        "formulaSummary": "E_x = E_driver · (L_x / L_total)",
        "traps": "⚠️ If Galvanometer deflects in the SAME direction along the whole wire, check if driver EMF is less than test cell EMF (E_driver < E_test) or if positive terminals are not connected together."
      },
      {
        "id": "type2",
        "name": "Type 2: Comparing Two Cells EMF (E1 / E2 = L1 / L2)",
        "description": "Determine ratio of EMFs without knowing driver voltage.",
        "formulaSummary": "E1 / E2 = L1 / L2",
        "traps": "⚠️ Balance length is independent of internal resistance r of the test cell (because at balance I_G = 0, so Ir = 0)."
      },
      {
        "id": "type3",
        "name": "Type 3: Measuring Internal Resistance r using Potentiometer",
        "description": "Measure open-circuit balance L1 and loaded balance L2 across shunt resistor R.",
        "formulaSummary": "r = R · [(L1 - L2) / L2]",
        "traps": "⚠️ L1 is balance length on open circuit (E), L2 is balance length on closed circuit with load R (terminal p.d. V)."
      }
    ],
    "workedExample": {
      "question": "A potentiometer wire AB of length 100.0 cm is connected to a 2.00 V driver cell of negligible internal resistance. A standard cell of EMF 1.48 V gives a balance point at length L_x = 74.0 cm. Another unknown cell gives a balance point at L_x = 60.0 cm. Calculate (a) the potential gradient along the wire, and (b) the EMF of the unknown cell.",
      "thinkingAnalysis": "1) Potential gradient k = V_wire / L_total = 2.00 V / 100.0 cm = 0.020 V/cm (or 2.00 V/m).\\n2) Use ratio of balance lengths: E_unknown / E_standard = L_unknown / L_standard.\\n3) E_unknown = E_standard · (L_unknown / L_standard) = 1.48 · (60.0 / 74.0) = 1.20 V.",
      "solution": "1. Potential gradient k along wire AB:\\n   k = E_driver / L_total = 2.00 V / 100.0 cm = 0.020 V/cm = 2.00 V/m.\\n2. EMF of the unknown cell:\\n   E_unknown = k · L_x = 0.020 V/cm · 60.0 cm = 1.20 V.\\n   (Alternatively: E_unknown / 1.48 = 60.0 / 74.0 => E_unknown = 1.20 V).",
      "examTrapWarning": "⚠️ Cambridge Exam Question: 'Why does a potentiometer measure EMF more accurately than a digital voltmeter?' => Answer: At the balance point, no current is drawn from the cell (I = 0), so there is no potential drop across its internal resistance (lost volts = 0)."
    }
  },
  "alevel-young": {
    "topic": "Young's Double Slit Interference, Path Difference & Fringe Spacing",
    "mindset": {
      "steps": [
        "Step 1: Optical path difference from two coherent slits S1, S2 to point M on screen: Δd = d2 - d1 = (a · x) / D (where a is slit separation, D is slit-to-screen distance, x is coordinate on screen).",
        "Step 2: Bright fringe condition (Constructive interference): Δd = k · λ <=> x_bright = k · (λ · D) / a (k = 0, ±1, ±2... with k = 0 as central bright fringe).",
        "Step 3: Dark fringe condition (Destructive interference): Δd = (k + 0.5) · λ <=> x_dark = (k + 0.5) · (λ · D) / a.",
        "Step 4: Fringe spacing i (distance between two consecutive bright or dark fringes): i = (λ · D) / a => Wavelength λ = (a · i) / D."
      ],
      "coreLaw": "i = (λ · D) / a | Δd = (a · x) / D | λ = (a · i) / D",
      "shortcuts": [
        "Distance between n consecutive bright fringes: L = (n - 1) · i => i = L / (n - 1)",
        "Coordinate of k-th bright fringe: x_k = k · i; k-th dark fringe: x_k = (k - 0.5) · i",
        "When apparatus immersed in liquid with refractive index n: Wavelength decreases λ' = λ / n => Fringe width decreases i' = i / n"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Type 1: Calculating Fringe Spacing i & Wavelength λ (Core Understanding)",
        "description": "Direct calculation from slit distance a, screen distance D, and fringe width i.",
        "formulaSummary": "λ = (a · i) / D | i = (λ · D) / a",
        "traps": "⚠️ Unit consistency: Convert all quantities to METRES (m) before computing: a (mm to ×10⁻³ m), D (m), i (mm to ×10⁻³ m) => λ in metres."
      },
      {
        "id": "type2",
        "name": "Type 2: Two-Wavelength Overlapping & Coincident Bright Fringes (Application)",
        "description": "Two wavelengths λ1, λ2 create coincident bright fringes at x_coincide.",
        "formulaSummary": "k1 · λ1 = k2 · λ2 => k1 / k2 = λ2 / λ1 (simplest integer ratio)",
        "traps": "⚠️ Shortest distance from central fringe to coincident bright fringe: x_min = k1 · i1 = k2 · i2."
      }
    ],
    "workedExample": {
      "question": "In a Young's double-slit experiment, slit separation a = 0.50 mm and screen distance D = 2.0 m. Using monochromatic laser light, the distance across 6 consecutive bright fringes is measured to be 12.0 mm. (a) Calculate the fringe spacing i. (b) Determine the wavelength λ and color of the laser light.",
      "thinkingAnalysis": "1) Distance across 6 consecutive bright fringes contains 5 fringe intervals: 5 · i = 12.0 mm => i = 2.40 mm = 2.40 · 10⁻³ m.\n2) Slit separation: a = 0.50 mm = 0.50 · 10⁻³ m.\n3) Screen distance: D = 2.0 m.\n4) Wavelength: λ = (a · i) / D = (0.50 · 10⁻³ · 2.40 · 10⁻³) / 2.0 = 6.0 · 10⁻⁷ m = 600 nm (Orange light).",
      "solution": "1. Fringe spacing i:\n   Across 6 consecutive bright fringes: L = (6 - 1) · i = 5 · i = 12.0 mm\n   => i = 12.0 mm / 5 = 2.40 mm = 2.40 × 10⁻³ m.\n2. Wavelength of light λ:\n   λ = (a · i) / D = (0.50 × 10⁻³ m × 2.40 × 10⁻³ m) / 2.0 m = 6.0 × 10⁻⁷ m = 600 nm (Orange-yellow light).",
      "examTrapWarning": "⚠️ Common error: Dividing 12.0 mm by 6 instead of 5 (6 fringes have 5 intervals)."
    },
    "practiceQuiz": {
      "question": "In a double slit experiment, a = 1.0 mm, D = 1.5 m, and λ = 600 nm. What is the distance from the central bright fringe to the 3rd dark fringe?",
      "options": [
        "2.25 mm",
        "2.70 mm",
        "1.80 mm",
        "0.90 mm"
      ],
      "correctIndex": 0,
      "hint1": "Fringe spacing: i = λ · D / a = (600 · 10⁻⁹ · 1.5) / 10⁻³ = 0.90 mm.",
      "hint2": "Coordinate of 3rd dark fringe: x_dark3 = (3 - 0.5) · i = 2.5 · 0.90 mm = 2.25 mm.",
      "explanation": "i = 0.90 mm. 3rd dark fringe position x = 2.5 · i = 2.5 · 0.90 = 2.25 mm."
    }
  },
  "alevel-photoelectric": {
    "topic": "Photoelectric Effect, Einstein's Quantum Theory & Stopping Potential",
    "mindset": {
      "steps": [
        "Step 1: Understand photon energy: E = h · f = (h · c) / λ (with h = 6.626 · 10⁻³⁴ J·s, c = 3 · 10⁸ m/s, 1 eV = 1.6 · 10⁻¹⁹ J).",
        "Step 2: Photoelectric Condition: Incident photon energy must be at least equal to the metal work function Φ: E ≥ Φ <=> λ ≤ λ_0 (where λ_0 = hc/Φ is the threshold wavelength).",
        "Step 3: Einstein's Photoelectric Equation: h · f = Φ + K_max (Energy of incoming photon = Work function + Maximum kinetic energy of photoelectrons).",
        "Step 4: Stopping Potential (Retarding Potential V_s): e · |V_s| = K_max = (1/2) · m · v_max² => |V_s| = (h · f - Φ) / e."
      ],
      "coreLaw": "h · f = Φ + (1/2) m v_max² | e · |V_s| = K_max | λ_0 = (h · c) / Φ",
      "shortcuts": [
        "Quick calculation: h · c ≈ 1242 eV·nm => λ_0 (nm) = 1242 / Φ (eV)",
        "Kinetic energy in eV: K_max (eV) = E (eV) - Φ (eV) => Stopping potential V_s (Volts) = K_max (eV)",
        "Linear graph of V_s vs f: V_s = (h/e) · f - (Φ/e) (Gradient = h/e, y-intercept = -Φ/e, x-intercept = f_0)"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Type 1: Photoelectric Condition & Work Function Φ (Core Understanding)",
        "description": "Calculate threshold wavelength λ_0 = hc/Φ and compare with incident wavelength λ.",
        "formulaSummary": "λ_0 = h·c / Φ | Emission condition: λ ≤ λ_0",
        "traps": "⚠️ Convert 1 eV = 1.6 · 10⁻¹⁹ J into Joules before calculating λ_0 in metres."
      },
      {
        "id": "type2",
        "name": "Type 2: Stopping Potential V_s & Maximum Initial Velocity v_max (Application)",
        "description": "Apply Einstein equation: e · |V_s| = hc/λ - Φ.",
        "formulaSummary": "e·|V_s| = h·c/λ - Φ | v_max = √(2 · e · |V_s| / m_e)",
        "traps": "⚠️ Electron mass m_e = 9.1 · 10⁻³¹ kg, charge |e| = 1.6 · 10⁻¹⁹ C."
      },
      {
        "id": "type3",
        "name": "Type 3: Determining Planck's Constant h from V_s vs f Graph (Advanced / Cambridge Paper 4)",
        "description": "Straight line graph intercepts frequency axis at threshold f_0 with gradient = h/e.",
        "formulaSummary": "h = gradient · e",
        "traps": "⚠️ Check frequency axis scale multiplier (e.g. 10¹⁴ Hz) when calculating slope."
      }
    ],
    "workedExample": {
      "question": "Light of wavelength λ = 350 nm is incident on a metal surface with work function Φ = 2.20 eV. Given h = 6.626 · 10⁻³⁴ J·s, c = 3 · 10⁸ m/s, m_e = 9.1 · 10⁻³¹ kg, and 1 eV = 1.6 · 10⁻¹⁹ J. (a) Determine if photoelectric emission occurs. (b) Calculate the maximum kinetic energy of emitted photoelectrons in eV and Joules. (c) Calculate the stopping potential V_s and maximum initial velocity v_max.",
      "thinkingAnalysis": "1) Threshold wavelength λ_0 = hc/Φ = (1.9878 · 10⁻²⁵) / (2.20 · 1.6 · 10⁻¹⁹) = 5.647 · 10⁻⁷ m = 565 nm.\n2) Since λ = 350 nm < λ_0 = 565 nm (or E_photon = 3.55 eV > Φ = 2.20 eV), photoelectric emission DOES occur.\n3) Max kinetic energy: K_max = E_photon - Φ = 3.55 eV - 2.20 eV = 1.35 eV = 1.35 · 1.6 · 10⁻¹⁹ = 2.16 · 10⁻¹⁹ J.\n4) Stopping potential |V_s| = K_max / e = 1.35 V.\n5) Max velocity v_max = √(2 · K_max / m_e) = √(2 · 2.16 · 10⁻¹⁹ / 9.1 · 10⁻³¹) = 6.89 · 10⁵ m/s.",
      "solution": "1. Threshold wavelength λ_0:\n   λ_0 = (h · c) / Φ = (6.626 · 10⁻³⁴ J·s · 3 · 10⁸ m/s) / (2.20 · 1.6 · 10⁻¹⁹ J) = 5.65 · 10⁻⁷ m = 565 nm.\n   Since incident λ = 350 nm ≤ 565 nm, photoelectric emission occurs.\n2. Maximum kinetic energy K_max:\n   Photon energy E = (h · c) / λ = 1.9878 · 10⁻²⁵ / (350 · 10⁻⁹) = 5.679 · 10⁻¹⁹ J = 3.55 eV.\n   K_max = E - Φ = 3.55 eV - 2.20 eV = 1.35 eV = 2.16 · 10⁻¹⁹ Joules.\n3. Stopping potential and maximum speed:\n   Stopping potential: |V_s| = 1.35 V.\n   Max velocity: v_max = √(2 · K_max / m_e) = √(2 · 2.16 · 10⁻¹⁹ / 9.1 · 10⁻³¹) = 6.89 · 10⁵ m/s.",
      "examTrapWarning": "⚠️ Common Exam Trap: Forgetting to subtract the work function Φ when calculating kinetic energy, or mixing up units of Joules and eV."
    },
    "practiceQuiz": {
      "question": "Monochromatic light of wavelength 400 nm falls on a metal with work function 2.0 eV. What is the stopping potential required to reduce the photocurrent to zero?",
      "options": [
        "1.11 V",
        "3.11 V",
        "2.00 V",
        "0.55 V"
      ],
      "correctIndex": 0,
      "hint1": "Photon energy E = 1242 / 400 = 3.105 eV.",
      "hint2": "Stopping potential |V_s| = (E - Φ) / e = (3.105 - 2.0) = 1.105 V ≈ 1.11 V.",
      "explanation": "E = hc / λ = (1.988 · 10⁻²⁵) / (4 · 10⁻⁷) = 4.97 · 10⁻¹⁹ J = 3.106 eV. Stopping potential V_s = 3.106 - 2.0 = 1.11 V."
    }
  },
  "alevel-radioactive": {
    "topic": "Law of Radioactive Decay, Half-Life & Activity Measurement",
    "mindset": {
      "steps": [
        "Step 1: Radioactive Decay Law: N(t) = N_0 · 2^(-t / T) = N_0 · e^(-λ · t) (where T is half-life, λ = ln 2 / T ≈ 0.693 / T is decay constant).",
        "Step 2: Number of decayed nuclei: ΔN(t) = N_0 - N(t) = N_0 · (1 - 2^(-t / T)).",
        "Step 3: Mass remaining: m(t) = m_0 · 2^(-t / T). Mass decayed: Δm(t) = m_0 · (1 - 2^(-t / T)).",
        "Step 4: Activity (rate of decay): A(t) = λ · N(t) = A_0 · 2^(-t / T) (Units: Becquerel Bq = 1 decay/s; 1 Curie Ci = 3.7 · 10¹⁰ Bq)."
      ],
      "coreLaw": "N(t) = N_0 · 2^(-t / T) | λ = (ln 2) / T | A = λ · N",
      "shortcuts": [
        "After n half-lives (t = n·T): Remaining fraction N/N_0 = 1 / 2^n; Decayed fraction ΔN/N_0 = 1 - 1 / 2^n",
        "Ratio of daughter nuclei to remaining parent nuclei: N_daughter / N_parent = 2^(t / T) - 1",
        "Radiocarbon dating: t = (T / ln 2) · ln(A_0 / A)"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Type 1: Calculating Remaining/Decayed Fraction after Time t (Core Understanding)",
        "description": "Apply exponential decay law with half-life T.",
        "formulaSummary": "N(t) = N_0 · 2^(-t / T) | ΔN = N_0 · (1 - 2^(-t / T))",
        "traps": "⚠️ Distinguish between remaining quantity N(t) and decayed quantity ΔN(t)."
      },
      {
        "id": "type2",
        "name": "Type 2: Daughter/Parent Nuclei Ratio & Radioactive Dating (Application)",
        "description": "Determine sample age from isotope ratios.",
        "formulaSummary": "N_daughter / N_parent = 2^(t / T) - 1",
        "traps": "⚠️ If problem specifies MASS ratio, remember to multiply by mass number ratio (A_daughter / A_parent)."
      }
    ],
    "workedExample": {
      "question": "A sample of Polonium-210 (half-life T = 138 days) undergoes alpha decay to form Lead-206. Initially, the sample is pure Polonium. After how many days will the ratio of Lead nuclei to remaining Polonium nuclei equal 3?",
      "thinkingAnalysis": "1) Remaining Polonium nuclei: N_Po = N_0 · 2^(-t/T).\n2) Lead nuclei produced: N_Pb = N_0 · (1 - 2^(-t/T)).\n3) Ratio: N_Pb / N_Po = 2^(t/T) - 1 = 3 => 2^(t/T) = 4 = 2² => t/T = 2 => t = 2T = 276 days.",
      "solution": "1. Ratio equation:\n   N_Pb / N_Po = (N_0 / N_Po) - 1 = 2^(t / T) - 1\n2. Substitute ratio = 3:\n   2^(t / T) - 1 = 3\n   <=> 2^(t / T) = 4 = 2²\n   <=> t / T = 2\n3. Age of sample:\n   t = 2 · T = 2 · 138 days = 276 days.",
      "examTrapWarning": "⚠️ Note: If question asked for mass ratio, include mass number ratio 206/210."
    },
    "practiceQuiz": {
      "question": "A radioactive isotope has a half-life of 20 days. After 60 days, what percentage of the initial nuclei has decayed?",
      "options": [
        "87.5%",
        "12.5%",
        "75%",
        "25%"
      ],
      "correctIndex": 0,
      "hint1": "Number of elapsed half-lives: k = 60 / 20 = 3.",
      "hint2": "Remaining fraction = (1/2)³ = 1/8 = 12.5%. Decayed fraction = 100% - 12.5% = 87.5%.",
      "explanation": "After 3 half-lives: N_rem = 12.5% => Decayed = 87.5%."
    }
  },
  "alevel-boyle": {
    "topic": "Cambridge A Level 9702: Boyle's Law, Ideal Gas Equation & Molecular Kinetic Theory",
    "mindset": {
      "steps": [
        "Step 1: Boyle-Mariotte Law (Isothermal process T = const): Pressure P is inversely proportional to volume V: P · V = const <=> P1 · V1 = P2 · V2.",
        "Step 2: Linearization: Plotting P against 1/V yields a straight line through the origin with gradient = n·R·T. P vs V is an isothermal hyperbola.",
        "Step 3: Ideal Gas Equation: P · V = n · R · T = (m / M) · R · T = N · k_B · T (with R = 8.314 J/(mol·K), k_B = 1.38·10⁻²³ J/K, T(K) = t(°C) + 273.15).",
        "Step 4: Molecular kinetic theory: Mean translational kinetic energy: E_k = (3/2) · k_B · T. Root-mean-square speed: c_rms = √[3·R·T / M] = √[3·k_B·T / m]."
      ],
      "coreLaw": "P1 · V1 = P2 · V2 | P · V = n · R · T | E_k = (3/2) · k_B · T",
      "shortcuts": [
        "Isothermal compression: Volume reduced by n times => Pressure increases n times",
        "Isothermal gradient: Higher curves on P-V graph correspond to higher temperatures (T2 > T1)",
        "Work done during isobaric expansion: W = P · ΔV = P · (V2 - V1)"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Type 1: Boyle's Law Calculations & P vs 1/V Linear Graphs (Cambridge AS/A2)",
        "description": "Apply P1·V1 = P2·V2 to find final pressure or volume.",
        "formulaSummary": "P2 = P1 · V1 / V2",
        "traps": "⚠️ Match units of pressure and volume on both sides (e.g. kPa and cm³)."
      },
      {
        "id": "type2",
        "name": "Type 2: Ideal Gas Law & Number of Moles / Molecules (Paper 4)",
        "description": "Calculate pressure P, mass m, or molecular count N using PV = nRT.",
        "formulaSummary": "P · V = (N / N_A) · R · T | N = P·V / (k_B · T)",
        "traps": "⚠️ Temperature T MUST be in KELVIN (K = °C + 273). Using Celsius will result in total calculation failure."
      },
      {
        "id": "type3",
        "name": "Type 3: Root-Mean-Square Speed c_rms & Thermal Energy",
        "description": "Calculate speed of gas molecules at absolute temperature T.",
        "formulaSummary": "c_rms = √(3·R·T / M_kg) | E_total = (3/2) · n · R · T",
        "traps": "⚠️ Molar mass M MUST be in kg/mol (e.g. Helium M = 4 g/mol = 4 · 10⁻³ kg/mol)."
      }
    ],
    "workedExample": {
      "question": "A cylinder contains 0.050 m³ of ideal gas at a pressure of 2.0 · 10⁵ Pa and temperature 27°C. The gas is compressed isothermally until its volume is reduced to 0.020 m³. (a) Calculate the final pressure. (b) Calculate the number of moles n of gas in the cylinder.",
      "thinkingAnalysis": "1) Isothermal compression: P1 · V1 = P2 · V2 => P2 = (2.0 · 10⁵ · 0.050) / 0.020 = 5.0 · 10⁵ Pa.\n2) Temperature in Kelvin: T = 27 + 273 = 300 K.\n3) Moles n = (P1 · V1) / (R · T) = (2.0 · 10⁵ · 0.050) / (8.314 · 300) = 4.01 mol.",
      "solution": "1. Final pressure P2 using Boyle's Law:\n   P1 · V1 = P2 · V2\n   P2 = (2.0 · 10⁵ Pa · 0.050 m³) / 0.020 m³ = 5.0 · 10⁵ Pa (500 kPa).\n2. Absolute temperature in Kelvin:\n   T = 27 + 273.15 = 300.15 K ≈ 300 K.\n3. Number of moles n:\n   P · V = n · R · T\n   => n = (P · V) / (R · T) = (2.0 · 10⁵ · 0.050) / (8.314 · 300) = 4.01 mol.",
      "examTrapWarning": "⚠️ Cambridge Paper 4 Trap: Forgetting to convert temperature to Kelvin (dividing by 27 instead of 300 K yields n = 44.5 mol, which loses all marks)."
    },
    "practiceQuiz": {
      "question": "An ideal gas has pressure P at volume V. If the volume is decreased by 25% at constant temperature, what is the new pressure?",
      "options": [
        "1.33 P (4/3 P)",
        "1.25 P",
        "0.75 P",
        "1.50 P"
      ],
      "correctIndex": 0,
      "hint1": "Decreased by 25% means new volume V' = 0.75V = (3/4)V.",
      "hint2": "By Boyle's Law: P' · V' = P · V => P' = P / 0.75 = 4/3 P ≈ 1.33 P.",
      "explanation": "V' = 0.75 V => P' = P · V / (0.75 V) = 4/3 P ≈ 1.33 P."
    }
  },
  "alevel-resonance-tube": {
    "topic": "Cambridge A Level 9702: Air Column Resonance Tube, End Correction & Speed of Sound",
    "mindset": {
      "steps": [
        "Step 1: One-end closed resonance tube forms standing acoustic wave with a Node at water surface and an Antinode slightly outside the tube mouth.",
        "Step 2: End correction c ≈ 0.6 · r (where r is internal tube radius):\n   - 1st resonance: L1 + c = λ / 4.\n   - 2nd resonance: L2 + c = 3λ / 4.",
        "Step 3: Eliminate end correction by subtraction: (L2 + c) - (L1 + c) = (3λ/4) - (λ/4) = λ / 2 => λ = 2 · (L2 - L1).",
        "Step 4: Speed of sound in air: v = f · λ = 2 · f · (L2 - L1). End correction: c = (L2 - 3L1) / 2."
      ],
      "coreLaw": "v = 2 · f · (L2 - L1) | λ = 2 · (L2 - L1) | c = (L2 - 3·L1) / 2",
      "shortcuts": [
        "Neglecting end correction: L2 ≈ 3 · L1",
        "If L2 > 3L1: End correction c > 0 (antinode formed outside tube by distance c)",
        "Speed of sound vs temperature: v(T) ≈ 331.3 + 0.6 · t (°C)"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Type 1: Determining Speed of Sound v from Resonance Lengths L1 and L2 (Paper 3)",
        "description": "Apply v = 2f(L2 - L1) to eliminate end correction c.",
        "formulaSummary": "v = 2 · f · (L2 - L1)",
        "traps": "⚠️ Convert lengths L1, L2 from cm to METRES (m) before computing speed v in m/s."
      },
      {
        "id": "type2",
        "name": "Type 2: Calculating End Correction c & Tube Radius r",
        "description": "Find displacement of antinode beyond open end of tube.",
        "formulaSummary": "c = (L2 - 3·L1) / 2 | r = c / 0.6",
        "traps": "⚠️ The antinode forms slightly outside the open mouth by end correction c."
      }
    ],
    "workedExample": {
      "question": "In a resonance tube experiment using a tuning fork of frequency f = 512 Hz, the first resonance occurs at L1 = 15.5 cm and the second at L2 = 49.0 cm. (a) Calculate the speed of sound in air. (b) Calculate the end correction c of the tube.",
      "thinkingAnalysis": "1) Wavelength: λ = 2 · (L2 - L1) = 2 · (49.0 - 15.5) = 2 · 33.5 cm = 67.0 cm = 0.670 m.\n2) Speed: v = f · λ = 512 · 0.670 = 343.04 m/s.\n3) End correction: c = (L2 - 3L1) / 2 = (49.0 - 46.5) / 2 = 1.25 cm = 0.0125 m.",
      "solution": "1. Wavelength of sound wave:\n   λ = 2 · (L2 - L1) = 2 · (0.490 m - 0.155 m) = 0.670 m.\n2. Speed of sound in air v:\n   v = f · λ = 512 Hz · 0.670 m = 343.0 m/s.\n3. End correction c:\n   c = (L2 - 3 · L1) / 2 = (49.0 cm - 46.5 cm) / 2 = 1.25 cm.",
      "examTrapWarning": "⚠️ Practical Trap: Using v = 4 · f · L1 directly assumes c = 0, giving v = 317.4 m/s (~8% error). Always use 2-resonance subtraction v = 2f(L2 - L1)!"
    },
    "practiceQuiz": {
      "question": "A tuning fork of frequency 400 Hz resonates with a tube at L1 = 20 cm and L2 = 62.5 cm. What is the experimental speed of sound?",
      "options": [
        "340 m/s",
        "320 m/s",
        "360 m/s",
        "300 m/s"
      ],
      "correctIndex": 0,
      "hint1": "Apply v = 2 · f · (L2 - L1).",
      "hint2": "L2 - L1 = 62.5 cm - 20 cm = 42.5 cm = 0.425 m. v = 2 · 400 · 0.425 = 340 m/s.",
      "explanation": "v = 2 · 400 · (0.625 - 0.200) = 800 · 0.425 = 340 m/s."
    }
  },
  "igcse-sound": {
    "topic": "Cambridge IGCSE: Speed of Sound, Echo Method & Oscilloscope (CRO)",
    "mindset": {
      "steps": [
        "Step 1: Sound is a mechanical longitudinal wave requiring a medium (CANNOT travel through a vacuum).",
        "Step 2: Echo method for measuring speed of sound: Sound travels to obstacle at distance d and reflects back in time t => Speed v = 2 · d / t.",
        "Step 3: Oscilloscope (CRO) waveform analysis: Period T = number of horizontal divisions · Timebase setting (s/div). Frequency f = 1 / T. Wavelength λ = v / f.",
        "Step 4: Sound speed in media: v_solids > v_liquids > v_gases (Steel ~ 5000 m/s > Water ~ 1500 m/s > Air ~ 340 m/s)."
      ],
      "coreLaw": "v = 2 · d / t | T = n · Timebase | f = 1 / T",
      "shortcuts": [
        "Thunder rule: Count seconds between lightning flash and thunder, divide by 3 for distance in km (d ≈ t / 3 km)",
        "Loudness corresponds to wave AMPLITUDE",
        "Pitch corresponds to wave FREQUENCY"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Type 1: Echo Reflection & Distance Measurement (IGCSE Core/Extended)",
        "description": "Apply v = 2d / t to find distance to reflecting wall or water depth (Sonar).",
        "formulaSummary": "d = (v · t) / 2",
        "traps": "⚠️ Remember to DIVIDE by 2 because the sound pulse travels to the wall and back (two-way distance = 2d)."
      },
      {
        "id": "type2",
        "name": "Type 2: Oscilloscope CRO Screen Waveform Analysis (Cambridge Paper 2/4)",
        "description": "Calculate period T and frequency f from timebase setting.",
        "formulaSummary": "T = number of divisions · Timebase setting | f = 1 / T",
        "traps": "⚠️ Convert timebase units (e.g. 5 ms/div = 5 · 10⁻³ s/div; 200 μs/div = 200 · 10⁻⁶ s/div) before calculating frequency f in Hz."
      }
    ],
    "workedExample": {
      "question": "A ship uses an echo-sounder (Sonar) to measure the ocean depth. An ultrasound pulse is sent downwards into seawater and the reflected echo is detected 0.60 seconds later. The speed of sound in seawater is 1500 m/s. (a) Calculate the ocean depth. (b) If ultrasound frequency is 50 kHz, calculate its wavelength.",
      "thinkingAnalysis": "1) Pulse travels down and back: 2 · depth = v · t => depth = (1500 · 0.60) / 2 = 450 m.\n2) Frequency f = 50,000 Hz.\n3) Wavelength λ = v / f = 1500 / 50,000 = 0.030 m = 3.0 cm.",
      "solution": "1. Ocean depth d:\n   Total distance = 2 · d = v · t\n   => d = (v · t) / 2 = (1500 m/s · 0.60 s) / 2 = 450 m.\n2. Wavelength in seawater λ:\n   λ = v / f = 1500 m/s / 50000 Hz = 0.030 m = 3.0 cm.",
      "examTrapWarning": "⚠️ Marking Scheme Trap: Forgetting to divide by 2 in echo problems gives 900 m (WRONG!)."
    },
    "practiceQuiz": {
      "question": "On an oscilloscope screen, one complete wave cycle of a sound wave occupies 4 horizontal divisions. The timebase setting is 2.5 ms/div. What is the frequency of the sound wave?",
      "options": [
        "100 Hz",
        "250 Hz",
        "50 Hz",
        "400 Hz"
      ],
      "correctIndex": 0,
      "hint1": "Calculate period T = 4 divisions · 2.5 ms/div = 10 ms = 0.010 s.",
      "hint2": "Frequency f = 1 / T = 1 / 0.010 s = 100 Hz.",
      "explanation": "T = 4 · 2.5 ms = 10 ms = 0.01 s => f = 1 / 0.01 = 100 Hz."
    }
  },
  "g12-nuclear-energy": {
    "topic": "Mass Defect, Nuclear Binding Energy & Nuclear Reaction Energetics",
    "mindset": {
      "steps": [
        "Step 1: Einstein Mass-Energy Equivalence: E = m · c² (where 1 u = 931.5 MeV/c²; 1 eV = 1.6 · 10⁻¹⁹ J; 1 MeV = 10⁶ eV = 1.6 · 10⁻¹³ J).",
        "Step 2: Mass defect of nucleus X (A, Z): Δm = [Z · m_p + (A - Z) · m_n] - m_X.",
        "Step 3: Binding Energy: E_b = Δm · c² = Δm (u) · 931.5 (MeV). Binding energy per nucleon: ε = E_b / A (MeV/nucleon) - indicator of NUCLEAR STABILITY (peaks at Fe-56 with ~8.8 MeV/nucleon).",
        "Step 4: Energy released in nuclear reaction A + B -> C + D: Q = (m_reactants - m_products) · c² = E_b(products) - E_b(reactants)."
      ],
      "coreLaw": "Δm = Z·m_p + (A-Z)·m_n - m_X | E_b = Δm · c² | ε = E_b / A",
      "shortcuts": [
        "Uranium-235 fission: Releases ~200 MeV per fission event",
        "Deuterium-Tritium fusion: D + T -> He + n + 17.6 MeV (yields ~4x more energy per unit mass than fission)",
        "Conservation laws in nuclear reactions: Mass number A, Atomic number Z, Momentum p, Total energy (Rest mass NOT conserved)"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Type 1: Binding Energy per Nucleon & Nuclear Stability (Core Understanding)",
        "description": "Calculate Δm and binding energy per nucleon to compare stability.",
        "formulaSummary": "ε = [Z·m_p + (A-Z)·m_n - m_X] · 931.5 / A",
        "traps": "⚠️ Higher total binding energy does NOT mean more stable! Stability is determined solely by BINDING ENERGY PER NUCLEON ε = E_b / A."
      },
      {
        "id": "type2",
        "name": "Type 2: Energy Released in Nuclear Fission and Fusion Reactions (Application)",
        "description": "Calculate Q-value using rest masses or binding energies.",
        "formulaSummary": "Q = (m_before - m_after) · c² = E_b_after - E_b_before",
        "traps": "⚠️ Notice reverse order: When using rest masses: Q = m_before - m_after. When using binding energy: Q = E_b_after - E_b_before."
      }
    ],
    "workedExample": {
      "question": "Given proton mass m_p = 1.007276 u, neutron mass m_n = 1.008665 u, and Helium-4 nucleus mass m_He = 4.001506 u. Take 1 u = 931.5 MeV/c². (a) Calculate the mass defect and binding energy of Helium-4. (b) Calculate the binding energy per nucleon.",
      "thinkingAnalysis": "1) Helium-4 has Z = 2 protons and A - Z = 2 neutrons.\n2) Mass of separate nucleons: m_total = 2 · 1.007276 + 2 · 1.008665 = 4.031882 u.\n3) Mass defect: Δm = 4.031882 - 4.001506 = 0.030376 u.\n4) Binding energy: E_b = 0.030376 · 931.5 = 28.295 MeV.\n5) Per nucleon: ε = 28.295 / 4 = 7.074 MeV/nucleon.",
      "solution": "1. Mass defect Δm:\n   Δm = 2 · m_p + 2 · m_n - m_He = 4.031882 u - 4.001506 u = 0.030376 u.\n2. Binding energy E_b:\n   E_b = Δm · c² = 0.030376 u · (931.5 MeV/u) = 28.30 MeV.\n3. Binding energy per nucleon ε:\n   ε = E_b / A = 28.295 MeV / 4 = 7.07 MeV/nucleon.",
      "examTrapWarning": "⚠️ Rounding trap: Keep at least 5 to 6 decimal places when subtracting atomic mass units."
    },
    "practiceQuiz": {
      "question": "In the fusion reaction: D + T -> He-4 + n + 17.6 MeV. How much total energy is released when 1 gram of Helium-4 is completely synthesized?",
      "options": [
        "4.24 · 10¹¹ J (424 GJ)",
        "1.06 · 10¹¹ J",
        "2.12 · 10¹¹ J",
        "8.48 · 10¹¹ J"
      ],
      "correctIndex": 0,
      "hint1": "1 mole of Helium (4 g) has N_A = 6.022 · 10²³ atoms. In 1 g: N = 0.25 · N_A.",
      "hint2": "Total energy E = N · 17.6 MeV · 1.6 · 10⁻¹³ J/MeV = 4.24 · 10¹¹ J = 424 GJ.",
      "explanation": "E = (1/4 · 6.022·10²³) · 17.6 · 1.6·10⁻¹³ = 4.24 · 10¹¹ J = 424 GJ."
    }
  },
  "g12-bohr-atom": {
    "topic": "Bohr Model of the Atom, Energy Levels & Hydrogen Emission Spectra",
    "mindset": {
      "steps": [
        "Step 1: Bohr's 1st Postulate (Stationary states): Electrons exist in stable non-radiating orbits. Orbit radius: r_n = n² · r_0 (where r_0 = 5.3 · 10⁻¹¹ m = 0.53 Å is Bohr radius; n = 1, 2, 3...).",
        "Step 2: Energy of stationary level n: E_n = -13.6 / n² (eV) (n = 1 is ground state E_1 = -13.6 eV; n ≥ 2 are excited states).",
        "Step 3: Bohr's 2nd Postulate (Photon emission & absorption): Transition from higher level E_m to lower level E_n emits a photon: h · f = (h · c) / λ = E_m - E_n.",
        "Step 4: Spectral series of Hydrogen:\n   - Lyman Series (transition down to n = 1): Entirely in ULTRAVIOLET region.\n   - Balmer Series (transition down to n = 2): 4 visible lines (Red H_alpha 3->2, Cyan H_beta 4->2, Blue H_gamma 5->2, Violet H_delta 6->2) and UV lines.\n   - Paschen Series (transition down to n = 3): Entirely in INFRARED region."
      ],
      "coreLaw": "r_n = n² · r_0 | E_n = -13.6 / n² (eV) | h · f = h c / λ = E_m - E_n",
      "shortcuts": [
        "Maximum number of emission spectral lines from an excited gas at level n: N_max = n · (n - 1) / 2",
        "Longest wavelength in series: Transition between adjacent levels (n+1 -> n) => λ_max",
        "Shortest wavelength (series limit): Transition from infinity (∞ -> n) => λ_min = hc / |E_n|"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Type 1: Calculating Orbit Radius r_n and Energy Levels E_n (Core Understanding)",
        "description": "Apply r_n = n² · r_0 and E_n = -13.6 / n² eV.",
        "formulaSummary": "r_n = n² · 0.53 Å | E_n = -13.6 / n² eV",
        "traps": "⚠️ Orbit radius scales with the SQUARE of principal quantum number n (r_2 = 4r_0, r_3 = 9r_0, r_4 = 16r_0)."
      },
      {
        "id": "type2",
        "name": "Type 2: Calculating Emitted Photon Wavelength λ during Level Transitions (Application)",
        "description": "Calculate λ = hc / (E_m - E_n).",
        "formulaSummary": "λ = (1.9864 · 10⁻²⁵ J·m) / [(E_m - E_n) · 1.6 · 10⁻¹⁹ J]",
        "traps": "⚠️ Convert energy difference from eV to Joules by multiplying by 1.6 · 10⁻¹⁹ before calculating wavelength."
      }
    ],
    "workedExample": {
      "question": "A hydrogen atom in excited level M (n = 3) transitions to excited level L (n = 2), emitting the red H_alpha spectral line. Given h = 6.626 · 10⁻³⁴ J·s, c = 3 · 10⁸ m/s, 1 eV = 1.6 · 10⁻¹⁹ J. Calculate the wavelength λ of the H_alpha emission line.",
      "thinkingAnalysis": "1) Energy at n = 3: E_3 = -13.6 / 3² = -1.511 eV.\n2) Energy at n = 2: E_2 = -13.6 / 2² = -3.400 eV.\n3) Photon energy: ΔE = E_3 - E_2 = -1.511 - (-3.400) = 1.889 eV = 3.0224 · 10⁻¹⁹ J.\n4) Wavelength: λ = hc / ΔE = (1.9878 · 10⁻²⁵) / (3.0224 · 10⁻¹⁹) = 6.577 · 10⁻⁷ m = 658 nm.",
      "solution": "1. Energy levels n = 3 and n = 2:\n   E_3 = -13.6 / 9 = -1.511 eV.\n   E_2 = -13.6 / 4 = -3.400 eV.\n2. Photon energy emitted:\n   ΔE = E_3 - E_2 = 1.889 eV = 3.0224 × 10⁻¹⁹ J.\n3. Wavelength of H_alpha line:\n   λ = (h · c) / ΔE = (6.626 × 10⁻³⁴ × 3.0 × 10⁸) / (3.0224 × 10⁻¹⁹) = 6.58 × 10⁻⁷ m = 658 nm.",
      "examTrapWarning": "⚠️ Forgetting to convert eV to Joules when evaluating hc/ΔE results in a 10¹⁹ error."
    },
    "practiceQuiz": {
      "question": "A gas of hydrogen atoms is excited to level N (n = 4). When transitioning down to lower energy states, what is the maximum number of distinct spectral lines that can be emitted?",
      "options": [
        "6 lines",
        "4 lines",
        "3 lines",
        "12 lines"
      ],
      "correctIndex": 0,
      "hint1": "Apply maximum spectral line formula: N = n · (n - 1) / 2.",
      "hint2": "With n = 4: N = 4 · 3 / 2 = 6 lines (4->3, 4->2, 4->1, 3->2, 3->1, 2->1).",
      "explanation": "N = n(n - 1) / 2 = 4 · 3 / 2 = 6 lines."
    }
  },
  "g12-thermodynamics-1st": {
    "topic": "First Law of Thermodynamics, Specific Heat Capacity & Phase Transitions",
    "mindset": {
      "steps": [
        "Step 1: Thermal energy for temperature change: Q = m · c · ΔT = m · c · (T_final - T_initial) (where c is specific heat capacity J/(kg·K)).",
        "Step 2: Latent heat for phase transitions (at constant temperature):\n   - Melting / Freezing: Q = L_f · m (where L_f is specific latent heat of fusion J/kg).\n   - Vaporization / Condensation: Q = L_v · m (where L_v is specific latent heat of vaporization J/kg).",
        "Step 3: First Law of Thermodynamics: ΔU = Q + W (or ΔU = Q - W_by_system).",
        "Step 4: Standard sign conventions in Thermodynamics:\n   - Q > 0: Heat ABSORBED by system from surroundings.\n   - Q < 0: Heat RELEASED by system to surroundings.\n   - W > 0: Work done ON system by external force (compression, volume decreases ΔV < 0).\n   - W < 0: Work done BY system on surroundings (expansion against pressure, W = -P · ΔV < 0)."
      ],
      "coreLaw": "ΔU = Q + W | Q = m · c · ΔT | Q = L · m | W = -P · ΔV",
      "shortcuts": [
        "Isochoric process (V = const): No work done W = 0 => ΔU = Q_V",
        "Isothermal process (T = const): Ideal gas internal energy unchanged ΔU = 0 => Q = -W",
        "Adiabatic process (insulated Q = 0): ΔU = W (adiabatic compression heats gas rapidly)"
      ]
    },
    "problemTypes": [
      {
        "id": "type1",
        "name": "Type 1: Applying 1st Law of Thermodynamics ΔU = Q + W (Core Understanding)",
        "description": "Determine signs of Q and W to calculate change in internal energy ΔU.",
        "formulaSummary": "ΔU = Q + W (with proper sign conventions)",
        "traps": "⚠️ 'Gas expands doing 50 J of work and absorbs 80 J of heat' => W = -50 J, Q = +80 J => ΔU = +30 J."
      },
      {
        "id": "type2",
        "name": "Type 2: Heat Balance & Phase Change Curves (Application)",
        "description": "Heat lost by hot bodies = Heat gained by cold bodies.",
        "formulaSummary": "Q_lost = Q_gained <=> m1·c1·(T1 - T_eq) = m2·c2·(T_eq - T2)",
        "traps": "⚠️ When melting ice at 0°C, include latent heat of fusion Q = m · L_f before calculating warming of liquid water."
      }
    ],
    "workedExample": {
      "question": "A quantity of gas in a cylinder absorbs Q = 150 J of heat from a burner. The gas expands, pushing the piston outward and performing W_by = 90 J of work on the surroundings. (a) Determine the change in internal energy ΔU of the gas. (b) Does the internal energy increase or decrease?",
      "thinkingAnalysis": "1) Heat absorbed: Q = +150 J.\n2) Work done BY gas on surroundings => Work received by gas is W = -90 J.\n3) First Law: ΔU = Q + W = +150 + (-90) = +60 J.\n4) Since ΔU = +60 J > 0, internal energy INCREASES by 60 J (temperature rises).",
      "solution": "1. Algebraic quantities:\n   Q = +150 J (Heat absorbed by gas).\n   W = -90 J (Work done by expanding gas on surroundings).\n2. Change in internal energy:\n   ΔU = Q + W = (+150 J) + (-90 J) = +60 J.\n3. Conclusion: Internal energy of the gas increases by 60 Joules.",
      "examTrapWarning": "⚠️ Sign trap: Incorrectly setting W = +90 J gives ΔU = 240 J (WRONG because expansion costs internal energy)."
    },
    "practiceQuiz": {
      "question": "A gas is compressed by an external work of 120 J. During compression, it releases 40 J of heat to the surroundings. What is the change in internal energy of the gas?",
      "options": [
        "+80 J (increases by 80 J)",
        "+160 J",
        "-80 J",
        "-160 J"
      ],
      "correctIndex": 0,
      "hint1": "Work done on gas: W = +120 J. Heat released: Q = -40 J.",
      "hint2": "Change in internal energy: ΔU = Q + W = -40 + 120 = +80 J.",
      "explanation": "ΔU = Q + W = (-40) + (+120) = +80 J (internal energy increases by 80 J)."
    }
  }
};

// Backward compatibility export
export const EXAM_METHODOLOGY_DATA = EXAM_METHODOLOGY_DATA_VI;

// Smart bilingual methodology retriever

// Aliasing g12-spring <-> g12-vertical-spring for 100% ID compatibility
if (EXAM_METHODOLOGY_DATA_VI["g12-vertical-spring"] && !EXAM_METHODOLOGY_DATA_VI["g12-spring"]) {
  EXAM_METHODOLOGY_DATA_VI["g12-spring"] = EXAM_METHODOLOGY_DATA_VI["g12-vertical-spring"];
}
if (EXAM_METHODOLOGY_DATA_EN["g12-spring"] && !EXAM_METHODOLOGY_DATA_EN["g12-vertical-spring"]) {
  EXAM_METHODOLOGY_DATA_EN["g12-vertical-spring"] = EXAM_METHODOLOGY_DATA_EN["g12-spring"];
}

export const getExamMethodologyForExp = (expId, category = "Cơ học", grade = "10", lang = "vi") => {
  const isEn = lang === 'en';

  if (isEn) {
    if (EXAM_METHODOLOGY_DATA_EN[expId]) {
      return EXAM_METHODOLOGY_DATA_EN[expId];
    }
    // Fallback for English
    const catName = category === "Cơ học" ? "Mechanics" : category === "Nhiệt học" ? "Thermodynamics" : category === "Điện - Từ" ? "Electricity & Magnetism" : category === "Quang học" ? "Optics" : "Modern Physics";
    return {
      topic: `Core Exam Strategy & Problem-Solving Methodology: ${catName}`,
      mindset: {
        steps: [
          "Step 1: Read the problem carefully, list given quantities and convert all units to standard SI units (m, kg, s, A, V, J...).",
          "Step 2: Draw a clear physics diagram (Free-body vector diagram, electrical circuit, light ray tracing, or graph).",
          "Step 3: Identify governing physical laws (Conservation of Energy, Conservation of Momentum, Newton's 2nd Law, Ohm's Law, Work-Energy Theorem).",
          "Step 4: Establish algebraic equations relating known and unknown variables, solve systematically, and verify physical reasonableness."
        ],
        coreLaw: "Coordinate Method, Energy Conservation & Physical Graph Linearization",
        shortcuts: [
          "Ratio Method: X1 / X2 to cancel invariant constants when a single parameter changes.",
          "Extreme Value Evaluation: Apply AM-GM inequality a + b ≥ 2√(ab) when product a·b is constant.",
          "Graph Analysis: Gradient (Slope) = Δy / Δx (representing derivative/rate of change); Area under curve = Integral product (Work W, Distance s, Charge q)."
        ]
      },
      problemTypes: [
        {
          id: "gen1",
          name: "Type 1: Fundamental Quantitative Calculation (Core Understanding)",
          description: "Direct algebraic substitution and dimensional unit analysis.",
          formulaSummary: "y = f(x1, x2, x3...)",
          traps: "⚠️ Trap: Always convert units to standard SI units (m, kg, s, J) before substituting into formulas."
        },
        {
          id: "gen2",
          name: "Type 2: Parameter Variation & Proportional Reasoning (Application)",
          description: "Analyze changes when one or more independent variables change.",
          formulaSummary: "Ratio: Y2 / Y1 = (X2 / X1)^n",
          traps: "⚠️ Trap: Quadratic or inverse square relationships (e.g. doubling speed quadruples kinetic energy E_k ∝ v²)."
        },
        {
          id: "gen3",
          name: "Type 3: Experimental Data Analysis & Graph Exploitation (Advanced / A Level Practical)",
          description: "Determine physical constants from intercepts, gradients, and area under curves.",
          formulaSummary: "Gradient = Δy / Δx | Area = ∫ y dx",
          traps: "⚠️ Trap: Check axis scaling multipliers (e.g. 10³ or 10⁻⁶) on coordinate axes."
        }
      ],
      workedExample: {
        question: "An object of mass m accelerates from rest under a constant force F for time t, reaching velocity v and traveling distance s. If the applied force is doubled to 2F for the same duration t, what is the new distance traveled s'?",
        thinkingAnalysis: "1) By Newton's 2nd Law: Acceleration a = F / m.\n2) When force doubles to 2F, acceleration doubles to a' = 2F / m = 2a.\n3) Distance from rest: s = (1/2) · a · t².\n4) Since t is unchanged and a' = 2a, s' = (1/2) · (2a) · t² = 2s.",
        solution: "1. Initial acceleration and distance:\n   a = F / m\n   s = (1/2) · (F / m) · t².\n2. When force is F' = 2F:\n   a' = 2F / m = 2a\n   s' = (1/2) · (2a) · t² = 2 · [(1/2) a t²] = 2s.\n3. Conclusion: The distance traveled is doubled (s' = 2s).",
        examTrapWarning: "⚠️ Exam trap: If the question specifies 'for the same DISTANCE s' instead of 'same time t', use v² = 2as to find v' = √2 · v."
      },
      practiceQuiz: {
        question: "An object moves with uniform acceleration from rest, covering distance s in the first second. What distance does it cover during the second second?",
        options: ["3s", "2s", "4s", "1.5s"],
        correctIndex: 0,
        hint1: "Total distance after t seconds: s(t) = (1/2) · a · t².",
        hint2: "In 1st second: s(1) = 0.5a = s. After 2 seconds: s(2) = 0.5a · 2² = 2a = 4s. Distance during 2nd second = s(2) - s(1).",
        explanation: "s(1) = s. s(2) = 4s. Distance in second second: Δs_2 = s(2) - s(1) = 4s - s = 3s."
      }
    };
  }

  if (EXAM_METHODOLOGY_DATA_VI[expId]) {
    return EXAM_METHODOLOGY_DATA_VI[expId];
  }

  // Fallback for Vietnamese
  return {
    topic: `Chuyên Đề Trọng Tâm & Phương Pháp Giải Bài Tập: ${category}`,
    mindset: {
      steps: [
        "Bước 1: Đọc kỹ đề bài, tóm tắt các đại lượng đã cho kèm đơn vị chuẩn SI (m, kg, s, A, V, J...).",
        "Bước 2: Vẽ hình minh họa hiện tượng vật lý (Phân tích vectơ lực, sơ đồ mạch điện, đường truyền tia sáng hoặc đồ thị).",
        "Bước 3: Xác định định luật vật lý chi phối (Bảo toàn cơ năng, Bảo toàn động lượng, Định luật II Newton, Định luật Ohm, Định lý biến thiên động năng).",
        "Bước 4: Thiết lập hệ phương trình liên hệ giữa các đại lượng, giải hệ phương trình đại số và kiểm tra tính hợp lý của kết quả."
      ],
      coreLaw: "Phương pháp Tọa độ, Bảo toàn Năng lượng & Tuyến tính hóa Đồ thị",
      shortcuts: [
        "Phương pháp lập tỉ số: Lấy X1 / X2 để triệt tiêu các hằng số không đổi khi một thông số biến thiên.",
        "Đánh giá cực trị: Áp dụng bất đẳng thức Cauchy (AM-GM) a + b ≥ 2√(ab) khi tích a·b không đổi.",
        "Đọc đồ thị: Hệ số góc (Slope) = Δy / Δx (đặc trưng cho đạo hàm/tốc độ biến thiên); Diện tích hình phẳng = Tích tích phân (Công W, Quãng đường s, Điện lượng q)."
      ]
    },
    problemTypes: [
      {
        id: "gen1",
        name: "Dạng 1: Bài toán Định lượng Cơ bản (Nhận biết - Thông hiểu)",
        description: "Thay số trực tiếp vào công thức định luật và phân tích thứ nguyên đơn vị.",
        formulaSummary: "y = f(x1, x2, x3...)",
        traps: "⚠️ Bẫy đơn vị: Đổi cm -> m, g -> kg, mm -> m, cm² -> m² (nhân 10⁻⁴), cm³ -> m³ (nhân 10⁻⁶)."
      },
      {
        id: "gen2",
        name: "Dạng 2: Bài toán Biến thiên Thông số & Lập tỉ lệ (Vận dụng)",
        description: "Khảo sát sự thay đổi của đại lượng khi các biến số khác tăng/giảm n lần.",
        formulaSummary: "Tỉ số: Y2 / Y1 = (X2 / X1)^n",
        traps: "⚠️ Bẫy quan hệ bậc hai hoặc căn bậc hai (ví dụ: vận tốc tăng gấp đôi thì động năng tăng gấp 4 lần)."
      },
      {
        id: "gen3",
        name: "Dạng 3: Bài toán Khai thác Đồ thị & Xử lý Số liệu Thực nghiệm (Vận dụng cao)",
        description: "Đọc điểm giao, độ dốc slope và diện tích hình phẳng dưới đồ thị.",
        formulaSummary: "Slope = Δy / Δx | Area = ∫ y dx",
        traps: "⚠️ Bẫy đọc sai tỉ lệ chia trên các trục tọa độ hoặc bỏ sót số nhân lũy thừa 10^k ở đầu trục."
      }
    ],
    workedExample: {
      question: "Một vật có khối lượng m chuyển động từ trạng thái nghỉ dưới tác dụng của một lực không đổi F trong khoảng thời gian t thì đạt vận tốc v và đi được quãng đường s. Nếu lực tác dụng tăng gấp đôi (2F) trong cùng khoảng thời gian t thì quãng đường đi được s' bằng bao nhiêu?",
      thinkingAnalysis: "1) Theo Định luật II Newton: Gia tốc a = F / m.\n2) Khi lực tăng lên 2F thì gia tốc mới a' = 2F / m = 2a (gia tốc tăng gấp đôi).\n3) Quãng đường đi được từ trạng thái nghỉ: s = (1/2) · a · t².\n4) Vì t không đổi và a' = 2a nên s' = (1/2) · a' · t² = (1/2) · (2a) · t² = 2s.",
      solution: "1. Gia tốc ban đầu của vật:\n   a = F / m.\n   Quãng đường ban đầu: s = (1/2) · a · t² = (1/2) · (F / m) · t².\n2. Khi lực tác dụng là F' = 2F:\n   a' = F' / m = 2F / m = 2a.\n   Quãng đường lúc sau:\n   s' = (1/2) · a' · t² = (1/2) · (2a) · t² = 2 · [(1/2) · a · t²] = 2s.\n3. Kết luận: Quãng đường đi được tăng gấp đôi (s' = 2s).",
      examTrapWarning: "⚠️ Cảnh báo: Nếu đề bài cho 'cùng QUÃNG ĐƯỜNG s' và hỏi vận tốc thì lại dùng công thức v² = 2as => v' = √2 · v. Cần chú ý điều kiện cố định là thời gian t hay quãng đường s."
    },
    practiceQuiz: {
      question: "Một vật chuyển động thẳng nhanh dần đều không vận tốc đầu, đi được quãng đường s trong giây thứ nhất. Quãng đường vật đi được trong giây thứ hai là bao nhiêu?",
      options: ["3s", "2s", "4s", "1.5s"],
      correctIndex: 0,
      hint1: "Quãng đường đi được sau t giây: s(t) = (1/2) · a · t².",
      hint2: "Trong giây thứ nhất: s_1 = s(1) = 0.5 a. Sau 2 giây: s(2) = (1/2) · a · 2² = 2 a = 4 s_1. Quãng đường trong giây thứ hai = s(2) - s(1).",
      explanation: "s(1) = 0.5 a = s. s(2) = 0.5 a · 2² = 2 a = 4s. Quãng đường đi được riêng trong giây thứ 2: Δs_2 = s(2) - s(1) = 4s - s = 3s."
    }
  };
};
