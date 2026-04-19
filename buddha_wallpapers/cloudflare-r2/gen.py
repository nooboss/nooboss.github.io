import os
import json
import math

ROOT_DIR = os.path.join(os.path.dirname(__file__), "wallpapers")
THUMB_DIR = os.path.join(ROOT_DIR, "thumb")
CATEGORIES_FILE = os.path.join(ROOT_DIR, "categories.json")

ITEMS_PER_PAGE = 15


def load_categories():
    with open(CATEGORIES_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def save_categories(data):
    with open(CATEGORIES_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def get_wallpaper_files(folder_path):
    files = [
        f for f in os.listdir(folder_path)
        if f.lower().endswith(".jpg")
    ]
    files.sort()  # ensure order like wall-00001.jpg
    return files


def build_wallpaper_item(filename, is_live):
    wall_id = filename.replace(".jpg", "")
    return {
        "id": wall_id,
        "price": 10,  # default (you can customize later)
        "isLive": is_live,
        "name": wall_id.replace("-", "").title(),
        "thumb": filename,
        "full": filename
    }


def create_pages(category_id, folder_path, is_live):
    files = get_wallpaper_files(folder_path)

    total_pages = math.ceil(len(files) / ITEMS_PER_PAGE)

    for page in range(1, total_pages + 1):
        start = (page - 1) * ITEMS_PER_PAGE
        end = start + ITEMS_PER_PAGE
        page_files = files[start:end]

        wallpapers = [
            build_wallpaper_item(f, is_live)
            for f in page_files
        ]

        data = {
            "category_id": category_id,
            "page": page,
            "has_more": page < total_pages,
            "wallpapers": wallpapers
        }

        output_path = os.path.join(folder_path, f"page-{page}.json")
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)


def main():
    categories_data = load_categories()

    for category in categories_data["categories"]:
        cate_id = category["id"]
        is_live = str(category.get("isLive", "false")).lower() == "true"

        folder_path = os.path.join(THUMB_DIR, cate_id)

        if not os.path.isdir(folder_path):
            print(f"⚠️ Missing folder: {folder_path}")
            continue

        files = get_wallpaper_files(folder_path)

        if not files:
            print(f"⚠️ No images in: {folder_path}")
            continue

        # ✅ Update thumbnail (first file)
        category["thumbnail"] = files[0]

        # ✅ Generate pagination files
        create_pages(cate_id, folder_path, is_live)

    # ✅ Save updated categories.json
    save_categories(categories_data)

    print("✅ Done!")


if __name__ == "__main__":
    main()