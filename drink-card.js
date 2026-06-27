// drink-card.js — VTWorld Drink Game card data + deck engine
(function (global) {
  const PENALTY = ['uống 1/3 ly', 'uống 1/2 ly', 'uống 1 ngụm', 'chỉ định người khác uống'];

  // 1. THỬ THÁCH
  const ACTION = [
    'Hát to 1 câu hát bất kỳ', 'Nhảy 1 điệu freestyle ngẫu hứng', 'Bắt chước giọng người ngồi cạnh',
    'Kể 1 câu chuyện cười cho cả bàn', 'Diễn tả 1 con vật bằng hành động', 'Đọc ngược tên đầy đủ của mình',
    'Khen 3 người trong bàn bằng giọng nịnh ngọt', 'Giữ thăng bằng bằng 1 chân', 'Bắt chước 1 nhân vật hoạt hình nổi tiếng',
    'Tự chụp 1 tấm ảnh tự sướng hài hước', 'Đứng dậy cúi chào cả bàn như idol Kpop', 'Nói 1 câu tiếng Anh thật "Tây"',
    'Giả làm MC giới thiệu chính mình', 'Đếm ngược từ 20 về 1 thật nhanh', 'Làm 5 cái hít đất nhẹ tại chỗ',
    'Vẽ 1 mặt cười lên lòng bàn tay',
  ];
  const COND1 = [
    'trong vòng 10 giây', 'mà không được cười nửa nụ', 'với giọng điệu thật kịch tính', 'ngay trước mặt cả bàn',
    'với cả 2 tay giơ lên trời', 'trong khi đứng bằng 1 chân', 'thật chậm như quay slow-motion', 'rồi cúi đầu cảm ơn mọi người',
    'và nhìn thẳng vào 1 người bất kỳ', 'rồi tự khen bản thân giỏi', '3 lần liên tiếp không nghỉ', 'mà vẫn giữ mặt nghiêm túc',
    'với tốc độ nhanh nhất có thể', 'rồi tự vỗ tay thưởng cho mình', 'mà không ai được giúp', 'và phải khiến 1 người bật cười',
  ];

  // 2. LUẬT CHƠI
  const RULE = [
    'Cấm nói từ "uống"', 'Ai cười phải che miệng xin lỗi cả bàn', 'Cấm chạm vào điện thoại',
    'Phải gọi người bên trái là "đại ca/đại tỷ"', 'Cấm dùng từ "tôi", phải nói "đệ/tớ"', 'Rút lá phải dùng tay không thuận',
    'Ai nhìn điện thoại thì cả nhóm cùng chịu phạt', 'Trước khi nói phải giơ tay xin phép', 'Cấm gọi tên thật, chỉ gọi "bạn ơi"',
    'Ai ngáp phải đứng dậy xoay 1 vòng', 'Mọi câu nói phải kết thúc bằng "nha"', 'Cấm chạm tay vào mặt',
    'Ai đứng dậy phải xin phép cả bàn', 'Cấm nói "không", phải nói "dạ có"', 'Cấm bắt chéo chân', 'Phải gọi nhau là "sếp"',
  ];
  const DURATION = [
    'có hiệu lực đến hết vòng này', 'áp dụng cho 3 lượt rút lá tiếp theo', 'kéo dài đến khi có luật mới',
    'chỉ áp dụng cho người ngồi bên trái bạn', 'áp dụng cho cả bàn ngay lập tức', 'kéo dài đến khi ai đó nhắc lại luật cũ',
    'áp dụng tới hết buổi tối nay', 'áp dụng cho 2 người gần lá bài này nhất', 'áp dụng ngay, không cần chờ hết lượt',
    'áp dụng tới khi có người đầu tiên phá luật', 'áp dụng cho người vừa rút lá này', 'áp dụng cho toàn bộ vòng chơi tiếp theo',
    'chỉ áp dụng khi có người nhắc tới rượu/bia', 'áp dụng đến khi đổi chủ đề', 'áp dụng cho người nói nhiều nhất bàn',
    'áp dụng cho đến lá bài Luật chơi tiếp theo',
  ];

  // 3. SỰ THẬT
  const QUESTION = [
    'Lần gần nhất bạn nói dối là khi nào?', 'Bạn từng thích thầm ai trong nhóm này chưa?', 'Crush đầu tiên của bạn là ai (mô tả thôi cũng được)?',
    'Bạn từng trốn học/trốn làm chưa?', 'Điều xấu hổ nhất bạn từng làm ở nơi công cộng?', 'Bạn từng "ghost" ai chưa?',
    'Số dư trong ví hiện tại bạn đoán là bao nhiêu?', 'Bạn từng khóc vì 1 bộ phim/bài hát chưa?', 'Ai trong nhóm bạn nghĩ dễ "tạo phốt" nhất?',
    'Bạn từng nói xấu ai ở đây sau lưng chưa (kể chung thôi)?', 'Tật xấu lớn nhất của bạn là gì?', 'Bạn từng thi trượt môn gì?',
    'Bạn sợ nhất điều gì?', 'Bạn từng "trả thù" ai chưa, kể qua loa?', 'Bạn đã từng yêu xa chưa?',
    'Bạn từng bị bắt nói dối với gia đình về việc gì?', 'Bạn nghĩ ai ở bàn này sẽ giàu nhất sau 10 năm?', 'Bạn từng "thả thính" ai trong nhóm chưa?',
    'Lần gần nhất bạn say là khi nào?', 'Bạn có đang giữ bí mật gì với người ở đây không (chỉ cần gật/lắc)?',
    'Bạn từng quên sinh nhật người thân chưa?', 'Bạn nghĩ mình "ngầu" nhất ở điểm nào?', 'Ai là người bạn nể nhất trong nhóm?',
    'Bạn từng bị "đá" hay từng "đá" ai?', 'Bạn từng nhịn ăn để giảm cân chưa?', 'Việc điên rồ nhất bạn từng làm vì 1 người?',
    'Bạn có tin vào "định mệnh" không?', 'Bạn từng trộm đồ nhỏ (cây kẹo, bút...) hồi nhỏ chưa?', 'Ai khiến bạn cười nhiều nhất trong nhóm này?',
    'Bạn từng giả bệnh để nghỉ chưa?', 'Bạn từng nói dối để né 1 buổi hẹn chưa?', 'Bạn nghĩ ai ở đây hợp làm người yêu mình nhất?',
    'Bạn từng "đọc trộm" tin nhắn của ai chưa?', 'Việc bạn hối hận nhất tuần này là gì?', 'Bạn từng giả vờ vui khi thực ra đang buồn không?',
    'Bạn có đang thầm so sánh mình với ai trong nhóm không?', 'Bạn từng "block" rồi "unblock" ai chưa?', 'Điều bạn sợ người khác phát hiện ra nhất là gì?',
    'Bạn từng nói "ổn" trong khi không ổn chút nào chưa?', 'Ai trong nhóm này bạn nghĩ giữ bí mật giỏi nhất?', 'Bạn từng yêu 1 người mà không ai biết chưa?',
    'Lần gần nhất bạn ghen tuông vô lý là khi nào?', 'Bạn từng xem trộm điện thoại người khác chưa?', 'Nếu phải chọn 1 người ở đây đi đảo hoang, bạn chọn ai?',
    'Bạn từng nói xấu sếp/giáo viên ở lưng chưa?', 'Bạn nghĩ mình có đang "thả thính" ai gần đây không?', 'Điều ngại nhất bạn từng làm trước mặt người mình thích?',
    'Bạn từng hối hận vì 1 tin nhắn đã gửi chưa?', 'Bạn có tin "yêu xa" sẽ bền không, dựa theo trải nghiệm bản thân?', 'Lần gần nhất bạn nói "không sao" trong khi đang tổn thương?',
  ];
  const FRAME = ['Nói thật:', 'Bí mật nho nhỏ:', 'Thử lòng thành thật:', 'Câu hỏi khó đỡ:', 'Tâm sự thật lòng:'];

  // 4. TÙ TÌ / SO TÀI
  const GAME = [
    'Tù tì (oẳn tù tì) với người bên trái', 'Tù tì với người đối diện', 'Đếm số tiếp nối quanh bàn',
    'Thi nhìn nhau không cười (staring contest) với người bên phải', 'Thi ai giữ hơi thở lâu hơn với 1 người bất kỳ',
    'Đố vui nhanh với cả bàn', 'Thi gọi tên 5 đồ vật trong phòng nhanh nhất với 1 đối thủ', 'Đua đọc nhanh 1 câu xoắn lưỡi với người ngồi cạnh',
    'Thi đếm ngược từ 30 nhanh hơn với 1 người bất kỳ', 'Tù tì 3 hiệp với người có ly cạn nhất', 'Thi ai giữ thẳng tay lâu hơn với người đối diện',
    'Đố mẹo vui với cả bàn', 'Thi bắt chéo tay nhanh hơn với 1 đối thủ', 'Tù tì úp mở 1 hiệp duy nhất với người bên phải',
    'Thi nhăn mặt hài hơn với 1 người bất kỳ, cả bàn chọn thắng', 'Đua vẽ hình bằng tay không nhìn với 1 đối thủ',
  ];
  const COND2 = [
    'ai thua trước', 'ai phá vỡ luật chơi trước', 'ai chậm hơn nửa giây', 'ai cười trước', 'ai sai số/sai nhịp trước',
    'người thua 2/3 hiệp', 'người bị cả bàn xử thua', 'người về nhì', 'người không giữ được tới cuối', 'người phạm lỗi đầu tiên',
    'người bị bắt lỗi nói trước', 'người nói sai từ đầu tiên', 'người ra đòn trễ nhất', 'người mất tập trung trước',
    'người bị chỉ ra là gian lận', 'người im lặng trước theo luật chơi',
  ];

  // 5. MAY MẮN / ĐẶC BIỆT
  const EVENT = [
    'Bạn được miễn hoàn toàn lượt phạt này', 'Chỉ định 1 người bất kỳ chịu phạt thay bạn', 'Mức phạt của bạn được nhân đôi ngay lập tức',
    'Đổi lượt phạt với người ngồi bên trái', 'Cả bàn cùng chịu phạt chung với bạn', 'Bạn được hoãn phạt sang lượt sau',
    'Người có lượt phạt nặng nhất từ đầu giờ được miễn, bạn chịu thay', 'Tung đồng xu trong đầu: lẻ chịu phạt, chẵn thì miễn',
    'Đảo chiều rút lá, người kế tiếp theo chiều ngược chịu phạt', 'Bạn có quyền bắt 1 người khác chịu phạt thay mình',
    'Cả bàn vỗ tay vì bạn quá may, miễn phạt', 'Người ngồi đối diện chịu phạt thay bạn', 'Bạn chịu phạt nhẹ hơn 1 mức nhờ vận may',
    'Lật ngược tình thế: người rút lá trước bạn chịu phạt', 'Bạn miễn phạt nhưng nhường lượt rút lá kế tiếp',
    'Không ai phải chịu phạt lượt này', 'Người có ly đầy nhất phải chia sẻ và cùng chịu phạt', 'Bạn chịu phạt nhưng đổi lại được hỏi 1 câu Sự thật cho người khác',
    'May rủi 50/50: tự chịu phạt hoặc chỉ định người khác, tự chọn', 'Bạn được "thẻ miễn phạt", giữ lại dùng cho lượt sau',
    'Mọi người phải khen bạn 1 câu trước khi tiếp tục', 'Bạn được rút thêm 1 lá bài miễn phí ngay sau lá này', 'Người trẻ tuổi nhất bàn chịu phạt thay bạn',
    'Người lớn tuổi nhất bàn chịu phạt thay bạn', 'Bạn chỉ cần giả vờ chịu phạt, không cần uống thật', 'Tất cả mọi người trừ bạn phải chịu phạt',
    'Bạn được chọn ai sẽ rút lá kế tiếp', 'Vòng chơi bị đảo ngược chiều kim đồng hồ', 'Bạn được miễn phạt nếu kể 1 câu chuyện cười ngay',
    'Người ít nói nhất bàn chịu phạt thay bạn', 'Bạn được "double or nothing": tù tì 1 hiệp, thua thì gấp đôi phạt, thắng thì miễn',
    'Cả bàn phải gọi bạn là "Người may mắn nhất tối nay"', 'Bạn miễn phạt cho đến khi gặp lá May mắn tiếp theo',
    'Người chịu phạt nhiều nhất từ đầu giờ được nghỉ, bạn chịu thay', 'Bạn được tặng 1 câu Thử thách dễ thay cho phạt',
    'Tự bốc thêm 1 lá để xem có đổi vận không, nếu trùng May mắn thì miễn', 'Người ngồi xa bạn nhất chịu phạt thay bạn',
    'Bạn chịu phạt nhưng được cả bàn cổ vũ nhiệt tình', 'Đổi vai trò: bạn trở thành "trọng tài" ván tới, miễn phạt',
    'Bạn miễn phạt nếu đoán đúng tên 1 người bất kỳ sinh tháng mấy', 'Cả bàn phải làm 1 điều bạn yêu cầu trước khi tiếp tục',
    'Mức phạt của bạn được chia đôi cho 2 người', 'Bạn nhận thêm 1 lượt rút lá ngay sau khi xử lý lá này',
    'Người có tên dài nhất bàn chịu phạt thay bạn', 'Bạn được nhường quyền đặt 1 luật mới ngay bây giờ',
    'Tự uống mừng vận may của chính mình, mức nhẹ nhất', 'Cả bàn cùng hô "Hên quá" và bỏ qua lượt phạt này',
    'Bạn có quyền huỷ phạt 1 lần duy nhất trong ván', 'Người vừa cười gần nhất chịu phạt thay bạn',
    'Bạn được xem là "thánh may mắn" của ván này, miễn toàn bộ phạt',
  ];
  const EXTRA = ['🍀 May quá! ', '🎲 Vận may gõ cửa: ', '✨ Đặc biệt: ', '🔄 Bất ngờ chưa: ', '🎉 Hên xui: '];
  const TIMING = ['Áp dụng ngay lập tức.', 'Có hiệu lực từ lượt sau.', 'Chỉ tính cho lần này thôi.', 'Kéo dài cho đến hết ván.'];

  const CATS = {
    thach: { label: 'THỬ THÁCH', color: '#f87171', icon: '🔥' },
    luat:  { label: 'LUẬT CHƠI', color: '#5b8def', icon: '📜' },
    that:  { label: 'SỰ THẬT',   color: '#f4c430', icon: '💬' },
    tuti:  { label: 'TÙ TÌ',     color: '#b084f2', icon: '✊' },
    hen:   { label: 'MAY MẮN',   color: '#6bcb77', icon: '🍀' },
  };

  function pick(n, arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a.slice(0, n);
  }

  function buildCategory(cat, n, combos) {
    const uniq = Array.from(new Set(combos));
    return pick(n, uniq).map(text => ({ cat, text }));
  }

  function buildDeck(perCategory = 600) {
    const out = [];
    ACTION.forEach(a => COND1.forEach(c => PENALTY.forEach(p =>
      out.push(`${a} ${c}. Không làm được thì ${p}.`))));
    const cThach = buildCategory('thach', perCategory, out);

    const out2 = [];
    RULE.forEach(r => DURATION.forEach(d => PENALTY.forEach(p =>
      out2.push(`${r}. Luật này ${d}. Ai phá luật thì ${p}.`))));
    const cLuat = buildCategory('luat', perCategory, out2);

    const out3 = [];
    FRAME.forEach(f => QUESTION.forEach(q => PENALTY.forEach(p =>
      out3.push(`${f} "${q}" Nếu né tránh hoặc nói dối thì ${p}.`))));
    const cThat = buildCategory('that', perCategory, out3);

    const out4 = [];
    GAME.forEach(g => COND2.forEach(c => PENALTY.forEach(p =>
      out4.push(`${g}. ${c[0].toUpperCase() + c.slice(1)} thì ${p}.`))));
    const cTuti = buildCategory('tuti', perCategory, out4);

    const out5 = [];
    EXTRA.forEach(e => EVENT.forEach(ev => TIMING.forEach(t =>
      out5.push(`${e}${ev}. ${t}`))));
    const cHen = buildCategory('hen', perCategory, out5);

    const deck = [...cThach, ...cLuat, ...cThat, ...cTuti, ...cHen];
    // shuffle final deck order
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }

  global.DrinkCard = { CATS, buildDeck };
})(window);
