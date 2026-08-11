import React, { useState, useRef, useEffect } from 'react';
import { X, Sparkles, Send, Bot, User, Lightbulb, HelpCircle, BookOpen, RefreshCw } from 'lucide-react';

const removeAccents = (str) => {
  if (!str) return '';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
};

export default function AITutorModal({ experiment, onClose, lang }) {
  const isEn = lang === 'en';
  const chatEndRef = useRef(null);

  const expTitle = isEn ? (experiment?.titleEn || experiment?.title) : experiment?.title;
  const mainFormula = experiment?.theory?.formulas?.[0]?.formula || 'F = m · a';
  const summaryText = isEn ? (experiment?.theory?.summaryEn || experiment?.theory?.summary) : experiment?.theory?.summary;

  const defaultWelcomeMessage = {
    sender: 'ai',
    text: isEn
      ? `👋 Welcome! I am your AI Socratic Physics Tutor for "${expTitle}". Ask me any physics question (e.g., formulas, principles, spherical mirrors, circuits, optics...), or click a quick prompt below!`
      : `👋 Xin chào! Thầy là Trợ lý AI Vật Lý Socratic. Em có thể hỏi bất kỳ câu hỏi Vật Lý nào (về công thức, bản chất, gương cầu, thấu kính, mạch điện, sóng...).`
  };

  const [messages, setMessages] = useState([defaultWelcomeMessage]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = isEn
    ? [
        "What is the main physics formula for this lab?",
        "Why does this physical phenomenon occur?",
        "What are the applications of spherical mirrors?",
        "How can I reduce experimental measurement errors?",
        "Give me a real-world engineering application of this lab."
      ]
    : [
        "Công thức toán học chính của bài này là gì?",
        "Bản chất hiện tượng vật lý này là gì?",
        "Ứng dụng của gương cầu trong thực tế?",
        "Làm thế nào để giảm thiểu sai số khi đo?",
        "Ứng dụng thực tế của bài này trong đời sống?"
      ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Accent-Insensitive & Topic-Aware Physics Knowledge Engine Response Generator
  const generatePhysicsResponse = (query) => {
    const q = query.toLowerCase();
    const qNorm = removeAccents(query);

    // SPECIFIC TOPIC MATCHING (Normalizes accents so 'ung dung guong cau' matches 'gương cầu')
    
    // Topic: Gương cầu / Curved & Spherical Mirrors
    if (qNorm.includes('guong cau') || qNorm.includes('spherical mirror') || qNorm.includes('curved mirror')) {
      return isEn
        ? `🪞 Applications & Physics of Spherical Mirrors:\n\n1. Convex Mirrors (Gương cầu lồi):\n• Produce virtual, upright, and diminished images with a wider field of view.\n• Applications: Rear-view mirrors on cars/motorcycles, traffic safety mirrors at blind turns in mountain roads, security mirrors in stores.\n\n2. Concave Mirrors (Gương cầu lõm):\n• Produce magnified virtual images (when object is inside focal point F) or focus light rays.\n• Applications: Dentist mouth mirrors, makeup mirrors, solar cookers, flashlight reflectors, astronomical reflecting telescopes.`
        : `🪞 Ứng dụng & Bản chất của Gương Cầu trong đời sống:\n\n1. Gương cầu lồi (Convex Mirror):\n• Cho ảnh ảo, cùng chiều, nhỏ hơn vật, có thị trường (vùng nhìn thấy) rộng hơn gương phẳng.\n• Ứng dụng: Làm kính chiếu hậu ô tô/xe máy, gương quan sát ở đường cua gấp khúc mở rộng tầm nhìn cho tài xế, gương chống trộm ở siêu thị.\n\n2. Gương cầu lõm (Concave Mirror):\n• Cho ảnh ảo phóng to khi vật ở gần (trong khoảng tiêu cự f) hoặc hội tụ chùm sáng song song.\n• Ứng dụng: Gương soi mặt trang điểm phóng to, gương nha sĩ kiểm tra răng, chao đèn pha ô tô, bếp mặt trời tập trung năng lượng.`;
    }

    // Topic: Thấu kính / Lenses & Optics
    if (qNorm.includes('thau kinh') || qNorm.includes('lens') || qNorm.includes('kinh hien vi') || qNorm.includes('kinh thien van')) {
      return isEn
        ? `💡 Applications of Lenses:\n• Convex Lens (Thấu kính hội tụ): Used in cameras, magnifying glasses, projectors, eye glasses for hyperopia (farsightedness), microscopes, and telescopes.\n• Concave Lens (Thấu kính phân kỳ): Used in eye glasses for myopia (nearsightedness), peep holes on doors, and optical lasers.`
        : `💡 Ứng dụng của Thấu kính trong đời sống:\n• Thấu kính hội tụ: Dùng làm kính phóng đại, ống kính máy ảnh, kính hiển vi, kính thiên văn, máy chiếu, và kính đeo chữa bệnh cận thị/viễn thị.\n• Thấu kính phân kỳ: Dùng làm kính đeo cho người cận thị, mắt thần quan sát ở cửa nhà.`;
    }

    // Topic: Mạch điện / Circuits & Ohm's Law
    if (qNorm.includes('mach dien') || qNorm.includes('dinh luat ohm') || qNorm.includes('ohm') || qNorm.includes('ampe') || qNorm.includes('von')) {
      return isEn
        ? `⚡ Ohm's Law & Circuit Principles:\nFormula: I = U / R. Increasing voltage U increases current I, while increasing resistance R reduces current I.`
        : `⚡ Định luật Ohm & Mạch điện:\nCông thức: I = U / R. Tăng điện áp U làm tăng dòng I; tăng điện trở R làm giảm dòng I. Mạch nối tiếp có I bằng nhau, mạch song song có U bằng nhau.`;
    }

    // Topic: Lực đẩy Archimedes & Sự nổi chìm
    if (qNorm.includes('archimedes') || qNorm.includes('luc day') || qNorm.includes('noi') || qNorm.includes('chim') || qNorm.includes('buoyancy')) {
      return isEn
        ? `💧 Archimedes Buoyant Force:\nFormula: F_A = ρ · g · V. Fluid buoyant force depends on fluid density ρ and displaced volume V. Applications: Ships floating, submarines diving/surfacing, hydrometers, hot air balloons.`
        : `💧 Lực đẩy Archimedes & Sự nổi chìm:\nCông thức: F_A = d · V = ρ · g · V. Lực đẩy phụ thuộc vào khối lượng riêng chất lỏng ρ và thể tích chìm V. Ứng dụng: Tàu thủy nổi trên biển, tàu ngầm lặn/nổi bằng bể nước dằn, khinh khí cầu, đo nồng độ chất lỏng.`;
    }

    // Topic: Con lắc & Gia tốc trọng trường
    if (qNorm.includes('con lac') || qNorm.includes('pendulum') || qNorm.includes('trong truong')) {
      return isEn
        ? `⏱️ Simple Pendulum Period:\nFormula: T = 2π √(L / g). Period T depends ONLY on string length L and local gravity g, NOT on bob mass m or small angle amplitude! Applications: Pendulum clocks, measuring local gravity g.`
        : `⏱️ Con lắc đơn & Đo gia tốc trọng trường g:\nCông thức: T = 2π √(L / g). Chu kỳ T CHỈ phụ thuộc vào chiều dài dây L và gia tốc trọng trường g, KHÔNG phụ thuộc vào khối lượng quả cân m! Ứng dụng: Đồng hồ quả lắc, đo gia tốc trọng trường g tại các vĩ độ địa lý khác nhau.`;
    }

    // Topic: Ròng rọc / Pulleys
    if (qNorm.includes('rong roc') || qNorm.includes('pulley') || qNorm.includes('palang')) {
      return isEn
        ? `⚙️ Pulley Systems & Mechanical Advantage:\n1. Fixed Pulley (Ròng rọc cố định): Changes force direction, MA = 1 (F = P).\n2. Movable Pulley (Ròng rọc động): Halves required force (F = P / 2, MA = 2), but doubles rope distance (s = 2h).\n3. Block & Tackle (Palăng): Combines fixed & movable pulleys for greater mechanical advantage.`
        : `⚙️ Ròng rọc & Máy cơ đơn giản:\n1. Ròng rọc cố định: Chỉ đổi hướng của lực kéo, không cho lợi về lực (F = P, MA = 1).\n2. Ròng rọc động: Cho lợi 2 lần về lực (F = P / 2, MA = 2), nhưng thiệt 2 lần về đường đi (s = 2h).\n3. Palăng: Hệ hợp thành nhiều ròng rọc động & cố định giúp giảm lực kéo nhiều lần.`;
    }

    // Topic: Lò xo treo thẳng đứng & Định luật Hooke / Vertical Spring & Hooke's Law
    if (qNorm.includes('lo xo') || qNorm.includes('hooke') || qNorm.includes('do gian') || qNorm.includes('vertical spring') || qNorm.includes('dao dong lo xo')) {
      return isEn
        ? `🌀 Vertical Spring Physics & Hooke's Law:\n1. Equilibrium Stretch: Δl0 = (m · g) / k. The stretch is proportional to hanging mass m and inversely proportional to stiffness k.\n2. Restoring Elastic Force: F_đh = k · (Δl0 + x). Always points towards equilibrium position.\n3. Vertical Harmonic Period: T = 2π √(m / k) = 2π √(Δl0 / g).\n4. Applications: Spring scales, vehicle suspension shock absorbers, load sensors, industrial hanging scales.`
        : `🌀 Lò xo treo thẳng đứng & Định luật Hooke:\n1. Độ giãn tại VTCB: Δl0 = (m · g) / k. Độ giãn tỷ lệ thuận với khối lượng m và tỷ lệ nghịch với độ cứng k.\n2. Lực đàn hồi: F_đh = k · (Δl0 + x). Luôn hướng về vị trí cân bằng VTCB.\n3. Chu kỳ dao động điều hòa: T = 2π √(m / k) = 2π √(Δl0 / g).\n4. Ứng dụng: Lực kế lò xo, bộ phuộc nhún giảm xóc ô tô/xe máy, cân treo công nghiệp, cảm biến tải trọng.`;
    }

    // Topic: Rơi tự do & Thí nghiệm Galileo / Free Fall & Galileo Drop
    if (qNorm.includes('roi tu do') || qNorm.includes('free fall') || qNorm.includes('galileo') || qNorm.includes('gia toc trong truong') || qNorm.includes('thap pisa')) {
      return isEn
        ? `🪂 Free Fall Motion Physics:\n1. Galileo's Law: In a vacuum, ALL objects fall with the exact same acceleration g regardless of mass or shape!\n2. Free Fall Equations: v(t) = g · t, s(t) = 1/2 · g · t², v² = 2 · g · s.\n3. Fall Time from Height h: t = √(2h / g).\n4. Air Drag Effect: Atmosphere causes light objects (feathers) to reach terminal velocity while heavy objects fall rapidly.`
        : `🪂 Chuyển động Rơi Tự Do & Định luật Galileo:\n1. Định luật Galileo: Trong chân không, MỌI vật rơi cùng một gia tốc g không phụ thuộc vào khối lượng hay hình dạng!\n2. Các công thức rơi tự do: v(t) = g · t, s(t) = 1/2 · g · t², v² = 2 · g · s.\n3. Thời gian rơi từ độ cao h: t = √(2h / g).\n4. Ảnh hưởng không khí: Lực cản làm lông chim đạt vận tốc giới hạn sớm, còn quả cầu sắt ít bị ảnh hưởng.`;
    }

    // Topic: Mặt phẳng nghiêng / Inclined Plane
    if (qNorm.includes('mat phang nghiem') || qNorm.includes('mat phang nghieng') || qNorm.includes('inclined plane') || qNorm.includes('truot')) {
      return isEn
        ? `🏔️ Inclined Plane Mechanics:\n\n1. Parallel Gravity Component: P∥ = m · g · sin(θ).\n2. Friction Force: F_frict = μ · m · g · cos(θ).\n3. Sliding Acceleration: a = g · (sin(θ) - μ · cos(θ)).\n4. Pulling Effort: F_pull = P∥ + F_frict.\n5. Spring Oscillator on Incline: Equilibrium stretch Δl0 = (m · g · sin(θ)) / k, Period T = 2π √(m / k).`
        : `🏔️ Mặt phẳng nghiêng & Động lực học:\n\n1. Thành phần lực kéo vật xuống: P∥ = m · g · sin(θ).\n2. Lực ma sát cản trở: F_ms = μ · m · g · cos(θ).\n3. Gia tốc trượt tự do: a = g · (sin(θ) - μ · cos(θ)).\n4. Lực kéo vật lên: F_kéo = P∥ + F_ms.\n5. Con lắc lò xo trên mặt nghiêng: Độ giãn cân bằng Δl0 = (m · g · sin(θ)) / k, Chu kỳ T = 2π √(m / k).`;
    }

    // GENERAL INTENT MATCHING (If no specific external topic detected, uses intent analysis for active experiment)

    // 1. Formula & Math Calculations
    if (qNorm.includes('cong thuc') || qNorm.includes('formula') || qNorm.includes('tinh') || qNorm.includes('calculate') || qNorm.includes('phuong trinh')) {
      const formulaList = experiment?.theory?.formulas?.map(f => `• ${isEn ? (f.labelEn || f.label) : f.label}: ${f.formula}`).join('\n') || mainFormula;
      return isEn
        ? `📐 Main mathematical formulas for ${expTitle}:\n\n${formulaList}\n\n💡 Tip: Remember to convert all input variables into standard SI units before calculating!`
        : `📐 Dưới đây là các công thức toán học chính của bài ${expTitle}:\n\n${formulaList}\n\n💡 Lưu ý: Em nhớ đổi tất cả các đại lượng về đơn vị chuẩn SI (m, kg, s, A, V...) trước khi thay số vào tính nhé!`;
    }

    // 2. Physical Principle / Mechanism / Phenomenon
    if (qNorm.includes('vi sao') || qNorm.includes('nhu the nao') || qNorm.includes('why') || qNorm.includes('ban chat') || qNorm.includes('nguyen ly') || qNorm.includes('hien tuong') || qNorm.includes('phenomenon')) {
      return isEn
        ? `💡 Physical Principle:\n"${summaryText}"\n\n🔍 Try adjusting the sliders in the simulator and observe how changing one variable dynamically affects the measured output!`
        : `💡 Bản chất Vật lý của hiện tượng:\n"${summaryText}"\n\n🔍 Em hãy thử thay đổi các thanh trượt tham số trên mô phỏng và quan sát xem khi một đại lượng tăng thì chỉ số đo đạc thay đổi theo quy luật nào nhé!`;
    }

    // 3. Units & Quantities
    if (qNorm.includes('don vi') || qNorm.includes('unit') || qNorm.includes('dai luong') || qNorm.includes('ky hieu')) {
      const symbolList = experiment?.theory?.formulas?.[0]?.symbols?.map(s => `• ${s.symbol}: ${isEn ? (s.nameEn || s.name) : s.name} (${isEn ? (s.unitEn || s.unit) : s.unit})`).join('\n') || 'SI Units: m, kg, s, N, V, A';
      return isEn
        ? `📏 Units & Physical Quantities for ${expTitle}:\n\n${symbolList}`
        : `📏 Danh sách đại lượng và đơn vị chuẩn trong bài ${expTitle}:\n\n${symbolList}`;
    }

    // 4. Parameter Trends & Variations (Tăng, Giảm, Thay đổi)
    if (qNorm.includes('tang') || qNorm.includes('giam') || qNorm.includes('thay doi') || qNorm.includes('increase') || qNorm.includes('decrease') || qNorm.includes('change')) {
      return isEn
        ? `🔄 Parameter Trend Analysis for "${expTitle}":\nBased on formula ${mainFormula}:\n• Increasing proportional parameters directly increases the output.\n• Increasing inversely proportional parameters decreases the output.\n\n🧪 Test this on the 2D simulator controls right now!`
        : `🔄 Phân tích quy luật biến thiên cho bài "${expTitle}":\nDựa trên công thức ${mainFormula}:\n• Khi tăng các đại lượng ở tỉ lệ thuận, kết quả đo sẽ tăng tương ứng.\n• Khi tăng các đại lượng ở tỉ lệ nghịch, kết quả đo sẽ giảm xuống.\n\n🧪 Em hãy kéo thử thanh trượt trên bảng mô phỏng để kiểm chứng trực quan nhé!`;
    }

    // 5. Materials & Media (Nước, Dầu, Nhôm, Thủy tinh, Khí...)
    if (qNorm.includes('chat') || qNorm.includes('vat lieu') || qNorm.includes('nuoc') || qNorm.includes('dau') || qNorm.includes('thuy tinh') || qNorm.includes('material') || qNorm.includes('fluid') || qNorm.includes('medium')) {
      return isEn
        ? `🧪 Material Properties in ${expTitle}:\nDifferent materials or media possess different physical constants (e.g., density ρ, refractive index n, elastic modulus k). Adjusting the material selector in the simulator updates these parameters automatically.`
        : `🧪 Đặc tính vật liệu trong bài ${expTitle}:\nCác chất hoặc vật liệu khác nhau có hằng số vật lý khác nhau (ví dụ: khối lượng riêng ρ, chiết suất n, độ cứng k). Khi em đổi chọn vật liệu trên thanh điều khiển, hệ thống sẽ tự động cập nhật các hằng số này.`;
    }

    // 6. Experiment Steps & Guide (Hướng dẫn làm thí nghiệm)
    if (qNorm.includes('buoc') || qNorm.includes('lam the nao') || qNorm.includes('huong dan') || qNorm.includes('step') || qNorm.includes('guide') || qNorm.includes('trinh tu')) {
      const steps = experiment?.theory?.guideSteps?.map((step, i) => `${step}`).join('\n') || '1. Setup parameters. 2. Observe simulation. 3. Record data.';
      return isEn
        ? `📋 Step-by-Step Practical Guide for ${expTitle}:\n\n${steps}`
        : `📋 Hướng dẫn chi tiết các bước tiến hành thí nghiệm ${expTitle}:\n\n${steps}`;
    }

    // 7. Uncertainty & Experimental Errors
    if (qNorm.includes('sai so') || qNorm.includes('error') || qNorm.includes('uncertainty') || qNorm.includes('do dac')) {
      return isEn
        ? `🛡️ Handling Measurement Uncertainty:\n1. Toggle 'ERRORS: ON (±1%)' on top bar.\n2. Repeat the measurement 5-10 times.\n3. Compute average X̄ and error ΔX.\n4. Export CSV to open data in Excel!`
        : `🛡️ Hướng dẫn xử lý sai số thực nghiệm:\n1. Nhấn nút 'SAI SỐ: BẬT (±1%)' ở thanh trên cùng để mô phỏng sai số dụng cụ.\n2. Thực hiện đo ít nhất 5-10 lần.\n3. Tính giá trị trung bình X̄ và sai số tuyệt đối ΔX.\n4. Nhấn nút 'Xuất File Excel/CSV' trong phần Báo cáo để tự động đưa số liệu vào Excel nhé!`;
    }

    // 8. Real-World Applications (General for active experiment)
    if (qNorm.includes('ung dung') || qNorm.includes('thuc te') || qNorm.includes('application') || qNorm.includes('doi song') || qNorm.includes('ky thuat')) {
      const purpose = isEn ? (experiment?.theory?.purposeEn || experiment?.theory?.purpose) : experiment?.theory?.purpose;
      return isEn
        ? `🌍 Real-World Engineering Applications for ${expTitle}:\n${purpose}`
        : `🌍 Ứng dụng thực tế & Kỹ thuật trong đời sống của ${expTitle}:\n${purpose}`;
    }

    // 9. Fallback Socratic Guidance
    return isEn
      ? `🤔 Great question regarding "${expTitle}"! To analyze this: What happens to the final result when you adjust the sliders on the simulator panel? Give it a try!`
      : `🤔 Câu hỏi rất hay về bài "${expTitle}"! Để tự khám phá câu trả lời: Em thử điều chỉnh các tham số trên bảng mô phỏng để tự tay kiểm chứng mối quan hệ này nhé!`;
  };

  const handleSend = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg = { sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const responseText = generatePhysicsResponse(query);
      setMessages(prev => [...prev, { sender: 'ai', text: responseText }]);
      setIsTyping(false);
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl h-[620px] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-slate-900 via-violet-950/50 to-slate-900">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                {isEn ? 'AI Socratic Physics Tutor' : 'Trợ Lý AI Vật Lý Socratic'}
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold border border-emerald-500/30">
                  ONLINE
                </span>
              </h3>
              <p className="text-[11px] text-slate-400 font-medium">
                {expTitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-3 bg-slate-950/70 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 ml-1" />
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="px-3 py-1 rounded-full bg-slate-800 hover:bg-violet-600 hover:text-white text-slate-300 text-[11px] font-medium whitespace-nowrap border border-slate-700 transition-all shrink-0 active:scale-95 shadow-sm"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Messages Log */}
        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-slate-950">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 max-w-[88%] ${
                msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 shadow-md ${
                  msg.sender === 'user'
                    ? 'bg-cyan-500 text-slate-950'
                    : 'bg-gradient-to-tr from-violet-600 to-fuchsia-600 text-white'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div
                className={`p-3.5 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
                  msg.sender === 'user'
                    ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/30 rounded-tr-none font-medium'
                    : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-tl-none shadow-xl'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-400 italic bg-slate-900/60 p-2.5 rounded-xl w-fit border border-slate-800">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-violet-400" />
              {isEn ? 'Physics Assistant is thinking...' : 'Trợ lý hỗ trợ vật lý đang suy luận câu trả lời...'}
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-slate-800 bg-slate-900 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={isEn ? "Ask ANY physics question (e.g. 'ung dung guong cau')..." : "Đặt BẤT KỲ câu hỏi Vật Lý nào (VD: 'ung dung guong cau')..."}
            className="flex-1 bg-slate-950 text-slate-200 text-xs px-3.5 py-2.5 rounded-xl border border-slate-800 focus:border-violet-500 focus:outline-none placeholder:text-slate-500 transition-all"
          />
          <button
            onClick={() => handleSend()}
            className="p-2.5 rounded-xl bg-gradient-to-tr from-violet-600 to-fuchsia-600 hover:opacity-90 active:scale-95 text-white font-bold transition-all shadow-md shadow-violet-600/30"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
