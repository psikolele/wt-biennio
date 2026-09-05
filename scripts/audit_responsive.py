import json
from playwright.sync_api import sync_playwright

BASE_URL = "https://wt-biennio.vercel.app"

VIEWPORTS = [
    {"name": "Mobile Small (320px)", "width": 320, "height": 568},
    {"name": "Mobile Standard (375px)", "width": 375, "height": 667},
    {"name": "Mobile Modern (390px)", "width": 390, "height": 844},
    {"name": "Mobile Large (412px)", "width": 412, "height": 915},
    {"name": "Tablet Portrait (768px)", "width": 768, "height": 1024},
    {"name": "Tablet Landscape (1024px)", "width": 1024, "height": 768},
    {"name": "Desktop (1440px)", "width": 1440, "height": 900},
]

ROUTES = [
    {"path": "/", "name": "Landing Page"},
    {"path": "/anno/1", "name": "Indice Anno 1"},
    {"path": "/anno/2", "name": "Indice Anno 2"},
    {"path": "/anno/1/settimana/1", "name": "Settimana 1 (Diagnostic Test)"},
    {"path": "/anno/1/settimana/17", "name": "Settimana 17 (Word + Download)"},
    {"path": "/anno/2/settimana/8", "name": "Settimana 8 (Stampa Unione + Slide)"},
    {"path": "/docenti/login", "name": "Login Docenti"},
]

def check_overflow(page):
    # Evaluates if any element causes horizontal scroll
    js_code = """
    () => {
        const docWidth = document.documentElement.clientWidth;
        const scrollWidth = document.documentElement.scrollWidth;
        const hasOverflow = scrollWidth > docWidth;
        
        let offendingElements = [];
        if (hasOverflow) {
            const allElements = document.querySelectorAll('*');
            for (let el of allElements) {
                const rect = el.getBoundingClientRect();
                if (rect.right > docWidth + 2) {
                    offendingElements.push({
                        tag: el.tagName,
                        className: el.className,
                        id: el.id,
                        right: rect.right,
                        width: rect.width,
                        docWidth: docWidth
                    });
                    if (offendingElements.length >= 5) break;
                }
            }
        }
        return {
            docWidth,
            scrollWidth,
            hasOverflow,
            offendingElements
        };
    }
    """
    return page.evaluate(js_code)

def run_audit():
    print("=" * 80)
    print("           AUDIT AUTOMATIZZATO RESPONSIVE & LAYOUT PLAYWRIGHT           ")
    print("=" * 80)
    print(f"Target URL: {BASE_URL}\\n")
    
    total_checks = 0
    passed_checks = 0
    issues = []
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()
        
        for route in ROUTES:
            url = f"{BASE_URL}{route['path']}"
            print(f"\n--- Testing: {route['name']} ({route['path']}) ---")
            
            for vp in VIEWPORTS:
                total_checks += 1
                page.set_viewport_size({"width": vp["width"], "height": vp["height"]})
                try:
                    page.goto(url, wait_until="domcontentloaded", timeout=20000)
                    page.wait_for_timeout(500) # wait for layout animations
                    
                    res = check_overflow(page)
                    
                    if res["hasOverflow"]:
                        print(f"  [FAIL] {vp['name']}: Overflow detected! (ScrollWidth: {res['scrollWidth']}px > DocWidth: {res['docWidth']}px)")
                        for off in res["offendingElements"]:
                            print(f"         Offending element: <{off['tag']} class='{off['className'][:40]}'> (right={off['right']}px)")
                        issues.append({
                            "route": route["path"],
                            "viewport": vp["name"],
                            "details": res
                        })
                    else:
                        passed_checks += 1
                        print(f"  [PASS] {vp['name']}: No horizontal overflow (DocWidth: {res['docWidth']}px)")
                except Exception as e:
                    print(f"  [ERROR] {vp['name']}: {e}")
                    issues.append({
                        "route": route["path"],
                        "viewport": vp["name"],
                        "error": str(e)
                    })
                    
        browser.close()
        
    print("\n" + "=" * 80)
    print(f"Riepilogo Audit: {passed_checks}/{total_checks} verifiche responsive superate.")
    if issues:
        print(f"Trovate {len(issues)} anomalie di overflow.")
    else:
        print("Tutte le pagine sono 100% conformi senza overflow orizzontale su tutti i dispositivi!")
    print("=" * 80)
    
    return issues

if __name__ == "__main__":
    run_audit()
