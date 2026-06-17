import AppKit
import Foundation

struct PaintingItem: Decodable {
    let index: Int
    let file: String
    let title: String
    let category: [String]
    let dimensions: String
    let year: Int?
    let pdf_page: Int
}

struct GraphicsItem: Decodable {
    let id: Int
    let filename: String
    let pdf_page: Int
    let visible_title: String
    let category: [String]
}

struct CategoryItem: Decodable {
    let id: String
    let title: String
}

let root = URL(fileURLWithPath: FileManager.default.currentDirectoryPath)
let titleFont = NSFont.boldSystemFont(ofSize: 24)
let metaFont = NSFont.systemFont(ofSize: 17)
let categoryFont = NSFont.boldSystemFont(ofSize: 18)
let textColor = NSColor.black
let categoryColor = NSColor(calibratedRed: 0.16, green: 0.32, blue: 0.58, alpha: 1)
let categories: [CategoryItem] = try decode("images/categories.json", as: [CategoryItem].self)
let categoryTitles = Dictionary(uniqueKeysWithValues: categories.map { ($0.id, $0.title) })

func decode<T: Decodable>(_ path: String, as type: T.Type) throws -> T {
    let data = try Data(contentsOf: root.appendingPathComponent(path))
    return try JSONDecoder().decode(type, from: data)
}

func drawText(_ text: String, in rect: NSRect, font: NSFont, color: NSColor = textColor) {
    let paragraph = NSMutableParagraphStyle()
    paragraph.lineBreakMode = .byWordWrapping
    paragraph.alignment = .left
    text.draw(
        in: rect,
        withAttributes: [
            .font: font,
            .foregroundColor: color,
            .paragraphStyle: paragraph,
        ]
    )
}

func drawSheet<Item>(
    items: [Item],
    outputPath: String,
    columns: Int,
    cellWidth: CGFloat,
    cellHeight: CGFloat,
    imageHeight: CGFloat,
    imagePath: (Item) -> String,
    title: (Item) -> String,
    category: (Item) -> String,
    meta: (Item) -> String
) throws {
    let rows = Int(ceil(Double(items.count) / Double(columns)))
    let width = Int(cellWidth) * columns
    let height = Int(cellHeight) * rows
    let image = NSImage(size: NSSize(width: width, height: height))

    image.lockFocus()
    NSColor.white.setFill()
    NSRect(x: 0, y: 0, width: width, height: height).fill()

    for (offset, item) in items.enumerated() {
        let column = offset % columns
        let row = offset / columns
        let x = CGFloat(column) * cellWidth
        let y = CGFloat(height) - CGFloat(row + 1) * cellHeight
        let cell = NSRect(x: x, y: y, width: cellWidth, height: cellHeight)

        NSColor(calibratedWhite: 0.82, alpha: 1).setStroke()
        cell.frame()

        if let artwork = NSImage(contentsOf: root.appendingPathComponent(imagePath(item))) {
            let maxWidth = cellWidth - 36
            let maxHeight = imageHeight
            let scale = min(maxWidth / artwork.size.width, maxHeight / artwork.size.height)
            let drawWidth = artwork.size.width * scale
            let drawHeight = artwork.size.height * scale
            let imageRect = NSRect(
                x: x + (cellWidth - drawWidth) / 2,
                y: y + cellHeight - drawHeight - 18,
                width: drawWidth,
                height: drawHeight
            )
            artwork.draw(in: imageRect)
        }

        let textX = x + 16
        drawText(title(item), in: NSRect(x: textX, y: y + 76, width: cellWidth - 32, height: 62), font: titleFont)
        drawText(category(item), in: NSRect(x: textX, y: y + 49, width: cellWidth - 32, height: 24), font: categoryFont, color: categoryColor)
        drawText(meta(item), in: NSRect(x: textX, y: y + 24, width: cellWidth - 32, height: 22), font: metaFont)
    }

    image.unlockFocus()

    guard
        let tiff = image.tiffRepresentation,
        let bitmap = NSBitmapImageRep(data: tiff),
        let jpeg = bitmap.representation(using: .jpeg, properties: [.compressionFactor: 0.9])
    else {
        throw NSError(domain: "ContactSheet", code: 1, userInfo: [NSLocalizedDescriptionKey: "Could not render JPEG"])
    }

    try jpeg.write(to: root.appendingPathComponent(outputPath))
}

func categoryLabel(_ ids: [String]) -> String {
    ids.map { categoryTitles[$0] ?? $0 }.joined(separator: ", ")
}

let painting: [PaintingItem] = try decode("images/painting/manifest.json", as: [PaintingItem].self)
try drawSheet(
    items: painting,
    outputPath: "images/painting/contact_sheet.jpg",
    columns: 4,
    cellWidth: 320,
    cellHeight: 430,
    imageHeight: 285,
    imagePath: { "images/painting/\($0.file)" },
    title: { $0.title },
    category: { categoryLabel($0.category) },
    meta: { item in
        let year = item.year.map(String.init) ?? ""
        return "\(year) · \(item.dimensions) · стр. \(item.pdf_page)"
    }
)

let graphics: [GraphicsItem] = try decode("images/graphics/manifest.json", as: [GraphicsItem].self)
try drawSheet(
    items: graphics,
    outputPath: "images/graphics/contact_sheet.jpg",
    columns: 3,
    cellWidth: 300,
    cellHeight: 430,
    imageHeight: 300,
    imagePath: { "images/graphics/artworks/\($0.filename)" },
    title: { item in
        let visibleTitle = item.visible_title.trimmingCharacters(in: .whitespacesAndNewlines)
        return String(format: "%02d · PDF page %d", item.id, item.pdf_page) + (visibleTitle.isEmpty ? "" : "\n\(visibleTitle)")
    },
    category: { categoryLabel($0.category) },
    meta: { item in
        let visibleTitle = item.visible_title.trimmingCharacters(in: .whitespacesAndNewlines)
        return visibleTitle.isEmpty ? "Без подписи в каталоге" : "стр. \(item.pdf_page)"
    }
)
