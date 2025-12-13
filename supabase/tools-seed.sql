-- =============================================================================
-- SEED DATA FOR TOOLS
-- =============================================================================
-- Generated from tools.registry.ts
-- Run this after tools-schema.sql

-- Clear existing data
TRUNCATE TABLE tools CASCADE;
TRUNCATE TABLE tool_groups CASCADE;

-- =============================================================================
-- INSERT TOOL GROUPS
-- =============================================================================
INSERT INTO tool_groups (id, title, description, icon, priority, is_active) VALUES
-- P1 - Highest Priority
('password', 
  '{"en": "Password & Security Tools", "vi": "Công cụ Mật khẩu & Bảo mật", "ja": "パスワード＆セキュリティツール", "zh": "密码和安全工具", "es": "Herramientas de Contraseñas y Seguridad"}',
  '{"en": "Generate secure passwords, check strength, and manage security utilities", "vi": "Tạo mật khẩu an toàn, kiểm tra độ mạnh và các tiện ích bảo mật", "ja": "安全なパスワードの生成、強度チェック、セキュリティユーティリティ", "zh": "生成安全密码、检查强度和安全工具", "es": "Genera contraseñas seguras, verifica fortaleza y utilidades de seguridad"}',
  '🔐', 1, true),

('text',
  '{"en": "Text Tools", "vi": "Công cụ Văn bản", "ja": "テキストツール", "zh": "文本工具", "es": "Herramientas de Texto"}',
  '{"en": "Text manipulation, comparison, and formatting utilities", "vi": "Xử lý, so sánh và định dạng văn bản", "ja": "テキストの操作、比較、フォーマット", "zh": "文本处理、比较和格式化工具", "es": "Manipulación, comparación y formato de texto"}',
  '📝', 2, true),

('json',
  '{"en": "JSON / YAML / XML Tools", "vi": "Công cụ JSON / YAML / XML", "ja": "JSON / YAML / XML ツール", "zh": "JSON / YAML / XML 工具", "es": "Herramientas JSON / YAML / XML"}',
  '{"en": "Format, validate, compare and convert structured data", "vi": "Định dạng, xác thực, so sánh và chuyển đổi dữ liệu có cấu trúc", "ja": "構造化データのフォーマット、検証、比較、変換", "zh": "格式化、验证、比较和转换结构化数据", "es": "Formatear, validar, comparar y convertir datos estructurados"}',
  '{ }', 3, true),

('random',
  '{"en": "Random / Fun Tools", "vi": "Công cụ Ngẫu nhiên / Vui", "ja": "ランダム / 楽しいツール", "zh": "随机/趣味工具", "es": "Herramientas Aleatorias / Divertidas"}',
  '{"en": "Random generators, pickers, and fun utilities", "vi": "Trình tạo ngẫu nhiên, bộ chọn và tiện ích vui", "ja": "ランダムジェネレーター、ピッカー、楽しいユーティリティ", "zh": "随机生成器、选择器和趣味工具", "es": "Generadores aleatorios, selectores y utilidades divertidas"}',
  '🎲', 4, true),

('image',
  '{"en": "Image Tools", "vi": "Công cụ Hình ảnh", "ja": "画像ツール", "zh": "图像工具", "es": "Herramientas de Imagen"}',
  '{"en": "Image compression, conversion, and manipulation", "vi": "Nén, chuyển đổi và xử lý hình ảnh", "ja": "画像の圧縮、変換、操作", "zh": "图像压缩、转换和处理", "es": "Compresión, conversión y manipulación de imágenes"}',
  '🖼️', 5, true),

('pdf',
  '{"en": "PDF Tools", "vi": "Công cụ PDF", "ja": "PDF ツール", "zh": "PDF 工具", "es": "Herramientas PDF"}',
  '{"en": "PDF manipulation, merging, splitting, and conversion", "vi": "Xử lý PDF, gộp, tách và chuyển đổi", "ja": "PDFの操作、結合、分割、変換", "zh": "PDF处理、合并、拆分和转换", "es": "Manipulación de PDF, fusión, división y conversión"}',
  '📄', 6, true),

('dev',
  '{"en": "Dev Utilities", "vi": "Tiện ích Lập trình", "ja": "開発ユーティリティ", "zh": "开发工具", "es": "Utilidades de Desarrollo"}',
  '{"en": "Developer tools for code formatting, testing, and conversion", "vi": "Công cụ cho lập trình viên: định dạng code, kiểm thử và chuyển đổi", "ja": "開発者ツール：コードフォーマット、テスト、変換", "zh": "开发者工具：代码格式化、测试和转换", "es": "Herramientas para desarrolladores: formato de código, pruebas y conversión"}',
  '💻', 7, true),

('data',
  '{"en": "Encode/Decode & Data Utilities", "vi": "Mã hóa/Giải mã & Tiện ích Dữ liệu", "ja": "エンコード/デコード & データユーティリティ", "zh": "编码/解码和数据工具", "es": "Codificación/Decodificación y Utilidades de Datos"}',
  '{"en": "Encoding, decoding, and data transformation tools", "vi": "Công cụ mã hóa, giải mã và chuyển đổi dữ liệu", "ja": "エンコード、デコード、データ変換ツール", "zh": "编码、解码和数据转换工具", "es": "Herramientas de codificación, decodificación y transformación de datos"}',
  '🔤', 8, true),

('datetime',
  '{"en": "Date, Time & Calendar Tools", "vi": "Công cụ Ngày, Giờ & Lịch", "ja": "日付、時間＆カレンダーツール", "zh": "日期、时间和日历工具", "es": "Herramientas de Fecha, Hora y Calendario"}',
  '{"en": "Date calculations, timezone conversion, and calendar utilities", "vi": "Tính toán ngày, chuyển đổi múi giờ và tiện ích lịch", "ja": "日付計算、タイムゾーン変換、カレンダーユーティリティ", "zh": "日期计算、时区转换和日历工具", "es": "Cálculos de fechas, conversión de zonas horarias y utilidades de calendario"}',
  '📅', 9, true),

('youtube',
  '{"en": "YouTube Tools (Legal)", "vi": "Công cụ YouTube (Hợp pháp)", "ja": "YouTube ツール（合法）", "zh": "YouTube 工具（合法）", "es": "Herramientas de YouTube (Legal)"}',
  '{"en": "Legal YouTube utilities for metadata, thumbnails, and embeds", "vi": "Tiện ích YouTube hợp pháp cho metadata, thumbnail và embed", "ja": "メタデータ、サムネイル、埋め込み用の合法的なYouTubeユーティリティ", "zh": "用于元数据、缩略图和嵌入的合法YouTube工具", "es": "Utilidades legales de YouTube para metadatos, miniaturas e incrustaciones"}',
  '▶️', 10, true),

-- P2/P3 - Lower Priority
('file-convert',
  '{"en": "File Convert Tools", "vi": "Công cụ Chuyển đổi File", "ja": "ファイル変換ツール", "zh": "文件转换工具", "es": "Herramientas de Conversión de Archivos"}',
  '{"en": "Convert files between different formats", "vi": "Chuyển đổi file giữa các định dạng khác nhau", "ja": "異なるフォーマット間でファイルを変換", "zh": "在不同格式之间转换文件", "es": "Convertir archivos entre diferentes formatos"}',
  '📁', 11, true),

('math',
  '{"en": "Math & Calculator Tools", "vi": "Công cụ Toán & Máy tính", "ja": "数学＆計算機ツール", "zh": "数学和计算器工具", "es": "Herramientas de Matemáticas y Calculadora"}',
  '{"en": "Mathematical calculations and equation solving", "vi": "Tính toán và giải phương trình", "ja": "数学計算と方程式の解法", "zh": "数学计算和方程求解", "es": "Cálculos matemáticos y resolución de ecuaciones"}',
  '🔢', 12, true),

('unit',
  '{"en": "Unit & Measurement Converters", "vi": "Bộ chuyển đổi Đơn vị & Đo lường", "ja": "単位＆測定変換ツール", "zh": "单位和测量转换器", "es": "Conversores de Unidades y Medidas"}',
  '{"en": "Convert between different units of measurement", "vi": "Chuyển đổi giữa các đơn vị đo lường", "ja": "異なる測定単位間の変換", "zh": "在不同测量单位之间转换", "es": "Convertir entre diferentes unidades de medida"}',
  '📏', 13, true),

('finance',
  '{"en": "Finance & Budget Tools", "vi": "Công cụ Tài chính & Ngân sách", "ja": "財務＆予算ツール", "zh": "财务和预算工具", "es": "Herramientas de Finanzas y Presupuesto"}',
  '{"en": "Financial calculators and budget planning tools", "vi": "Máy tính tài chính và công cụ lập ngân sách", "ja": "財務計算機と予算計画ツール", "zh": "财务计算器和预算规划工具", "es": "Calculadoras financieras y herramientas de planificación presupuestaria"}',
  '💰', 14, true),

('health',
  '{"en": "Health & Fitness Calculators", "vi": "Máy tính Sức khỏe & Thể lực", "ja": "健康＆フィットネス計算機", "zh": "健康和健身计算器", "es": "Calculadoras de Salud y Fitness"}',
  '{"en": "Health and fitness calculation tools", "vi": "Công cụ tính toán sức khỏe và thể lực", "ja": "健康とフィットネスの計算ツール", "zh": "健康和健身计算工具", "es": "Herramientas de cálculo de salud y fitness"}',
  '💪', 15, true),

('seo',
  '{"en": "SEO & Website Analysis Tools", "vi": "Công cụ SEO & Phân tích Website", "ja": "SEO＆ウェブサイト分析ツール", "zh": "SEO和网站分析工具", "es": "Herramientas de SEO y Análisis de Sitios Web"}',
  '{"en": "SEO analysis and website optimization tools", "vi": "Công cụ phân tích SEO và tối ưu website", "ja": "SEO分析とウェブサイト最適化ツール", "zh": "SEO分析和网站优化工具", "es": "Herramientas de análisis SEO y optimización de sitios web"}',
  '🔍', 16, true),

('network',
  '{"en": "Network & IP Tools", "vi": "Công cụ Mạng & IP", "ja": "ネットワーク＆IPツール", "zh": "网络和IP工具", "es": "Herramientas de Red e IP"}',
  '{"en": "Network diagnostics and IP utilities", "vi": "Chẩn đoán mạng và tiện ích IP", "ja": "ネットワーク診断とIPユーティリティ", "zh": "网络诊断和IP工具", "es": "Diagnósticos de red y utilidades de IP"}',
  '🌐', 17, true),

('language',
  '{"en": "Language & Translation Tools", "vi": "Công cụ Ngôn ngữ & Dịch thuật", "ja": "言語＆翻訳ツール", "zh": "语言和翻译工具", "es": "Herramientas de Idiomas y Traducción"}',
  '{"en": "Translation, spelling, and language utilities", "vi": "Dịch thuật, chính tả và tiện ích ngôn ngữ", "ja": "翻訳、スペルチェック、言語ユーティリティ", "zh": "翻译、拼写和语言工具", "es": "Traducción, ortografía y utilidades de idiomas"}',
  '🌍', 18, true),

('audio',
  '{"en": "Audio Tools", "vi": "Công cụ Âm thanh", "ja": "オーディオツール", "zh": "音频工具", "es": "Herramientas de Audio"}',
  '{"en": "Audio processing and conversion tools", "vi": "Công cụ xử lý và chuyển đổi âm thanh", "ja": "オーディオ処理と変換ツール", "zh": "音频处理和转换工具", "es": "Herramientas de procesamiento y conversión de audio"}',
  '🎵', 19, true),

('video',
  '{"en": "Video Tools", "vi": "Công cụ Video", "ja": "ビデオツール", "zh": "视频工具", "es": "Herramientas de Video"}',
  '{"en": "Video processing and conversion tools", "vi": "Công cụ xử lý và chuyển đổi video", "ja": "ビデオ処理と変換ツール", "zh": "视频处理和转换工具", "es": "Herramientas de procesamiento y conversión de video"}',
  '🎬', 20, true),

('weather',
  '{"en": "Weather & Environment Tools", "vi": "Công cụ Thời tiết & Môi trường", "ja": "天気＆環境ツール", "zh": "天气和环境工具", "es": "Herramientas de Clima y Medio Ambiente"}',
  '{"en": "Weather forecasts and environmental information", "vi": "Dự báo thời tiết và thông tin môi trường", "ja": "天気予報と環境情報", "zh": "天气预报和环境信息", "es": "Pronósticos del clima e información ambiental"}',
  '🌤️', 21, true),

('crypto',
  '{"en": "Cryptocurrency Tools", "vi": "Công cụ Tiền điện tử", "ja": "暗号通貨ツール", "zh": "加密货币工具", "es": "Herramientas de Criptomonedas"}',
  '{"en": "Cryptocurrency tracking and calculation tools", "vi": "Công cụ theo dõi và tính toán tiền điện tử", "ja": "暗号通貨の追跡と計算ツール", "zh": "加密货币跟踪和计算工具", "es": "Herramientas de seguimiento y cálculo de criptomonedas"}',
  '₿', 22, true);

-- =============================================================================
-- INSERT TOOLS
-- =============================================================================

-- Password & Security Tools
INSERT INTO tools (id, group_id, title, description, icon, priority, status, implementation, keywords, tags, is_popular, is_featured) VALUES
('generator', 'password',
  '{"en": "Password Generator", "vi": "Tạo Mật khẩu", "ja": "パスワードジェネレーター", "zh": "密码生成器", "es": "Generador de Contraseñas"}',
  '{"en": "Generate secure, random passwords with customizable rules", "vi": "Tạo mật khẩu ngẫu nhiên, an toàn với các quy tắc tùy chỉnh", "ja": "カスタマイズ可能なルールで安全でランダムなパスワードを生成", "zh": "使用可自定义规则生成安全的随机密码", "es": "Genera contraseñas seguras y aleatorias con reglas personalizables"}',
  '🔑', 1, 'active', 'client-side', ARRAY['password', 'generator', 'security', 'random'], ARRAY['secure', 'fast'], true, true),

('strength-checker', 'password',
  '{"en": "Password Strength Checker", "vi": "Kiểm tra Độ mạnh Mật khẩu", "ja": "パスワード強度チェッカー", "zh": "密码强度检查器", "es": "Verificador de Fortaleza de Contraseñas"}',
  '{"en": "Check password strength with entropy scoring and tips", "vi": "Kiểm tra độ mạnh mật khẩu với điểm entropy và mẹo", "ja": "エントロピースコアとヒントでパスワードの強度をチェック", "zh": "使用熵评分和提示检查密码强度", "es": "Verifica la fortaleza de contraseñas con puntuación de entropía y consejos"}',
  '💪', 2, 'coming-soon', 'client-side', ARRAY['password', 'strength', 'security', 'check'], ARRAY['secure'], false, false),

('hash-encode', 'password',
  '{"en": "Hash / Encode Toolkit", "vi": "Bộ công cụ Hash / Mã hóa", "ja": "ハッシュ/エンコードツールキット", "zh": "哈希/编码工具包", "es": "Kit de Hash / Codificación"}',
  '{"en": "Generate SHA-256, MD5, HMAC hashes and Base64/URL encoding", "vi": "Tạo hash SHA-256, MD5, HMAC và mã hóa Base64/URL", "ja": "SHA-256、MD5、HMACハッシュとBase64/URLエンコードを生成", "zh": "生成SHA-256、MD5、HMAC哈希和Base64/URL编码", "es": "Genera hashes SHA-256, MD5, HMAC y codificación Base64/URL"}',
  '#️⃣', 3, 'coming-soon', 'client-side', ARRAY['hash', 'md5', 'sha256', 'base64', 'encode'], ARRAY['secure'], false, false),

('jwt-decoder', 'password',
  '{"en": "JWT Decoder (Local Only)", "vi": "Giải mã JWT (Chỉ Local)", "ja": "JWTデコーダー（ローカルのみ）", "zh": "JWT解码器（仅本地）", "es": "Decodificador JWT (Solo Local)"}',
  '{"en": "Decode JWT tokens locally - view header, payload and expiration", "vi": "Giải mã JWT token cục bộ - xem header, payload và thời hạn", "ja": "JWTトークンをローカルでデコード - ヘッダー、ペイロード、有効期限を表示", "zh": "本地解码JWT令牌 - 查看头部、载荷和过期时间", "es": "Decodifica tokens JWT localmente - ver encabezado, carga y expiración"}',
  '🎫', 4, 'coming-soon', 'client-side', ARRAY['jwt', 'token', 'decode', 'auth'], ARRAY['secure'], false, false),

('uuid-nanoid', 'password',
  '{"en": "UUID / NanoID Generator", "vi": "Tạo UUID / NanoID", "ja": "UUID / NanoID ジェネレーター", "zh": "UUID / NanoID 生成器", "es": "Generador de UUID / NanoID"}',
  '{"en": "Generate UUIDs and NanoIDs in batch with various formats", "vi": "Tạo UUID và NanoID hàng loạt với các định dạng khác nhau", "ja": "さまざまな形式でUUIDとNanoIDをバッチ生成", "zh": "批量生成各种格式的UUID和NanoID", "es": "Genera UUIDs y NanoIDs en lote con varios formatos"}',
  '🆔', 5, 'coming-soon', 'client-side', ARRAY['uuid', 'nanoid', 'generator', 'id'], ARRAY['fast'], false, false),

('qr-generator', 'password',
  '{"en": "QR Code Generator", "vi": "Tạo Mã QR", "ja": "QRコードジェネレーター", "zh": "二维码生成器", "es": "Generador de Códigos QR"}',
  '{"en": "Create QR codes for text, URLs, vCards with PNG/SVG download", "vi": "Tạo mã QR cho văn bản, URL, vCard với tải PNG/SVG", "ja": "テキスト、URL、vCardのQRコードをPNG/SVGでダウンロード", "zh": "为文本、URL、vCard创建QR码，支持PNG/SVG下载", "es": "Crea códigos QR para texto, URLs, vCards con descarga PNG/SVG"}',
  '📱', 6, 'coming-soon', 'client-side', ARRAY['qr', 'code', 'generator', 'url', 'vcard'], ARRAY['fast'], true, true);

-- Text Tools
INSERT INTO tools (id, group_id, title, description, icon, priority, status, implementation, keywords, tags, is_popular, is_featured) VALUES
('diff', 'text',
  '{"en": "Text Diff / Compare", "vi": "So sánh Văn bản", "ja": "テキスト差分/比較", "zh": "文本差异/比较", "es": "Comparar Texto"}',
  '{"en": "Compare two texts and highlight additions, removals, and changes", "vi": "So sánh hai văn bản và đánh dấu thêm, xóa, thay đổi", "ja": "2つのテキストを比較し、追加、削除、変更をハイライト", "zh": "比较两个文本并突出显示添加、删除和更改", "es": "Compara dos textos y resalta adiciones, eliminaciones y cambios"}',
  '🔀', 1, 'coming-soon', 'client-side', ARRAY['diff', 'compare', 'text', 'difference'], ARRAY['fast'], true, false),

('case-converter', 'text',
  '{"en": "Case Converter", "vi": "Chuyển đổi Chữ hoa/thường", "ja": "大文字/小文字変換", "zh": "大小写转换器", "es": "Convertidor de Mayúsculas"}',
  '{"en": "Convert text between camelCase, snake_case, kebab-case, PascalCase + remove diacritics", "vi": "Chuyển đổi văn bản giữa camelCase, snake_case, kebab-case, PascalCase + xóa dấu", "ja": "camelCase、snake_case、kebab-case、PascalCase間でテキストを変換 + 発音記号を削除", "zh": "在camelCase、snake_case、kebab-case、PascalCase之间转换文本 + 删除变音符号", "es": "Convierte texto entre camelCase, snake_case, kebab-case, PascalCase + eliminar diacríticos"}',
  '🔤', 2, 'coming-soon', 'client-side', ARRAY['case', 'convert', 'camel', 'snake', 'kebab'], ARRAY['fast'], false, false),

('regex-tester', 'text',
  '{"en": "Regex Tester + Highlighter", "vi": "Kiểm tra Regex + Đánh dấu", "ja": "正規表現テスター＋ハイライター", "zh": "正则测试器 + 高亮", "es": "Probador de Regex + Resaltador"}',
  '{"en": "Test regular expressions with real-time highlighting and group matching", "vi": "Kiểm tra biểu thức chính quy với đánh dấu thời gian thực và khớp nhóm", "ja": "リアルタイムハイライトとグループマッチングで正規表現をテスト", "zh": "使用实时高亮和组匹配测试正则表达式", "es": "Prueba expresiones regulares con resaltado en tiempo real y coincidencia de grupos"}',
  '🔍', 3, 'coming-soon', 'client-side', ARRAY['regex', 'regular', 'expression', 'test', 'match'], ARRAY['fast'], true, false),

('word-counter', 'text',
  '{"en": "Word Counter", "vi": "Đếm Từ", "ja": "単語カウンター", "zh": "字数统计", "es": "Contador de Palabras"}',
  '{"en": "Count words, characters, sentences with reading time estimation", "vi": "Đếm từ, ký tự, câu với ước tính thời gian đọc", "ja": "単語、文字、文をカウントし、読書時間を推定", "zh": "计算单词、字符、句子数量并估计阅读时间", "es": "Cuenta palabras, caracteres, oraciones con estimación de tiempo de lectura"}',
  '🔢', 5, 'coming-soon', 'client-side', ARRAY['word', 'count', 'character', 'sentence'], ARRAY['fast'], true, false);

-- JSON Tools
INSERT INTO tools (id, group_id, title, description, icon, priority, status, implementation, keywords, tags, is_popular, is_featured) VALUES
('format-validate', 'json',
  '{"en": "JSON Formatter / Minify / Validator", "vi": "Định dạng / Nén / Xác thực JSON", "ja": "JSONフォーマッター/圧縮/バリデーター", "zh": "JSON格式化/压缩/验证器", "es": "Formateador / Minificador / Validador JSON"}',
  '{"en": "Format, minify and validate JSON with syntax highlighting", "vi": "Định dạng, nén và xác thực JSON với đánh dấu cú pháp", "ja": "シンタックスハイライト付きでJSONをフォーマット、圧縮、検証", "zh": "使用语法高亮格式化、压缩和验证JSON", "es": "Formatea, minifica y valida JSON con resaltado de sintaxis"}',
  '✨', 1, 'coming-soon', 'client-side', ARRAY['json', 'format', 'minify', 'validate', 'beautify'], ARRAY['fast'], true, true),

('diff', 'json',
  '{"en": "JSON Diff / Compare", "vi": "So sánh JSON", "ja": "JSON差分/比較", "zh": "JSON差异/比较", "es": "Comparar JSON"}',
  '{"en": "Compare JSON documents with path-based diff highlighting", "vi": "So sánh tài liệu JSON với đánh dấu khác biệt theo đường dẫn", "ja": "パスベースの差分ハイライトでJSONドキュメントを比較", "zh": "使用基于路径的差异高亮比较JSON文档", "es": "Compara documentos JSON con resaltado de diferencias basado en rutas"}',
  '🔀', 2, 'coming-soon', 'client-side', ARRAY['json', 'diff', 'compare', 'difference'], ARRAY['fast'], false, false),

('convert', 'json',
  '{"en": "JSON ↔ YAML / XML Converter", "vi": "Chuyển đổi JSON ↔ YAML / XML", "ja": "JSON ↔ YAML / XML 変換", "zh": "JSON ↔ YAML / XML 转换器", "es": "Convertidor JSON ↔ YAML / XML"}',
  '{"en": "Convert between JSON, YAML, and XML formats", "vi": "Chuyển đổi giữa các định dạng JSON, YAML và XML", "ja": "JSON、YAML、XML形式間で変換", "zh": "在JSON、YAML和XML格式之间转换", "es": "Convierte entre formatos JSON, YAML y XML"}',
  '🔄', 4, 'coming-soon', 'client-side', ARRAY['json', 'yaml', 'xml', 'convert'], ARRAY['fast'], true, false);

-- Image Tools
INSERT INTO tools (id, group_id, title, description, icon, priority, status, implementation, keywords, tags, is_popular, is_featured) VALUES
('compress', 'image',
  '{"en": "Image Compressor", "vi": "Nén Ảnh", "ja": "画像圧縮ツール", "zh": "图像压缩器", "es": "Compresor de Imágenes"}',
  '{"en": "Compress images while maintaining quality", "vi": "Nén ảnh mà vẫn giữ chất lượng", "ja": "品質を維持しながら画像を圧縮", "zh": "在保持质量的同时压缩图像", "es": "Comprime imágenes manteniendo la calidad"}',
  '📦', 1, 'coming-soon', 'client-side', ARRAY['image', 'compress', 'optimize', 'reduce'], ARRAY['fast'], true, true),

('convert', 'image',
  '{"en": "Convert Format", "vi": "Chuyển đổi Định dạng", "ja": "フォーマット変換", "zh": "格式转换", "es": "Convertir Formato"}',
  '{"en": "Convert images between PNG, JPG, WebP formats", "vi": "Chuyển đổi ảnh giữa các định dạng PNG, JPG, WebP", "ja": "PNG、JPG、WebP形式間で画像を変換", "zh": "在PNG、JPG、WebP格式之间转换图像", "es": "Convierte imágenes entre formatos PNG, JPG, WebP"}',
  '🔄', 2, 'coming-soon', 'client-side', ARRAY['image', 'convert', 'png', 'jpg', 'webp'], ARRAY['fast'], true, false),

('crop-resize-rotate', 'image',
  '{"en": "Crop / Resize / Rotate", "vi": "Cắt / Thay đổi kích thước / Xoay", "ja": "クロップ/リサイズ/回転", "zh": "裁剪/调整大小/旋转", "es": "Recortar / Redimensionar / Rotar"}',
  '{"en": "Crop, resize and rotate images with precision", "vi": "Cắt, thay đổi kích thước và xoay ảnh chính xác", "ja": "正確に画像をクロップ、リサイズ、回転", "zh": "精确裁剪、调整大小和旋转图像", "es": "Recorta, redimensiona y rota imágenes con precisión"}',
  '✂️', 3, 'coming-soon', 'client-side', ARRAY['image', 'crop', 'resize', 'rotate'], ARRAY['fast'], false, false);

-- PDF Tools
INSERT INTO tools (id, group_id, title, description, icon, priority, status, implementation, keywords, tags, is_popular, is_featured) VALUES
('merge-split', 'pdf',
  '{"en": "PDF Merge / Split", "vi": "Gộp / Tách PDF", "ja": "PDF結合/分割", "zh": "PDF合并/拆分", "es": "Fusionar / Dividir PDF"}',
  '{"en": "Merge multiple PDFs into one or split a PDF into parts", "vi": "Gộp nhiều PDF thành một hoặc tách PDF thành các phần", "ja": "複数のPDFを1つに結合、またはPDFを分割", "zh": "将多个PDF合并为一个或将PDF拆分为多个部分", "es": "Fusiona múltiples PDFs en uno o divide un PDF en partes"}',
  '📎', 1, 'coming-soon', 'client-side', ARRAY['pdf', 'merge', 'split', 'combine'], ARRAY['fast'], true, true),

('compress', 'pdf',
  '{"en": "Compress PDF (Basic)", "vi": "Nén PDF (Cơ bản)", "ja": "PDF圧縮（基本）", "zh": "PDF压缩（基础）", "es": "Comprimir PDF (Básico)"}',
  '{"en": "Reduce PDF file size with basic compression", "vi": "Giảm kích thước file PDF với nén cơ bản", "ja": "基本的な圧縮でPDFファイルサイズを削減", "zh": "使用基础压缩减小PDF文件大小", "es": "Reduce el tamaño del archivo PDF con compresión básica"}',
  '📦', 4, 'coming-soon', 'client-side', ARRAY['pdf', 'compress', 'reduce', 'size'], ARRAY['fast'], true, false);

-- Dev Utilities
INSERT INTO tools (id, group_id, title, description, icon, priority, status, implementation, keywords, tags, is_popular, is_featured) VALUES
('code-editor-formatter', 'dev',
  '{"en": "Online Code Editor / Formatter", "vi": "Trình soạn thảo / Định dạng Code Online", "ja": "オンラインコードエディター/フォーマッター", "zh": "在线代码编辑器/格式化工具", "es": "Editor / Formateador de Código Online"}',
  '{"en": "Edit and format code with syntax highlighting (JS/TS/HTML/CSS/JSON)", "vi": "Chỉnh sửa và định dạng code với đánh dấu cú pháp (JS/TS/HTML/CSS/JSON)", "ja": "シンタックスハイライト付きでコードを編集・フォーマット（JS/TS/HTML/CSS/JSON）", "zh": "使用语法高亮编辑和格式化代码（JS/TS/HTML/CSS/JSON）", "es": "Edita y formatea código con resaltado de sintaxis (JS/TS/HTML/CSS/JSON)"}',
  '✏️', 1, 'coming-soon', 'client-side', ARRAY['code', 'editor', 'format', 'javascript', 'typescript'], ARRAY['fast'], true, false),

('cron-builder', 'dev',
  '{"en": "Cron Expression Builder", "vi": "Trình tạo Biểu thức Cron", "ja": "Cron式ビルダー", "zh": "Cron表达式构建器", "es": "Constructor de Expresiones Cron"}',
  '{"en": "Build and explain cron expressions visually", "vi": "Tạo và giải thích biểu thức cron trực quan", "ja": "Cron式を視覚的に構築・説明", "zh": "可视化构建和解释cron表达式", "es": "Construye y explica expresiones cron visualmente"}',
  '⏰', 3, 'coming-soon', 'client-side', ARRAY['cron', 'schedule', 'expression', 'builder'], ARRAY['fast'], false, false),

('timestamp-converter', 'dev',
  '{"en": "Timestamp Converter", "vi": "Chuyển đổi Timestamp", "ja": "タイムスタンプ変換", "zh": "时间戳转换器", "es": "Convertidor de Timestamps"}',
  '{"en": "Convert between Unix timestamps and readable dates", "vi": "Chuyển đổi giữa Unix timestamp và ngày đọc được", "ja": "Unixタイムスタンプと読みやすい日付間で変換", "zh": "在Unix时间戳和可读日期之间转换", "es": "Convierte entre timestamps Unix y fechas legibles"}',
  '🕐', 4, 'coming-soon', 'client-side', ARRAY['timestamp', 'unix', 'date', 'convert'], ARRAY['fast'], true, false),

('json-to-ts', 'dev',
  '{"en": "JSON to TypeScript", "vi": "JSON sang TypeScript", "ja": "JSON から TypeScript", "zh": "JSON转TypeScript", "es": "JSON a TypeScript"}',
  '{"en": "Generate TypeScript interfaces from JSON data", "vi": "Tạo interface TypeScript từ dữ liệu JSON", "ja": "JSONデータからTypeScriptインターフェースを生成", "zh": "从JSON数据生成TypeScript接口", "es": "Genera interfaces TypeScript desde datos JSON"}',
  '📘', 8, 'coming-soon', 'client-side', ARRAY['json', 'typescript', 'interface', 'generate'], ARRAY['fast'], true, true);

-- Random / Fun Tools
INSERT INTO tools (id, group_id, title, description, icon, priority, status, implementation, keywords, tags, is_popular, is_featured) VALUES
('wheel', 'random',
  '{"en": "Wheel Spinner / Random Picker", "vi": "Vòng quay / Chọn ngẫu nhiên", "ja": "ホイールスピナー/ランダムピッカー", "zh": "转盘/随机选择器", "es": "Ruleta / Selector Aleatorio"}',
  '{"en": "Spin a wheel to pick random items with animation and history", "vi": "Quay vòng để chọn ngẫu nhiên với animation và lịch sử", "ja": "アニメーションと履歴付きでホイールを回してランダムに選択", "zh": "旋转轮盘随机选择项目，带动画和历史记录", "es": "Gira una ruleta para elegir elementos al azar con animación e historial"}',
  '🎡', 1, 'coming-soon', 'client-side', ARRAY['wheel', 'spinner', 'random', 'picker'], ARRAY['fun'], true, false),

('team-generator', 'random',
  '{"en": "Random Team Generator", "vi": "Tạo Đội ngẫu nhiên", "ja": "ランダムチームジェネレーター", "zh": "随机团队生成器", "es": "Generador de Equipos Aleatorios"}',
  '{"en": "Divide people into random teams with size constraints", "vi": "Chia người vào các đội ngẫu nhiên với giới hạn kích thước", "ja": "サイズ制約付きでランダムにチームを分割", "zh": "将人员随机分成团队，支持大小限制", "es": "Divide personas en equipos aleatorios con restricciones de tamaño"}',
  '👥', 2, 'coming-soon', 'client-side', ARRAY['team', 'random', 'generator', 'group'], ARRAY['fun'], true, false),

('dice-lottery', 'random',
  '{"en": "Dice / Lottery / Random Name", "vi": "Xúc xắc / Xổ số / Tên ngẫu nhiên", "ja": "サイコロ/宝くじ/ランダム名前", "zh": "骰子/彩票/随机名字", "es": "Dados / Lotería / Nombre Aleatorio"}',
  '{"en": "Roll dice, generate lottery numbers, pick random names", "vi": "Tung xúc xắc, tạo số xổ số, chọn tên ngẫu nhiên", "ja": "サイコロを振る、宝くじ番号を生成、ランダムな名前を選ぶ", "zh": "掷骰子、生成彩票号码、随机选择名字", "es": "Tira dados, genera números de lotería, elige nombres al azar"}',
  '🎰', 3, 'coming-soon', 'client-side', ARRAY['dice', 'lottery', 'random', 'name'], ARRAY['fun'], true, false);

-- Data Utilities
INSERT INTO tools (id, group_id, title, description, icon, priority, status, implementation, keywords, tags, is_popular, is_featured) VALUES
('base64', 'data',
  '{"en": "Base64 Encode/Decode", "vi": "Mã hóa/Giải mã Base64", "ja": "Base64エンコード/デコード", "zh": "Base64编码/解码", "es": "Codificar/Decodificar Base64"}',
  '{"en": "Encode or decode Base64 strings with Unicode support", "vi": "Mã hóa hoặc giải mã chuỗi Base64 với hỗ trợ Unicode", "ja": "Unicodeサポート付きでBase64文字列をエンコード/デコード", "zh": "支持Unicode的Base64字符串编码/解码", "es": "Codifica o decodifica cadenas Base64 con soporte Unicode"}',
  '🔣', 1, 'coming-soon', 'client-side', ARRAY['base64', 'encode', 'decode', 'convert'], ARRAY['fast'], true, false),

('url-parser', 'data',
  '{"en": "URL Parser", "vi": "Phân tích URL", "ja": "URLパーサー", "zh": "URL解析器", "es": "Analizador de URLs"}',
  '{"en": "Parse and analyze URL components", "vi": "Phân tích và kiểm tra các thành phần URL", "ja": "URLコンポーネントを解析・分析", "zh": "解析和分析URL组件", "es": "Analiza y examina componentes de URLs"}',
  '🔗', 2, 'coming-soon', 'client-side', ARRAY['url', 'parse', 'analyze', 'query'], ARRAY['fast'], false, false),

('color-tools', 'data',
  '{"en": "Color Tools", "vi": "Công cụ Màu sắc", "ja": "カラーツール", "zh": "颜色工具", "es": "Herramientas de Color"}',
  '{"en": "Convert colors between HEX, RGB, HSL and generate palettes", "vi": "Chuyển đổi màu giữa HEX, RGB, HSL và tạo bảng màu", "ja": "HEX、RGB、HSL間で色を変換し、パレットを生成", "zh": "在HEX、RGB、HSL之间转换颜色并生成调色板", "es": "Convierte colores entre HEX, RGB, HSL y genera paletas"}',
  '🎨', 5, 'coming-soon', 'client-side', ARRAY['color', 'hex', 'rgb', 'hsl', 'palette'], ARRAY['fast'], true, true);

-- Date/Time Tools
INSERT INTO tools (id, group_id, title, description, icon, priority, status, implementation, keywords, tags, is_popular, is_featured) VALUES
('date-diff', 'datetime',
  '{"en": "Date Difference Calculator", "vi": "Tính Khoảng cách Ngày", "ja": "日付差分計算機", "zh": "日期差异计算器", "es": "Calculador de Diferencia de Fechas"}',
  '{"en": "Calculate the difference between two dates", "vi": "Tính khoảng cách giữa hai ngày", "ja": "2つの日付間の差を計算", "zh": "计算两个日期之间的差异", "es": "Calcula la diferencia entre dos fechas"}',
  '📆', 1, 'coming-soon', 'client-side', ARRAY['date', 'diff', 'difference', 'calculate'], ARRAY['fast'], true, false),

('timezone-converter', 'datetime',
  '{"en": "Timezone Converter", "vi": "Chuyển đổi Múi giờ", "ja": "タイムゾーン変換", "zh": "时区转换器", "es": "Convertidor de Zonas Horarias"}',
  '{"en": "Convert times between different timezones (DST aware)", "vi": "Chuyển đổi thời gian giữa các múi giờ khác nhau (nhận biết DST)", "ja": "異なるタイムゾーン間で時間を変換（DST対応）", "zh": "在不同时区之间转换时间（支持夏令时）", "es": "Convierte horas entre diferentes zonas horarias (con soporte DST)"}',
  '🌍', 2, 'coming-soon', 'client-side', ARRAY['timezone', 'convert', 'dst', 'time'], ARRAY['fast'], true, false),

('age-calculator', 'datetime',
  '{"en": "Age Calculator", "vi": "Tính Tuổi", "ja": "年齢計算機", "zh": "年龄计算器", "es": "Calculador de Edad"}',
  '{"en": "Calculate exact age from birth date", "vi": "Tính tuổi chính xác từ ngày sinh", "ja": "生年月日から正確な年齢を計算", "zh": "从出生日期计算确切年龄", "es": "Calcula la edad exacta desde la fecha de nacimiento"}',
  '🎂', 3, 'coming-soon', 'client-side', ARRAY['age', 'birthday', 'calculate', 'date'], ARRAY['fast'], true, false);

-- Finance Tools
INSERT INTO tools (id, group_id, title, description, icon, priority, status, implementation, keywords, tags, is_popular, is_featured) VALUES
('currency', 'finance',
  '{"en": "Currency Converter", "vi": "Chuyển đổi Tiền tệ", "ja": "通貨換算", "zh": "货币转换器", "es": "Convertidor de Monedas"}',
  '{"en": "Convert between currencies with real-time rates", "vi": "Chuyển đổi tiền tệ với tỷ giá thời gian thực", "ja": "リアルタイムレートで通貨を変換", "zh": "使用实时汇率转换货币", "es": "Convierte entre monedas con tasas en tiempo real"}',
  '💱', 1, 'coming-soon', 'hybrid', ARRAY['currency', 'convert', 'exchange', 'rate'], ARRAY['fast'], true, true),

('loan-emi', 'finance',
  '{"en": "Loan/EMI Calculator", "vi": "Tính Vay/EMI", "ja": "ローン/EMI計算機", "zh": "贷款/EMI计算器", "es": "Calculador de Préstamos/EMI"}',
  '{"en": "Calculate loan EMI, interest, and amortization", "vi": "Tính EMI, lãi suất và khấu hao khoản vay", "ja": "ローンのEMI、利息、償還を計算", "zh": "计算贷款EMI、利息和摊销", "es": "Calcula EMI, intereses y amortización de préstamos"}',
  '🏦', 2, 'coming-soon', 'client-side', ARRAY['loan', 'emi', 'interest', 'calculate'], ARRAY['fast'], true, false),

('tip-calculator', 'finance',
  '{"en": "Tip Calculator", "vi": "Tính Tiền tip", "ja": "チップ計算機", "zh": "小费计算器", "es": "Calculador de Propinas"}',
  '{"en": "Calculate tips and split bills among groups", "vi": "Tính tiền tip và chia hóa đơn cho nhóm", "ja": "チップを計算し、グループ間で請求書を分割", "zh": "计算小费并在团体中分摊账单", "es": "Calcula propinas y divide cuentas entre grupos"}',
  '🧾', 6, 'coming-soon', 'client-side', ARRAY['tip', 'calculator', 'bill', 'split'], ARRAY['fast'], true, false);

-- Health Tools
INSERT INTO tools (id, group_id, title, description, icon, priority, status, implementation, keywords, tags, is_popular, is_featured) VALUES
('bmi', 'health',
  '{"en": "BMI Calculator", "vi": "Tính BMI", "ja": "BMI計算機", "zh": "BMI计算器", "es": "Calculador de IMC"}',
  '{"en": "Calculate Body Mass Index from height and weight", "vi": "Tính chỉ số khối cơ thể từ chiều cao và cân nặng", "ja": "身長と体重からBMIを計算", "zh": "根据身高和体重计算体重指数", "es": "Calcula el Índice de Masa Corporal desde altura y peso"}',
  '⚖️', 1, 'coming-soon', 'client-side', ARRAY['bmi', 'health', 'weight', 'height'], ARRAY['fast'], true, false),

('calories-burn', 'health',
  '{"en": "Calorie Burn Estimator", "vi": "Ước tính Calo tiêu hao", "ja": "カロリー消費推定", "zh": "卡路里消耗估算器", "es": "Estimador de Calorías Quemadas"}',
  '{"en": "Estimate calories burned based on activity and duration", "vi": "Ước tính calo tiêu hao dựa trên hoạt động và thời gian", "ja": "活動と時間に基づいてカロリー消費を推定", "zh": "根据活动和时长估算消耗的卡路里", "es": "Estima las calorías quemadas según actividad y duración"}',
  '🔥', 2, 'coming-soon', 'client-side', ARRAY['calorie', 'burn', 'exercise', 'fitness'], ARRAY['fast'], false, false),

('sleep-cycle', 'health',
  '{"en": "Sleep Cycle Calculator", "vi": "Tính Chu kỳ Ngủ", "ja": "睡眠サイクル計算機", "zh": "睡眠周期计算器", "es": "Calculador de Ciclos de Sueño"}',
  '{"en": "Calculate optimal sleep and wake times based on sleep cycles", "vi": "Tính thời gian ngủ và thức dậy tối ưu dựa trên chu kỳ ngủ", "ja": "睡眠サイクルに基づいて最適な睡眠・起床時間を計算", "zh": "根据睡眠周期计算最佳睡眠和起床时间", "es": "Calcula tiempos óptimos de sueño y despertar basados en ciclos de sueño"}',
  '😴', 5, 'coming-soon', 'client-side', ARRAY['sleep', 'cycle', 'wake', 'rest'], ARRAY['fast'], true, false);

-- Unit Converters
INSERT INTO tools (id, group_id, title, description, icon, priority, status, implementation, keywords, tags, is_popular, is_featured) VALUES
('length', 'unit',
  '{"en": "Length Converter", "vi": "Chuyển đổi Chiều dài", "ja": "長さ変換", "zh": "长度转换器", "es": "Convertidor de Longitud"}',
  '{"en": "Convert between meters, feet, inches, kilometers, miles", "vi": "Chuyển đổi giữa mét, feet, inch, km, dặm", "ja": "メートル、フィート、インチ、キロメートル、マイル間で変換", "zh": "在米、英尺、英寸、公里、英里之间转换", "es": "Convierte entre metros, pies, pulgadas, kilómetros, millas"}',
  '📏', 1, 'coming-soon', 'client-side', ARRAY['length', 'convert', 'meter', 'feet', 'mile'], ARRAY['fast'], true, false),

('weight', 'unit',
  '{"en": "Weight Converter", "vi": "Chuyển đổi Khối lượng", "ja": "重量変換", "zh": "重量转换器", "es": "Convertidor de Peso"}',
  '{"en": "Convert between kilograms, pounds, ounces, grams", "vi": "Chuyển đổi giữa kg, pound, ounce, gram", "ja": "キログラム、ポンド、オンス、グラム間で変換", "zh": "在千克、磅、盎司、克之间转换", "es": "Convierte entre kilogramos, libras, onzas, gramos"}',
  '⚖️', 2, 'coming-soon', 'client-side', ARRAY['weight', 'convert', 'kilogram', 'pound'], ARRAY['fast'], true, false),

('temperature', 'unit',
  '{"en": "Temperature Converter", "vi": "Chuyển đổi Nhiệt độ", "ja": "温度変換", "zh": "温度转换器", "es": "Convertidor de Temperatura"}',
  '{"en": "Convert between Celsius, Fahrenheit, Kelvin", "vi": "Chuyển đổi giữa Celsius, Fahrenheit, Kelvin", "ja": "摂氏、華氏、ケルビン間で変換", "zh": "在摄氏、华氏、开尔文之间转换", "es": "Convierte entre Celsius, Fahrenheit, Kelvin"}',
  '🌡️', 4, 'coming-soon', 'client-side', ARRAY['temperature', 'convert', 'celsius', 'fahrenheit'], ARRAY['fast'], true, false);

-- Math Tools
INSERT INTO tools (id, group_id, title, description, icon, priority, status, implementation, keywords, tags, is_popular, is_featured) VALUES
('basic-calculator', 'math',
  '{"en": "Basic Calculator", "vi": "Máy tính Cơ bản", "ja": "基本電卓", "zh": "基础计算器", "es": "Calculadora Básica"}',
  '{"en": "Simple calculator for basic arithmetic operations", "vi": "Máy tính đơn giản cho phép tính cơ bản", "ja": "基本的な算術演算のための簡単な電卓", "zh": "用于基本算术运算的简单计算器", "es": "Calculadora simple para operaciones aritméticas básicas"}',
  '🧮', 1, 'coming-soon', 'client-side', ARRAY['calculator', 'math', 'arithmetic', 'basic'], ARRAY['fast'], true, false),

('scientific-calculator', 'math',
  '{"en": "Scientific Calculator", "vi": "Máy tính Khoa học", "ja": "関数電卓", "zh": "科学计算器", "es": "Calculadora Científica"}',
  '{"en": "Advanced calculator with scientific functions", "vi": "Máy tính nâng cao với các hàm khoa học", "ja": "科学関数を備えた高度な電卓", "zh": "具有科学函数的高级计算器", "es": "Calculadora avanzada con funciones científicas"}',
  '📐', 2, 'coming-soon', 'client-side', ARRAY['calculator', 'scientific', 'math', 'function'], ARRAY['fast'], false, false),

('graph-plotter', 'math',
  '{"en": "Graph Plotter", "vi": "Vẽ Đồ thị", "ja": "グラフプロッター", "zh": "图形绘制器", "es": "Graficador"}',
  '{"en": "Plot mathematical functions and equations", "vi": "Vẽ đồ thị các hàm và phương trình toán học", "ja": "数学関数と方程式をプロット", "zh": "绘制数学函数和方程图形", "es": "Grafica funciones matemáticas y ecuaciones"}',
  '📈', 4, 'coming-soon', 'client-side', ARRAY['graph', 'plot', 'math', 'function'], ARRAY['fast'], true, false);
