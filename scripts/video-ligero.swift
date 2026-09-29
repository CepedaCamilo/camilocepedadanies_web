// Recomprime un vídeo en H.264 sin sonido, con el ancho y la calidad (bitrate) que le digamos.
// Usa AVFoundation de macOS: no hace falta instalar ffmpeg.
// Uso: swift scripts/video-ligero.swift entrada.mp4 salida.mp4 <ancho> <kbps> [alto]
// Con [alto] recorta el centro (como object-fit: cover), p. ej. 1080 1080 = cuadrado para el móvil en vertical.
import AVFoundation

let a = CommandLine.arguments
guard a.count >= 5, let ancho = Int(a[3]), let kbps = Int(a[4]) else {
  print("Uso: swift video-ligero.swift entrada.mp4 salida.mp4 <ancho> <kbps>"); exit(1)
}
let entrada = URL(fileURLWithPath: a[1]), salida = URL(fileURLWithPath: a[2])
try? FileManager.default.removeItem(at: salida)

let asset = AVURLAsset(url: entrada)
let pista = asset.tracks(withMediaType: .video)[0]
let tam = pista.naturalSize.applying(pista.preferredTransform)
let alto = a.count > 5 ? Int(a[5])! : Int((Double(ancho) * abs(Double(tam.height)) / abs(Double(tam.width)) / 2).rounded()) * 2

let lector = try AVAssetReader(asset: asset)
let lectura = AVAssetReaderTrackOutput(track: pista, outputSettings: [kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA])
lector.add(lectura)

let escritor = try AVAssetWriter(outputURL: salida, fileType: .mp4)
escritor.shouldOptimizeForNetworkUse = true // el índice va al principio: empieza a verse antes de terminar de bajar
let escritura = AVAssetWriterInput(mediaType: .video, outputSettings: [
  AVVideoCodecKey: AVVideoCodecType.h264,
  AVVideoWidthKey: ancho, AVVideoHeightKey: alto,
  AVVideoScalingModeKey: AVVideoScalingModeResizeAspectFill,
  AVVideoCompressionPropertiesKey: [
    AVVideoAverageBitRateKey: kbps * 1000,
    AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel,
    AVVideoMaxKeyFrameIntervalDurationKey: 2,
    AVVideoAllowFrameReorderingKey: true,
    AVVideoExpectedSourceFrameRateKey: pista.nominalFrameRate,
  ],
])
escritura.transform = pista.preferredTransform
escritura.expectsMediaDataInRealTime = false
escritor.add(escritura)

lector.startReading()
escritor.startWriting()
escritor.startSession(atSourceTime: .zero)
let cola = DispatchQueue(label: "video")
let fin = DispatchSemaphore(value: 0)
escritura.requestMediaDataWhenReady(on: cola) {
  while escritura.isReadyForMoreMediaData {
    if let muestra = lectura.copyNextSampleBuffer() { escritura.append(muestra) }
    else { escritura.markAsFinished(); escritor.finishWriting { fin.signal() }; return }
  }
}
fin.wait()
if escritor.status != .completed { print("Error:", escritor.error ?? "desconocido"); exit(1) }
let bytes = (try? FileManager.default.attributesOfItem(atPath: salida.path)[.size] as? Int) ?? 0
print("\(salida.lastPathComponent): \(ancho)×\(alto), \(kbps) kbps → \(String(format: "%.1f", Double(bytes) / 1048576)) MB")
