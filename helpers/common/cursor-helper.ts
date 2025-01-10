export const addCursorStyleAndScript = async (page: any) => {
  await page.addStyleTag({
    content: `
            #playwright-cursor {
                position: absolute;
                width: 20px;
                height: 20px;
                background: red;
                border: 2px solid black;
                border-radius: 50%;
                pointer-events: none;
                z-index: 10000;
            }
        `,
  })
  await page.evaluate(() => {
    const cursor = document.createElement('div')
    cursor.id = 'playwright-cursor'
    document.body.appendChild(cursor)

    document.addEventListener('mousemove', (event) => {
      const cursor = document.getElementById('playwright-cursor')
      if (cursor) {
        cursor.style.left = `${event.pageX}px`
        cursor.style.top = `${event.pageY}px`
      }
    })
  })
}
