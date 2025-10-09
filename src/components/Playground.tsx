import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { analytics } from "../utils/analytics";
import { feelingsData } from "../lib/playground/feelings";
import { generateDirectFeelingImage } from "../lib/playground/compose";
import CategoryTabs from "./playground/CategoryTabs";
import Tile from "./playground/Tile";
import LanguageSelector from "./playground/LanguageSelector";
import HighContrastToggle from "./playground/HighContrastToggle";
import PrintButton from "./playground/PrintButton";
import Toast from "./playground/Toast";
import FileDrop from "./playground/FileDrop";
import DisclaimerBanner from "./playground/DisclaimerBanner";

// Debug mode: Set to 1 for testing, 6 for limited generation, 24 for production
const DEBUG_TILE_COUNT = 6; // Change to 24 for production

const PHRASES = [
  "Grabbing a fresh notebook",
  "Unpacking digital suitcases",
  "Fluffing the data pillows",
  "Mixing bits and bytes",
  "Sipping virtual lemonade",
  "Organizing our toolbox",
  "Polishing the code gears",
  "Syncing friendly vibes",
  "Stirring the logic soup",
  "Counting happy photons",
  "Stretching neural muscles",
  "Heating up inspiration",
  "Sharpening pencils of thought",
  "Aligning tiny magnets",
  "Loading gentle whispers",
  "Collecting cozy moments",
  "Dusting off metadata",
  "Filling jars with ideas",
  "Painting pixels calmly",
  "Humming a hopeful tune",
  "Tuning the memory strings",
  "Planting seeds of knowledge",
  "Tickling the algorithm",
  "Checking compass bearings",
  "Straightening virtual frames",
  "Flipping through storybooks",
  "Brewing a calm breeze",
  "Gathering morning sunshine",
  "Building paper airplanes",
  "Stacking rainbow blocks",
  "Sorting candy-colored bytes",
  "Smoothing silk threads",
  "Tracing friendly footprints",
  "Popping bubble wrap of joy",
  "Charting starlit maps",
  "Holding doors for packets",
  "Rolling out welcome mats",
  "Measuring teaspoons of code",
  "Setting up campfires",
  "Ordering extra sprinkles",
  "Calibrating curiosity meters",
  "Baking binary cupcakes",
  "Folding origami cranes",
  "Teaching zeros to dance",
  "Untangling headphone cords",
  "Watering pixel plants",
  "Polishing friendly robots",
  "Fanning creative sparks",
  "Catching cloud daydreams",
  "Wrapping ideas in bows",
  "Lining up shiny marbles",
  "Refilling positivity jars",
  "Adjusting comfy armchairs",
  "Writing upbeat postcards",
  "Bundling fresh insights",
  "Whistling while we work",
  "Inflating imagination balloons",
  "Adding glitter to graphs",
  "Organizing sticker albums",
  "Labeling treasure chests",
  "Herding playful kittens",
  "Filling sails with breeze",
  "Lighting lanterns of hope",
  "Planting window gardens",
  "Sewing quilted patterns",
  "Skipping stones of thought",
  "Mapping secret passages",
  "Placing bookmarks gently",
  "Gifting virtual high‑fives",
  "Composing warm melodies",
  "Harvesting idea berries",
  "Bouncing rubber duckies",
  "Pressing subtle pause",
  "Sweeping porch steps",
  "Recharging kindness batteries",
  "Stacking library books",
  "Sorting postcards by color",
  "Arranging puzzle pieces",
  "Flipping pancakes of code",
  "Carving wooden whistles",
  "Spinning tiny windmills",
  "Plaiting friendship bracelets",
  "Wrapping up loose ends",
  "Coloring inside lines",
  "Collecting lost buttons",
  "Sanding smooth surfaces",
  "Gluing googly eyes",
  "Mapping rainbow arcs",
  "Selecting comfy pillows",
  "Baking cinnamon smiles",
  "Snapping happy photos",
  "Beaming friendly signals",
  "Raking autumn leaves",
  "Drawing chalk doodles",
  "Sniffing fresh bread",
  "Hanging string lights",
  "Pruning bonsai trees",
  "Picking blueberries",
  "Stocking lemonade stand",
  "Opening storybook gates",
  "Crocheting cozy scarves",
  "Lighting birthday candles",
  "Filling piñatas with laughs",
  "Turning pages softly",
  "Kneading pizza dough",
  "Skipping rope rhythms",
  "Floating paper boats",
  "Blowing cotton clouds",
  "Catching ladybugs",
  "Balancing smooth stones",
  "Tracing shooting stars",
  "Pouring honey thoughts",
  "Splashing paint playfully",
  "Juggling colorful scarves",
  "Tuning toy ukuleles",
  "Counting fireflies",
  "Flipping calendar pages",
  "Folding paper hearts",
  "Gathering seashells",
  "Sipping cocoa carefully",
  "Threading magic beads",
  "Sharing umbrella shade",
  "Baking gingerbread code",
  "Combing sandy beaches",
  "Installing happy updates",
  "Refining sunrise gradients",
  "Filling bird feeders",
  "Tossing confetti gently",
  "Spreading picnic blankets",
  "Lighting sparklers",
  "Whittling soft whistles",
  "Grazing fluffy clouds",
  "Cherishing warm mittens",
  "Scaling candy mountains",
  "Scooping ice cream bytes",
  "Paddling calm rivers",
  "Capturing moonbeams",
  "Applying gentle polish",
  "Bundling starlight packets",
  "Creating chalk rainbows",
  "Stringing popcorn garlands",
  "Pressing flower petals",
  "Clipping paper coupons",
  "Spooling cotton reels",
  "Braiding bright ribbons",
  "Planting story seeds",
  "Surfing easy breezes",
  "Drizzling caramel thoughts",
  "Whisking marshmallow fluff",
  "Squeezing citrus smiles",
  "Placing stepping stones",
  "Rolling snowball ideas",
  "Carving pumpkin grins",
  "Frothing latte letters",
  "Waving friendly pennants",
  "Twirling maple leaves",
  "Opening treasure maps",
  "Unfolding paper fans",
  "Arranging pebbled paths",
  "Fueling rocket dreams",
  "Sweeping stargazer decks",
  "Curing stage jitters",
  "Refilling ink wells",
  "Sculpting sandcastles",
  "Aligning domino trails",
  "Stacking waffle towers",
  "Listening for echoes",
  "Twisting balloon animals",
  "Drawing treasure X",
  "Cleaning kaleidoscopes",
  "Stacking card houses",
  "Sketching gentle swirls",
  "Clicking castanets softly",
  "Launching kite strings",
  "Meandering garden paths",
  "Penciling soft outlines",
  "Tracing gentle curves",
  "Seeding galaxy gardens",
  "Ticking pocket watches",
  "Tuning wind chimes",
  "Prepping snow‑cone syrup",
  "Spreading warm butter",
  "Gathering dandelion fluff",
  "Feathering nest pillows",
  "Hanging paper lanterns",
  "Arranging sunflower bouquets",
  "Mending patchwork quilts",
  "Gilding picture frames",
  "Smoothing beach towels",
  "Gathering pinecones",
  "Copying soft lullabies",
  "Buttoning cozy coats",
  "Splashing puddles lightly",
  "Wrapping winter scarves",
  "Threading popcorn chains",
  "Arranging tea biscuits",
  "Catching morning dew",
  "Stretching rainbow bridges",
  "Lining cupcake pans",
  "Knotting friendship cords",
  "Quieting library whispers",
  "Muffling snow footsteps",
  "Doodling sunny faces",
  "Updating kindness logs",
  "Lighting porch lanterns",
  "Weaving hammock ropes",
  "Stringing fairy lights",
  "Canning sweet preserves",
  "Stamping travel passports",
  "Refilling soap bubbles",
  "Cruising gentle waves",
  "Pairing mismatched socks",
  "Clipping garden herbs",
  "Coiling jump ropes",
  "Arranging chess pieces",
  "Flipping storytime tabs",
  "Porting picnic baskets",
  "Inflating beach balls",
  "Measuring tiny footprints",
  "Hammering toy nails",
  "Guiding paper airplanes",
  "Tracing gentle ripples",
  "Frosting birthday cakes",
  "Mirroring moonlit ponds",
  "Drifting cotton swirls",
  "Sprinkling powdered sugar",
  "Ringing bicycle bells",
  "Floating feather wishes",
  "Thawing frozen smiles",
  "Collecting lucky pennies",
  "Aligning stepping stools",
  "Kicking autumn acorns",
  "Whirling pinwheels",
  "Rhyming silly poems",
  "Sprouting bean sprouts",
  "Lacing sneaker strings",
  "Nesting tiny sparrows",
  "Chalking hopscotch squares",
  "Bundling yarn skeins",
  "Jotting sweet doodles",
  "Hopping pebble trails",
  "Stitching secret pockets",
  "Backspacing typos",
  "Holding golden bookmarks",
  "Cheering gentle victories",
  "Rinsing paintbrush tips",
  "Fanning paper notes",
  "Flipping library tabs",
  "Sailing gentle breezes",
  "Counting soft heartbeats",
  "Peeling citrus slices",
  "Threading soft melodies",
  "Balancing toy blocks",
  "Lulling sleepy dragons",
  "Nibbling ginger snaps",
  "Polishing marble tops",
  "Harvesting honeycomb",
  "Whispering bedtime tales",
  "Hugging teddy bears",
  "Catching soap bubbles",
  "Stirring cocoa swirls",
  "Ticking gentle timers",
  "Collecting star stickers",
  "Floating dandelion seeds",
  "Juggling soft pillows",
  "Stacking donut rings",
  "Planting lily bulbs",
  "Kissing boo‑boos better",
  "Guarding secret gardens",
  "Reeling kite spools",
  "Guiding gentle raindrops",
  "Seasoning noodle soups",
  "Arranging pastel crayons",
  "Singing shower songs",
  "Feeding rubber ducks",
  "Blending berry smoothies",
  "Folding pajamas neatly",
  "Cropping photo corners",
  "Spooling cotton reels",
  "Braiding bright ribbons",
  "Planting story seeds",
  "Surfing easy breezes",
  "Drizzling caramel thoughts",
  "Whisking marshmallow fluff",
  "Squeezing citrus smiles",
  "Placing stepping stones",
  "Rolling snowball ideas",
  "Carving pumpkin grins",
  "Frothing latte letters",
  "Waving friendly pennants",
  "Twirling maple leaves",
  "Opening treasure maps",
  "Unfolding paper fans",
  "Arranging pebbled paths",
  "Fueling rocket dreams",
  "Sweeping stargazer decks",
  "Curing stage jitters",
  "Refilling ink wells",
  "Sculpting sandcastles",
  "Aligning domino trails",
  "Stacking waffle towers",
  "Listening for echoes",
  "Twisting balloon animals",
  "Drawing treasure X",
  "Cleaning kaleidoscopes",
  "Stacking card houses",
  "Sketching gentle swirls",
  "Clicking castanets softly",
  "Launching kite strings",
  "Meandering garden paths",
  "Penciling soft outlines",
  "Tracing gentle curves",
  "Seeding galaxy gardens",
  "Ticking pocket watches",
  "Tuning wind chimes",
  "Prepping snow‑cone syrup",
  "Spreading warm butter",
  "Gathering dandelion fluff",
  "Feathering nest pillows",
  "Hanging paper lanterns",
  "Arranging sunflower bouquets",
  "Mending patchwork quilts",
  "Gilding picture frames",
  "Smoothing beach towels",
  "Gathering pinecones",
  "Copying soft lullabies",
  "Buttoning cozy coats",
  "Splashing puddles lightly",
  "Wrapping winter scarves",
  "Threading popcorn chains",
  "Arranging tea biscuits",
  "Catching morning dew",
  "Stretching rainbow bridges",
  "Lining cupcake pans",
  "Knotting friendship cords",
  "Quieting library whispers",
  "Muffling snow footsteps",
  "Doodling sunny faces",
  "Updating kindness logs",
  "Lighting porch lanterns",
  "Weaving hammock ropes",
  "Stringing fairy lights",
  "Canning sweet preserves",
  "Stamping travel passports",
  "Refilling soap bubbles",
  "Cruising gentle waves",
  "Pairing mismatched socks",
  "Clipping garden herbs",
  "Coiling jump ropes",
  "Arranging chess pieces",
  "Flipping storytime tabs",
  "Porting picnic baskets",
  "Inflating beach balls",
  "Measuring tiny footprints",
  "Hammering toy nails",
  "Guiding paper airplanes",
  "Tracing gentle ripples",
  "Frosting birthday cakes",
  "Mirroring moonlit ponds",
  "Drifting cotton swirls",
  "Sprinkling powdered sugar",
  "Ringing bicycle bells",
  "Floating feather wishes",
  "Thawing frozen smiles",
  "Collecting lucky pennies",
  "Aligning stepping stools",
  "Kicking autumn acorns",
  "Whirling pinwheels",
  "Rhyming silly poems",
  "Sprouting bean sprouts",
  "Lacing sneaker strings",
  "Nesting tiny sparrows",
  "Chalking hopscotch squares",
  "Bundling yarn skeins",
  "Jotting sweet doodles",
  "Hopping pebble trails",
  "Stitching secret pockets",
  "Backspacing typos",
  "Holding golden bookmarks",
  "Cheering gentle victories",
  "Rinsing paintbrush tips",
  "Fanning paper notes",
  "Flipping library tabs",
  "Sailing gentle breezes",
  "Counting soft heartbeats",
  "Peeling citrus slices",
  "Threading soft melodies",
  "Balancing toy blocks",
  "Lulling sleepy dragons",
  "Nibbling ginger snaps",
  "Polishing marble tops",
  "Harvesting honeycomb",
  "Whispering bedtime tales",
  "Hugging teddy bears",
  "Catching soap bubbles",
  "Stirring cocoa swirls",
  "Ticking gentle timers",
  "Collecting star stickers",
  "Floating dandelion seeds",
  "Juggling soft pillows",
  "Stacking donut rings",
  "Planting lily bulbs",
  "Kissing boo‑boos better",
  "Guarding secret gardens",
  "Reeling kite spools",
  "Guiding gentle raindrops",
  "Seasoning noodle soups",
  "Arranging pastel crayons",
  "Singing shower songs",
  "Feeding rubber ducks",
  "Blending berry smoothies",
  "Folding pajamas neatly",
  "Cropping photo corners",
];

const PHRASE_COLORS = [
  "#FF6B6B", // Red
  "#4ECDC4", // Teal
  "#FFD93D", // Yellow
  "#1A535C", // Dark teal
  "#FFB6B9", // Pink
  "#6A89CC", // Blue
  "#38ADA9", // Green
  "#F8A5C2", // Light pink
  "#60A3D9", // Sky blue
  "#F6D365", // Light yellow
  "#B8E994", // Light green
  "#F3A683", // Orange
  "#786FA6", // Purple
  "#574B90", // Deep purple
  "#3DC1D3", // Cyan
  "#E17055", // Coral
  "#00B894", // Emerald
  "#00B8D4", // Bright blue
  "#F9CA24", // Gold
  "#EA8685", // Soft red
];

interface PlaygroundProps {
  onBack: () => void;
}

const Playground: React.FC<PlaygroundProps> = ({ onBack }) => {
  const navigate = useNavigate();
  const printRef = useRef<HTMLDivElement>(null);
  const [avatar, setAvatar] = useState<{ originalFile: File } | null>(null);
  const [language, setLanguage] = useState<"en" | "es" | "pt">("en");
  const [highContrast, setHighContrast] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<
    "goodBody" | "goodFeelings" | "badFeelings" | "badBody" | null
  >("goodBody");
  const [composedTiles, setComposedTiles] = useState<Map<string, Blob>>(
    new Map()
  );
  const [composedUrls, setComposedUrls] = useState<Map<string, string>>(
    new Map()
  );
  const [isComposing, setIsComposing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [imagesCreated, setImagesCreated] = useState(0);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [shouldStartGeneration, setShouldStartGeneration] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const handlePrint = useReactToPrint({
    documentTitle: "MaTalk Feelings Reference",
    contentRef: printRef,
  });

  // Set default category if none selected
  useEffect(() => {
    if (!currentCategory) {
      setCurrentCategory("goodBody");
    }
  }, [currentCategory]);

  // Rotate phrases every 4 seconds while composing
  useEffect(() => {
    if (!isComposing) return;

    const interval = setInterval(() => {
      setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % PHRASES.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isComposing]);

  // Apply high contrast mode
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-high-contrast",
      highContrast.toString()
    );
  }, [highContrast]);

  const handleFileSelect = async (file: File) => {
    console.log("File selected:", file.name, file.type, file.size);

    setIsUploading(true);
    setError(null);

    try {
      // Basic validation
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }

      // Store the uploaded file (no generation yet)
      setAvatar({ originalFile: file });
      setUploadedImage(file);

      // Show success message
      setToast({
        message: "Photo uploaded successfully!",
        type: "success",
      });
    } catch (err) {
      console.error("Upload error:", err);
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  const handleStartGeneration = async () => {
    if (!uploadedImage) return;

    // For now, start generation directly (free preview)
    setShouldStartGeneration(true);

    // Scroll to board section
    setTimeout(() => {
      const boardSection = document.getElementById("board-section");
      boardSection?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handlePaymentClick = async () => {
    if (!uploadedImage) return;

    // Skip payment and directly start generation
    console.log("Skipping payment - starting generation directly");
    setShouldStartGeneration(true);

    // Show success message
    setToast({
      message: "Generating your personalized feelings board...",
      type: "success",
    });

    // Scroll to board section
    setTimeout(() => {
      const boardSection = document.getElementById("board-section");
      boardSection?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Generate feeling images directly from uploaded photo
  useEffect(() => {
    console.log("Generation useEffect triggered:", {
      hasAvatar: !!avatar,
      hasOriginalFile: !!avatar?.originalFile,
      shouldStartGeneration,
      avatarFile: avatar?.originalFile?.name,
    });

    if (!avatar?.originalFile || !shouldStartGeneration) {
      console.log("Generation useEffect: conditions not met, returning early");
      return;
    }

    const composeAllTiles = async () => {
      setIsComposing(true);
      setImagesCreated(0);
      const newComposedTiles = new Map<string, Blob>();
      const newComposedUrls = new Map<string, string>();

      try {
        // Process all tiles
        let processedCount = 0;
        const totalTiles = feelingsData.reduce(
          (total, category) => total + category.tiles.length,
          0
        );

        for (const category of feelingsData) {
          for (const tile of category.tiles) {
            try {
              console.log(
                `🔄 Processing tile ${processedCount + 1}/${totalTiles}: ${
                  tile.key
                }`
              );

              const composedBlob = await generateDirectFeelingImage(
                avatar.originalFile,
                tile.assetPath,
                tile.key
              );

              const composedUrl = URL.createObjectURL(composedBlob);
              console.log(
                `✅ Generated personalized URL for ${tile.key}:`,
                composedUrl
              );

              newComposedTiles.set(tile.key, composedBlob);
              newComposedUrls.set(tile.key, composedUrl);

              processedCount++;
              setImagesCreated(processedCount);

              // Stop processing if we've reached the debug tile count
              if (processedCount >= DEBUG_TILE_COUNT) {
                console.log(
                  `🐛 Debug mode: Processed ${processedCount} tiles (limit: ${DEBUG_TILE_COUNT})`
                );
                break;
              }
            } catch (error) {
              console.error(`❌ Failed to compose tile ${tile.key}:`, error);
              // Continue with other tiles even if one fails
              processedCount++;
              setImagesCreated(processedCount);
            }
          }

          // Stop processing if we've reached the debug tile count
          if (processedCount >= DEBUG_TILE_COUNT) {
            break;
          }
        }

        setComposedTiles(newComposedTiles);
        setComposedUrls(newComposedUrls);
      } catch (error) {
        console.error("Failed to compose tiles:", error);
        setToast({
          message: "Failed to generate personalized feeling images",
          type: "error",
        });
      } finally {
        setIsComposing(false);
      }
    };

    composeAllTiles();
  }, [avatar, shouldStartGeneration]);

  // Cleanup URLs when component unmounts
  useEffect(() => {
    return () => {
      composedUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [composedUrls]);

  const currentCategoryData = feelingsData.find(
    (cat) => cat.key === currentCategory
  );

  const handleLanguageChange = (newLanguage: typeof language) => {
    setLanguage(newLanguage);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Print content - always rendered */}
      <div ref={printRef} className="print-content">
        {feelingsData.map((category) => (
          <div key={category.key} className="print-page">
            <div className="print-header">
              <h1>MaTalk Feelings Reference</h1>
              <p>Communication board for expressing feelings and emotions</p>
            </div>
            <div className="print-category-title">
              <h2>{category.label[language]}</h2>
            </div>
            <div className="print-grid">
              {category.tiles.map((tile) => (
                <div key={tile.key} className="print-tile">
                  <div className="print-tile-image">
                    <img src={tile.assetPath} alt={tile.label[language]} />
                  </div>
                  <div className="print-tile-label">
                    <span>{tile.label[language]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="main-container container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              MaTalk Playground
            </h1>
            <p className="text-lg text-gray-600">
              Explore feelings with AI-powered personalization
            </p>
          </div>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Go to AI Demo
          </button>
        </div>

        <DisclaimerBanner />

        {/* Upload Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              HeroMe Feelings Collage
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Upload an image and create an AAC feelings collage that looks like
              you or anyone you choose
            </p>
            <p className="text-gray-500 max-w-3xl mx-auto mb-8">
              Transform any photo into a personalized feelings communication
              board. Our AI will create cartoon-style versions of your image
              expressing different emotions, perfect for AAC (Augmentative and
              Alternative Communication) users.
            </p>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center mb-8">
              <button
                onClick={() => setShowHowItWorks(true)}
                className="bg-blue-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                How it works
              </button>
              <button
                onClick={() => {
                  const uploadSection =
                    document.getElementById("upload-section");
                  uploadSection?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-green-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Upload your image
              </button>
            </div>

            {/* Preview Collage */}
            <div className="mb-8 print-section">
              <h3 className="text-lg font-semibold text-center mb-4 print-title">
                MaTalk Feelings Reference
              </h3>
              <p className="text-center text-sm text-gray-600 mb-6 print-subtitle">
                Communication board for expressing feelings and emotions
              </p>

              {/* Category Tabs */}
              <CategoryTabs
                categories={feelingsData}
                currentCategory={currentCategory}
                onCategoryChange={setCurrentCategory}
                language={language}
              />

              <p className="text-center text-sm text-gray-500 mt-4">
                All{" "}
                {feelingsData.reduce(
                  (total, category) => total + category.tiles.length,
                  0
                )}{" "}
                feelings will be personalized with your uploaded image.
              </p>

              {/* Print Reference Images Button */}
              <div className="text-center mt-6">
                <button
                  onClick={handlePrint}
                  className="bg-blue-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2-2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                    />
                  </svg>
                  Print for free without uploading an image
                </button>
              </div>
            </div>
          </div>

          {/* Upload Section */}
          <div id="upload-section" className="w-full max-w-md mx-auto">
            <div className="text-center mb-4">
              <h2 className="text-xl font-semibold mb-2">Upload Your Photo</h2>
              <p className="text-gray-500 text-sm">
                Upload a clear photo with exactly one face
              </p>

              {/* What it will look like link */}
              <div className="mt-3">
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="text-blue-600 hover:text-blue-700 text-sm underline"
                >
                  What it will look like
                </button>
              </div>

              {/* Collapsible preview */}
              {showPreview && (
                <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-3">Preview</h3>
                    <div className="flex justify-center">
                      <img
                        src="/images/preview-example.png"
                        alt="Preview of personalized feelings board"
                        className="rounded-lg shadow-md"
                        style={{ width: "80%" }}
                        onError={(e) => {
                          // Fallback if image doesn't exist
                          e.currentTarget.style.display = "none";
                          e.currentTarget.nextElementSibling?.classList.remove(
                            "hidden"
                          );
                        }}
                      />
                      <div className="hidden text-gray-500 text-sm">
                        Preview image will be added here
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">
                      Your uploaded photo will be integrated into each feeling
                      tile
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              {!uploadedImage ? (
                <FileDrop
                  onFileSelect={handleFileSelect}
                  disabled={isUploading}
                  acceptedTypes={["image/jpeg", "image/jpg", "image/png"]}
                  maxSize={5 * 1024 * 1024}
                />
              ) : (
                <div className="text-center">
                  <div className="mb-4">
                    <img
                      src={URL.createObjectURL(uploadedImage)}
                      alt="Uploaded photo"
                      className="mx-auto rounded-lg shadow-md"
                      style={{
                        maxWidth: "200px",
                        maxHeight: "200px",
                        width: "auto",
                        height: "auto",
                      }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Photo uploaded successfully! Create your personalized Hero
                    Me feelings board with AI-powered personalization.
                  </p>
                  <div className="space-y-4">
                    <button
                      onClick={handleStartGeneration}
                      disabled={isComposing}
                      className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isComposing
                        ? "Generating..."
                        : "Continue (Free Preview)"}
                    </button>

                    {/* Generate Hero Me Button */}
                    <button
                      onClick={handlePaymentClick}
                      disabled={isComposing}
                      className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isComposing
                        ? "Generating..."
                        : "Create Hero Me Feelings"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {isUploading && (
              <div className="mt-6 text-center">
                <div className="animate-pulse text-lg font-semibold mb-2">
                  Processing your photo...
                </div>
                <p className="text-sm text-gray-500">
                  Preparing your image for feeling generation. This will be
                  quick!
                </p>
              </div>
            )}

            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded text-red-600">
                <h3 className="font-semibold mb-2">Upload Failed</h3>
                <p className="text-sm">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Tips */}
            <div className="mt-4 p-3 bg-gray-100 rounded text-center">
              <p className="text-xs text-gray-600">
                💡 <strong>Tip:</strong> Use a clear, well-lit photo with one
                visible face for best results
              </p>
            </div>
          </div>
        </div>

        {/* Board Section */}
        {avatar && (
          <div id="board-section" className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-4 w-full">
              <div className="text-center lg:text-left">
                <h1 className="text-3xl font-bold mb-2">My Feelings</h1>
                <p className="text-gray-600">
                  Tap any feeling to hear it spoken aloud
                </p>
              </div>

              <div className="flex flex-col lg:flex-row gap-4 items-center justify-center">
                <div className="flex flex-row gap-4 items-center justify-center">
                  <LanguageSelector
                    value={language}
                    onChange={setLanguage}
                    disabled={isComposing}
                  />
                  <HighContrastToggle
                    value={highContrast}
                    onChange={setHighContrast}
                  />
                </div>
              </div>
            </div>

            {/* Category Tabs */}
            <CategoryTabs
              categories={feelingsData}
              currentCategory={currentCategory}
              onCategoryChange={setCurrentCategory}
              language={language}
            />

            {/* Tiles Grid */}
            {isComposing ? (
              <div className="text-center">
                <div className="animate-pulse text-lg font-semibold mb-2">
                  Creating your personalized feeling images...
                </div>
                <div className="text-2xl font-bold mb-2 text-blue-600">
                  {imagesCreated} /{" "}
                  {feelingsData.reduce(
                    (total, category) => total + category.tiles.length,
                    0
                  )}{" "}
                  images created
                </div>
                <div
                  className="text-xl font-medium mb-2 transition-all duration-500 ease-in-out"
                  style={{
                    color:
                      PHRASE_COLORS[currentPhraseIndex % PHRASE_COLORS.length],
                    textAlign: "center",
                  }}
                >
                  {PHRASES[currentPhraseIndex]}
                </div>
                <p className="text-gray-500">
                  Using AI to transform your photo into cartoon-style feeling
                  images. This may take a few minutes.
                </p>
              </div>
            ) : currentCategoryData ? (
              <>
                <div className="category-heading text-2xl font-bold text-center mb-6">
                  {currentCategoryData.label[language]}
                </div>
                <div className="collage-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
                  {currentCategoryData.tiles.map((tile) => (
                    <Tile
                      key={tile.key}
                      tile={tile}
                      language={language}
                      composedImageUrl={composedUrls.get(tile.key)}
                      disabled={isComposing}
                    />
                  ))}
                </div>
              </>
            ) : null}

            {/* Print Button */}
            <div className="text-center">
              <PrintButton
                categories={feelingsData}
                composedTiles={composedTiles}
                composedUrls={composedUrls}
                disabled={isComposing}
              />
            </div>

            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => setAvatar(null)}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                disabled={isComposing}
              >
                Upload New Photo
              </button>
            </div>

            {/* Instructions */}
            <div className="mt-8 p-6 bg-gray-100 rounded-lg">
              <h3 className="font-semibold mb-2">How to use:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Tap any feeling tile to hear it spoken</li>
                <li>
                  • Use the language selector to change the spoken language
                </li>
                <li>• Switch between categories using the tabs above</li>
                <li>• Print a collage to keep all your feelings</li>
                <li>
                  • Use keyboard navigation: Tab to move, Enter/Space to speak
                </li>
              </ul>
            </div>
          </div>
        )}

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}

        {/* How it Works Modal */}
        {showHowItWorks && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-blue-600">
                  How it works
                </h2>
                <button
                  onClick={() => setShowHowItWorks(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl font-bold"
                >
                  ×
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    1
                  </div>
                  <p className="text-gray-700">
                    Upload a clear photo with exactly one face
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    2
                  </div>
                  <p className="text-gray-700">
                    Click "Create Hero Me Feelings" to generate your
                    personalized feelings board
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    3
                  </div>
                  <p className="text-gray-700">
                    Get 24+ personalized feeling images
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    4
                  </div>
                  <p className="text-gray-700">
                    Tap any feeling to hear it spoken aloud
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    5
                  </div>
                  <p className="text-gray-700">
                    Print a collage of all your feelings to keep
                  </p>
                </div>
              </div>
              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowHowItWorks(false)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Got it!
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Playground;
