// Saca N fotogramas repartidos de un vídeo: swift fotogramas.swift video.mp4 carpeta N ancho
import AVFoundation
import AppKit
let a = CommandLine.arguments
let asset = AVURLAsset(url: URL(fileURLWithPath: a[1]))
let n = Int(a[3])!, ancho = Double(a[4])!
let gen = AVAssetImageGenerator(asset: asset)
gen.appliesPreferredTrackTransform = true
gen.requestedTimeToleranceBefore = .zero; gen.requestedTimeToleranceAfter = .zero
gen.maximumSize = CGSize(width: ancho, height: ancho)
let dur = CMTimeGetSeconds(asset.duration)
for i in 0..<n {
  let t = CMTime(seconds: dur * Double(i) / Double(n - 1) * 0.999, preferredTimescale: 600)
  let img = try gen.copyCGImage(at: t, actualTime: nil)
  let rep = NSBitmapImageRep(cgImage: img)
  try rep.representation(using: .jpeg, properties: [.compressionFactor: 0.85])!.write(to: URL(fileURLWithPath: "\(a[2])/f\(String(format: "%03d", i)).jpg"))
}
print("ok", dur)
