import {
  Text,
  Card,
  BlockStack,
  Box,
  InlineStack,
  Icon,
  Grid,
} from "@shopify/polaris";

import {
  StarFilledIcon
} from '@shopify/polaris-icons';


const appsList = [
  {
    icon: () => {
      return (<svg width="90px" fill="none" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" style={{width:'90px'}}><g clipPath="url(#a)"><path fill="#0C0C0C" d="M0 0h256v256H0z"/><g clipPath="url(#b)"><path d="M256 44.38h-38L146.338-7h109.66v51.38zM121.81-7H85.163v44.629c0 3.73 3.15 6.758 7.031 6.758h80.107c6.764 0 9.626-8.285 4.205-12.178L121.81-7.001zM70.502-7H-.004v110.3H63.47c3.881 0 7.031-3.027 7.031-6.758V-6.998zm14.66 72.241v31.302c0 3.73 3.15 6.758 7.031 6.758h163.8V58.483h-163.8c-3.881 0-7.031 3.027-7.031 6.758zM-.004 166.001V117.4H63.47c3.881 0 7.031 3.027 7.031 6.758v41.844H-.004zm85.362 0h99.335v-41.874c0-3.716-3.134-6.728-7-6.728H92.39c-3.881 0-7.031 3.027-7.031 6.758v41.844zm170.64 0h-57.334v-41.844c0-3.73 3.15-6.758 7.031-6.758h50.303v48.602z" clipRule="evenodd" fill="#282828" fillRule="evenodd"/></g><g clipPath="url(#c)"><path d="M256 253.62h-38L146.338 305h109.66v-51.38zM121.81 305H85.163v-44.629c0-3.73 3.15-6.757 7.031-6.757h80.107c6.764 0 9.626 8.285 4.205 12.177L121.81 305zm-51.308 0H-.004V194.7H63.47c3.881 0 7.031 3.027 7.031 6.758v103.54zm14.66-72.241v-31.302c0-3.731 3.15-6.758 7.031-6.758h163.8v44.818h-163.8c-3.881 0-7.031-3.028-7.031-6.758zM-.004 131.999v48.602H63.47c3.881 0 7.031-3.027 7.031-6.758v-41.844H-.005zm85.362 0h99.335v41.874c0 3.716-3.134 6.728-7 6.728H92.39c-3.881 0-7.031-3.027-7.031-6.758v-41.844zm170.64 0h-57.334v41.844c0 3.731 3.15 6.758 7.031 6.758h50.303v-48.602z" clipRule="evenodd" fill="#282828" fillRule="evenodd"/></g><path fill="#007C6F" d="M38 138h180v118H38z"/><path d="M81.333 186.38a.375.375 0 0 0 .375-.375v-5.625h17.494a.375.375 0 0 0 0-.75H80.958v6.375c0 .207.168.375.375.375zM108 180.38a.375.375 0 0 0 .375-.375v-6.375h-18.62v2.511a.375.375 0 0 0 .75 0v-1.761h17.12v5.625c0 .207.168.375.375.375z" clipRule="evenodd" fill="#15A08C" fillRule="evenodd"/><path d="M80.958 174c0 .207.168.375.375.375h18.244V168a.375.375 0 0 0-.75 0v5.625H81.333a.375.375 0 0 0-.375.375zM198.47 238.62a.375.375 0 0 0-.375.375v5.625h-16.322a.375.375 0 0 0 0 .75h17.072v-6.375a.375.375 0 0 0-.375-.375zM173.56 244.62a.374.374 0 0 0-.375.375v6.375h17.447v-2.511a.375.375 0 0 0-.75 0v1.761h-15.947v-5.625a.375.375 0 0 0-.375-.375zM69.584 238.62a.375.375 0 0 0-.375.375v5.625H52.886a.375.375 0 0 0 0 .75h17.073v-6.375a.375.375 0 0 0-.375-.375zM44.667 244.62a.375.375 0 0 0-.375.375v6.375H61.74v-2.511a.375.375 0 0 0-.75 0v1.761H45.042v-5.625a.375.375 0 0 0-.375-.375zM204.58 213.38a.375.375 0 0 1-.375-.375v-5.625h-16.937v2.297a.375.375 0 0 1-.75 0v-3.047h18.437v6.375a.375.375 0 0 1-.375.375zM213.93 207.38v-6.75h-18.062a.375.375 0 0 0 0 .75h17.312v5.25h-2.526a.375.375 0 0 0 0 .75h3.276z" clipRule="evenodd" fill="#15A08C" fillRule="evenodd"/><path d="M195.87 204.49c.207 0 .375.168.375.375v2.136a.375.375 0 0 1-.75 0v-2.136c0-.207.168-.375.375-.375zM169.02 180.38a.375.375 0 0 1-.375-.375v-5.625h-16.938v2.297a.375.375 0 0 1-.75 0v-3.047h18.438v6.375a.375.375 0 0 1-.375.375zM178.38 174.38v-6.75h-18.062a.375.375 0 0 0 0 .75h17.312v5.25h-2.527a.375.375 0 0 0 0 .75h3.277z" clipRule="evenodd" fill="#15A08C" fillRule="evenodd"/><path d="M160.31 171.49c.207 0 .375.168.375.375v2.136a.375.375 0 0 1-.75 0v-2.136c0-.207.168-.375.375-.375zM48.09 211.38a.375.375 0 0 0 .375-.375v-5.625h16.937v2.297a.375.375 0 0 0 .75 0v-3.047H47.715v6.375c0 .207.168.375.375.375zM38.736 205.38v-6.75h18.062a.375.375 0 0 1 0 .75H39.486v5.25h2.527a.375.375 0 0 1 0 .75h-3.277z" clipRule="evenodd" fill="#15A08C" fillRule="evenodd"/><path d="M56.798 202.49a.375.375 0 0 0-.375.375v2.136a.375.375 0 0 0 .75 0v-2.136a.375.375 0 0 0-.375-.375zM116.98 232.62c.207 0 .375.168.375.375v5.625h16.938v-2.297a.374.374 0 1 1 .75 0v3.047h-18.438v-6.375c0-.207.168-.375.375-.375zM107.62 238.62v6.75h18.062a.375.375 0 0 0 0-.75H108.37v-5.25h2.527a.375.375 0 0 0 0-.75h-3.277z" clipRule="evenodd" fill="#15A08C" fillRule="evenodd"/><path d="M125.69 241.51a.375.375 0 0 1-.375-.375v-2.136a.375.375 0 0 1 .75 0v2.136a.375.375 0 0 1-.375.375z" clipRule="evenodd" fill="#15A08C" fillRule="evenodd"/><path d="M110.29 104h17.709v35H94.665l15.625-35z" fill="#46E8D4"/><path d="M145.71 104h-17.708v35h33.333l-15.625-35zM90.5 104h19.792l-15.625 35H61.333L90.5 104z" fill="#AFFFF5"/><path d="M165.5 104h-19.792l15.625 35h33.334L165.5 104zM72.792 104H90.5l-29.167 35H27.999l44.792-35z" fill="#46E8D4"/><path d="M183.208 104H165.5l29.167 35H228l-44.792-35Z" fill="#AFFFF5"/><path d="M61.333 139h33.333v13.333c0 9.205-7.462 16.667-16.667 16.667s-16.667-7.462-16.667-16.667V139zM128 139h33.333v13.333c0 9.205-7.462 16.667-16.667 16.667-9.204 0-16.666-7.462-16.666-16.667V139zM194.67 139h33.333v13.333c0 9.205-7.462 16.667-16.667 16.667-9.204 0-16.666-7.462-16.666-16.667V139z" fill="#46E8D4"/><path d="M28 139h33.333v13.333c0 9.205-7.462 16.667-16.667 16.667-9.205 0-16.667-7.462-16.667-16.667V139zM94.667 139H128v13.333c0 9.205-7.462 16.667-16.667 16.667-9.204 0-16.666-7.462-16.666-16.667V139zM161.33 139h33.334v13.333c0 9.205-7.462 16.667-16.667 16.667s-16.667-7.462-16.667-16.667V139z" fill="#23CABA"/><path d="M58.476 183h38.095v73H58.476v-73z" fill="#fff"/><path d="M70.478 201.44c.216-.353.566-.353.781 0l13.356 21.885c.216.353.216.927 0 1.28-.215.354-.565.354-.781 0l-13.356-21.884c-.216-.354-.216-.927 0-1.281zM79.66 202.81c.216-.354.566-.354.781 0l3.34 5.471c.215.354.215.927 0 1.281-.217.353-.566.353-.782 0l-3.339-5.472c-.216-.353-.216-.926 0-1.28z" clipRule="evenodd" fill="#F0E9E6" fillRule="evenodd"/><path d="M111.81 187a4 4 0 0 1 4-4h77.714a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4H115.81a4 4 0 0 1-4-4v-40z" fill="#fff"/><path d="M124.96 198.78a.724.724 0 0 1 1.045 0l18.602 19.139a.777.777 0 0 1 0 1.075.725.725 0 0 1-1.046 0l-18.601-19.138a.776.776 0 0 1 0-1.076zM174.2 191.1a.724.724 0 0 1 1.045 0l15.664 16.117a.775.775 0 0 1 0 1.075.724.724 0 0 1-1.045 0L174.2 192.176a.776.776 0 0 1 0-1.076zM184.97 192.11a.724.724 0 0 1 1.045 0l3.916 4.03a.775.775 0 0 1 0 1.075.724.724 0 0 1-1.045 0l-3.916-4.029a.776.776 0 0 1 0-1.076zM143.57 206.42a.724.724 0 0 1 1.045 0l16.644 17.124a.777.777 0 0 1 0 1.075.725.725 0 0 1-1.046 0l-16.643-17.124a.775.775 0 0 1 0-1.075z" clipRule="evenodd" fill="#F0E9E6" fillRule="evenodd"/><rect x="28" y="31" width="200" height="42" rx="21" fill="#46E8D4"/><rect x="32.548" y="31" width="190.91" height="35.875" rx="17.938" fill="#fff"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h256v256H0z"/></clipPath><clipPath id="b"><path fill="#fff" d="M0 0h256v142.63H0z"/></clipPath><clipPath id="c"><path transform="matrix(1 0 0 -1 0 256)" fill="#fff" d="M0 0h256v113.37H0z"/></clipPath></defs></svg>)
    },
    title: "H1 B2B Store Locator",
    rating: 4.9,
    reviews: 398,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc congue nunc ipsum."
  },
  {
    icon: () => {
      return (<svg width="90" height="90" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#a)"><rect width="90" height="90" rx="9" fill="#0C0C0C"/><path fillRule="evenodd" clipRule="evenodd" d="M0 0h16.253v53.866a3.517 3.517 0 0 1-3.516 3.516H0V0Zm23.583 0h18.323l27.348 20.398c2.71 2.025 1.28 6.335-2.102 6.335H27.098a3.517 3.517 0 0 1-3.515-3.516V0ZM90 26.73V0H54.169L90 26.73ZM23.583 53.865V37.582a3.517 3.517 0 0 1 3.515-3.516H90v23.316H27.098a3.517 3.517 0 0 1-3.515-3.516ZM0 64.716V90h16.253V68.231a3.517 3.517 0 0 0-3.516-3.515H0ZM90 90H23.583V68.231a3.517 3.517 0 0 1 3.515-3.515H90V90Z" fill="#282828"/><path d="M18.933 62.952a7.214 7.214 0 0 1 0 10.297L13.71 78.4l-5.222-5.15a7.214 7.214 0 0 1 0-10.297c2.883-2.843 7.563-2.84 10.444 0Z" fill="#23CABA"/><path d="M16.103 65.742a3.304 3.304 0 0 1 0 4.717l-2.392 2.358-2.392-2.358a3.304 3.304 0 0 1 0-4.717 3.418 3.418 0 0 1 4.784 0Z" fill="#fff"/><path d="M18.933 7.053a7.214 7.214 0 0 1 0 10.298L13.71 22.5l-5.222-5.149a7.214 7.214 0 0 1 0-10.298c2.883-2.843 7.563-2.84 10.444 0Z" fill="#23CABA"/><path d="M16.103 9.844a3.304 3.304 0 0 1 0 4.716L13.71 16.92l-2.392-2.359a3.304 3.304 0 0 1 0-4.716 3.418 3.418 0 0 1 4.784 0Z" fill="#fff"/><path d="M41.081 26.037a7.214 7.214 0 0 1 0 10.298l-5.222 5.15-5.221-5.15a7.214 7.214 0 0 1 0-10.298c2.883-2.843 7.563-2.84 10.443 0Z" fill="#23CABA"/><path d="M38.251 28.828a3.304 3.304 0 0 1 0 4.717l-2.392 2.358-2.391-2.358a3.304 3.304 0 0 1 0-4.717 3.418 3.418 0 0 1 4.783 0Z" fill="#fff"/><path d="M72.019 7.053a7.214 7.214 0 0 1 0 10.298L66.797 22.5l-5.222-5.149a7.214 7.214 0 0 1 0-10.298c2.883-2.843 7.563-2.84 10.444 0Z" fill="#23CABA"/><path d="M69.189 9.844a3.304 3.304 0 0 1 0 4.716l-2.392 2.359-2.392-2.359a3.304 3.304 0 0 1 0-4.716 3.418 3.418 0 0 1 4.784 0Z" fill="#fff"/><path d="M90 40.078H55.21l-19.35 11.25h54.13l.01-11.25Z" fill="#AFFFF5"/><path d="M48.516 51.328H35.859V90h12.657V51.328Z" fill="#23CABA"/><path d="M48.516 90H90V51.328H48.516V90Z" fill="#15A08C"/><path d="M44.91 72.422h19.868a2.011 2.011 0 0 0 2.019-2.003V60.362a2.01 2.01 0 0 0-2.019-2.003H44.91a2.01 2.01 0 0 0-2.018 2.003V70.42c0 1.106.904 2.003 2.018 2.003Z" fill="#fff"/></g><defs><clipPath id="a"><rect width="90" height="90" rx="9" fill="#fff"/></clipPath></defs></svg>)
    },
    title: "H1 Multi-Ship",
    rating: 4.9,
    reviews: 398,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc congue nunc ipsum."
  },
  {
    icon: () => {
      return (<svg width="90" height="90" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#a)"><rect width="90" height="90" rx="9" fill="#0C0C0C"/><path d="M-166 90V10.547C-24.615 10.547 90 46.119 90 90h-256Z" fill="#282828"/><path fill="#23CABA" d="m78.142 31.605-17.92-14.51-59.64 73.65 17.92 14.51z"/><path d="m84.296 5.828-29.79 6.766 29.366 23.78.424-30.546Z" fill="#23CABA"/><path fill="#46E8D4" d="m54.361 42.541-17.92-14.51L-8.55 83.59 9.37 98.102z"/><path d="m60.704 16.53-29.98 7L60.09 47.31l.614-30.78Z" fill="#46E8D4"/><path fill="#AFFFF5" d="m30.543 53.523-17.92-14.511-30.064 37.126L.478 90.65z"/><path d="m37.112 27.233-30.207 7.28 29.365 23.78.842-31.06Z" fill="#AFFFF5"/><path d="M95.301 69.434c0 14.659-11.884 26.543-26.543 26.543-14.66 0-26.543-11.884-26.543-26.543 0-14.66 11.884-26.543 26.543-26.543 14.66 0 26.543 11.883 26.543 26.543Z" fill="#fff"/><path fillRule="evenodd" clipRule="evenodd" d="M68.758 92.46c12.718 0 23.027-10.309 23.027-23.026 0-12.718-10.31-23.028-23.027-23.028-12.718 0-23.027 10.31-23.027 23.028 0 12.717 10.31 23.027 23.027 23.027Zm0 3.517c14.66 0 26.543-11.884 26.543-26.543 0-14.66-11.884-26.543-26.543-26.543-14.66 0-26.543 11.883-26.543 26.543 0 14.659 11.884 26.543 26.543 26.543Z" fill="#007C6F"/><path d="m65.934 56.236 2.619 16.535a8.37 8.37 0 1 1-2.62-16.535ZM76.834 62.984l-8.268 1.31-1.31-8.268a8.37 8.37 0 0 1 9.578 6.958ZM60.495 75.402l8.267-1.31 1.31 8.268a8.37 8.37 0 0 1-9.577-6.958ZM71.394 82.151l-2.619-16.535a8.37 8.37 0 1 1 2.62 16.535ZM65.553 53.833a.67.67 0 0 1 1.323-.21l.171 1.08-1.323.21-.17-1.08ZM71.775 84.555a.67.67 0 0 1-1.323.21l-.17-1.082 1.322-.209.171 1.081Z" fill="#007C6F"/></g><defs><clipPath id="a"><rect width="90" height="90" rx="9" fill="#fff"/></clipPath></defs></svg>)
    },
    title: "H1 Fundraise Now",
    rating: 4.9,
    reviews: 398,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc congue nunc ipsum."
  },
  {
    icon: () => {
      return (<svg width="90" height="90" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#a)"><rect width="90" height="90" rx="9" fill="#0C0C0C"/><path d="M90 90H10.547C10.547 40.294 46.119 0 90 0v90Z" fill="#282828"/><path d="M49.922 19.688a7.383 7.383 0 0 0-7.383-7.383H-9.14V27.07h51.68a7.383 7.383 0 0 0 7.383-7.383Z" fill="#46E8D4"/><path d="M48.164 18.686a6.382 6.382 0 0 0-6.382-6.381H-9.14v12.763h50.923a6.382 6.382 0 0 0 6.382-6.382Z" fill="#fff"/><path d="M43.594 36.563a7.383 7.383 0 0 0-7.383-7.383H-9.141v14.765h45.352a7.383 7.383 0 0 0 7.383-7.383Z" fill="#46E8D4"/><path d="M41.836 35.508a6.328 6.328 0 0 0-6.328-6.328H-9.141v12.656h44.649a6.328 6.328 0 0 0 6.328-6.328Z" fill="#fff"/><path d="M37.266 53.438a7.383 7.383 0 0 0-7.383-7.383H-9.141V60.82h39.024a7.383 7.383 0 0 0 7.383-7.383Z" fill="#46E8D4"/><path d="M35.508 52.383a6.328 6.328 0 0 0-6.328-6.328H-9.14V58.71h38.32a6.328 6.328 0 0 0 6.328-6.328Z" fill="#fff"/><path d="M30.938 70.313a7.383 7.383 0 0 0-7.383-7.383H-9.141v14.765h32.696a7.383 7.383 0 0 0 7.383-7.382Z" fill="#46E8D4"/><path d="M29.18 69.258a6.328 6.328 0 0 0-6.328-6.328H-9.141v12.656h31.993a6.328 6.328 0 0 0 6.328-6.328Z" fill="#fff"/><path fillRule="evenodd" clipRule="evenodd" d="M47.235 84.077c3.408 17.78 11.087 29.829 25.538 29.829 14.453 0 22.13-12.049 25.539-29.83 2.887-15.064-10.2-27.645-25.538-27.645-15.34 0-28.426 12.581-25.539 27.646Z" fill="#23CABA"/><path fillRule="evenodd" clipRule="evenodd" d="M66.943 61.761c2.636 3.325 5.83 5.47 5.83 5.47V53.345" fill="#AFFFF5"/><path fillRule="evenodd" clipRule="evenodd" d="M71.038 59.517c-11.611 0-21.023-9.413-21.023-21.023 0-11.611 9.412-21.023 21.023-21.023 11.61 0 21.023 9.412 21.023 21.023 0 11.61-9.413 21.023-21.023 21.023Zm.385-.772c-10.758 0-19.48-8.721-19.48-19.48 0-10.758 8.722-19.48 19.48-19.48 10.759 0 19.48 8.722 19.48 19.48 0 10.759-8.721 19.48-19.48 19.48Z" fill="#007C6F"/><circle cx="18.709" cy="18.709" r="18.709" transform="matrix(-1 0 0 1 91.29 22.485)" fill="#46E8D4"/><circle cx="3.472" cy="3.472" transform="scale(-1 1) rotate(-8 341.442 539.374)" fill="#007C6F" r="3.472"/></g><defs><clipPath id="a"><rect width="90" height="90" rx="9" fill="#fff"/></clipPath></defs></svg>)
    },
    title: "H1 Sales Rep Field Manager",
    rating: 4.9,
    reviews: 398,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc congue nunc ipsum."
  }
];

export const OtherApps = () => {

  return (
    <Card>
      <BlockStack gap="400">

        <BlockStack gap="200">
          <Text as="h2" variant="headingLg">Other Apps by H1 Web Development</Text>
          <Text as="p" variant="bodySm">Our apps are designed to improve your store and boost conversion, with our expert support at every step.</Text>
        </BlockStack>
        
        <Box padding="400">
          <Grid columns={{xs: 1, sm: 1, md: 2, lg: 2, xl: 2}} gap={{xs: "40px", sm: "40px", md: "40px", lg: "40px", xl: "40px"}}>
            {
              appsList.map(app =>
                <Grid.Cell key={'app-' + app.title}>
              
                  <BlockStack gap="400">
                    <InlineStack gap="400" wrap={false} align="start">
                      <Box>
                        <div style={{ height:'90px',width:'90px',overflow:'hidden',borderRadius:'var(--p-border-radius-300)'}}>
                          {app.icon()}
                        </div>
                      </Box>
                      <BlockStack gap="100">
                        <Text as="h2" variant="headingLg">{app.title}</Text>
                        <InlineStack wrap={false} align="start" gap="100">
                          <Text as="span">{app.rating}</Text>
                          <Box width='20px'>
                            <Icon source={StarFilledIcon} tone="warning"/>
                          </Box>
                          <Text as="span">({app.reviews} review{app.reviews > 1 ? 's' : ''})</Text>
                        </InlineStack>
                        <Text as="p">{app.description}</Text>
                      </BlockStack>
                    </InlineStack>
                  </BlockStack>
                  
                </Grid.Cell>    
              )
            }
          </Grid>
        </Box>

      </BlockStack>
    </Card>
  );
}
